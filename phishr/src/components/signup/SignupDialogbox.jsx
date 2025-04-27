import React from 'react';

export default function SignupDialogbox({ email, RegisterNewUser, setSignUpClicked }) {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-darkBlue bg-opacity-90 flex justify-center items-center font-sans">
                <div className="bg-deepBlue p-6 rounded-lg shadow-lg max-[340px]:m-5 m-10 min-[500px]:m-7 text-white">
                    
                    <p className="text-xl font-semibold mb-5">
                        Register Account for <span className="text-neonBlue font-bold">"{email}"</span> ? 👤
                    </p>

                    <div className="flex items-center bg-red-500 bg-opacity-20 rounded-md px-5 py-3">
                        <p className="text-sm text-red-400 font-medium">
                            ⚠️ WARNING: Given email address cannot be changed later!
                        </p>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <button 
                            className="bg-neonBlue hover:bg-[#00d5e6] text-darkBlue font-bold px-6 py-2 rounded-md animate-glow"
                            onClick={RegisterNewUser}
                        >
                            CREATE ACCOUNT
                        </button>

                        <button 
                            className="bg-gray-300 hover:bg-gray-400 text-darkBlue font-bold px-6 py-2 rounded-md"
                            onClick={() => setSignUpClicked(false)}
                        >
                            CANCEL
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}
