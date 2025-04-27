import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { Timestamp } from 'firebase/firestore';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { getAllReportedUrls } from '../../db/db_utils';

function DatabaseDisplay() {
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');
    const [reportedUrls, setReportedUrls] = useState([]);

    useEffect(() => {
        async function fetchUrls() {
            try {
                const urls = await getAllReportedUrls();
                setReportedUrls(urls);
                console.log(urls);
            } catch (error) {
                console.log('Error fetching reported URLs:', error);
            }
        }
        fetchUrls();
    }, []);

    const columns = [
        { field: 'url', headerName: 'URL 🔽', width: 250 },
        { field: 'category', headerName: 'Category', width: 100 },
        { field: 'reportedBy', headerName: 'Reported By 👤', width: 250 },
        { field: 'reportedOn', headerName: 'Reported On 🕛', width: 200 },
        { field: 'additional', headerName: 'Details', width: 520 },
    ];

    const rows = reportedUrls.map((url, index) => ({
        id: index + 1,
        url: url.Url,
        category: url.Category,
        reportedBy: url.ReportedBy,
        reportedOn: url.ReportedOn instanceof Timestamp ? url.ReportedOn.toDate().toLocaleString() : '',
        additional: url.Additional,
    }));

    return (
        <>
        <div className="min-h-screen flex flex-col bg-darkBlue text-neonBlue font-sans py-12">
            <Header LoggedInUser={savedEmail} />
    
            <main className="flex-grow flex flex-col items-center">
                <div className="mt-12 text-center">
                    <h2 className="text-2xl lg:text-4xl font-bold">All Reported URLs<br/> ⚠️🚨</h2>
                    <p className="mt-4 text-gray-300 text-base opacity-80 mx-6 sm:mx-[24%]">
                        Below is the view of all the URLs reported by our users and also those which were classified as malicious by our classification system.
                        Help us maintain a secure environment by contributing to this database.
                    </p>
                </div>
    
                <div className="w-[90%] mt-10 bg-deepBlue rounded-2xl p-5 shadow-lg">
                    <DataGrid
                        style={{
                            backgroundColor: '#0a192f',
                            color: '#D1D5DB',
                            border: 'none',
                            fontFamily: 'Inter, sans-serif',
                        }}
                        columns={columns}
                        rows={rows}
                        pageSize={50}
                        sx={{
                            '.MuiDataGrid-cell': {
                                borderBottom: '1px solid #00f3ff33',
                            },
                            '.MuiDataGrid-columnHeaders': {
                                backgroundColor: '#020c1b',
                                color: '#00f3ff',
                                fontSize: '1rem',
                            },
                            '.MuiDataGrid-footerContainer': {
                                backgroundColor: '#020c1b',
                                color: '#00f3ff',
                            },
                            '.MuiTablePagination-root': {
                                color: '#00f3ff',
                            },
                        }}
                    />
                </div>
            </main>
        </div>
    </>
    
    );
}

export default DatabaseDisplay;
