const UserFields = ({ Firstname, Lastname, Email, Phone, OnChangeHandler }) => {

    return (
        <>
            <div className="flex flex-col gap-y-2">
                <label className="text-white text-sm">Name</label>
                <div className="flex items-center bg-darkBlue hover:bg-deepBlue rounded-md focus-within:ring-2 focus-within:ring-neonBlue">
                    <input
                        placeholder="Name"
                        defaultValue={Firstname}
                        type="text"
                        onChange={(e) => OnChangeHandler(e, "firstname")}
                        maxLength={64}
                        className="w-full bg-deepBlue text-white py-3 px-4 rounded-md border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-y-2">
                <label className="text-white text-sm">Lastname</label>
                <div className="flex items-center bg-darkBlue hover:bg-deepBlue rounded-md focus-within:ring-2 focus-within:ring-neonBlue">
                    <input
                        placeholder="Lastname"
                        defaultValue={Lastname}
                        type="text"
                        onChange={(e) => OnChangeHandler(e, "lastname")}
                        maxLength={64}
                        className="w-full bg-deepBlue text-white py-3 px-4 rounded-md border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-y-2">
                <label className="text-white text-sm">Registered Email Address</label>
                <div className="flex items-center bg-darkBlue hover:bg-deepBlue rounded-md focus-within:ring-2 focus-within:ring-neonBlue">
                    <input
                        readOnly={true}
                        placeholder="Email Address"
                        defaultValue={Email}
                        type="email"
                        onChange={(e) => OnChangeHandler(e, "email")}
                        maxLength={64}
                        className="w-full bg-deepBlue text-white py-3 px-4 rounded-md border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-y-2">
                <label className="text-white text-sm">Phone Number (Max Length 12)</label>
                <div className="flex items-center bg-darkBlue hover:bg-deepBlue rounded-md focus-within:ring-2 focus-within:ring-neonBlue">
                    <input
                        placeholder="Phone Number"
                        defaultValue={Phone}
                        type="number"
                        onChange={(e) => OnChangeHandler(e, "phone")}
                        maxLength={12}
                        className="w-full bg-deepBlue text-white py-3 px-4 rounded-md border border-neonBlue/30 focus:outline-none focus:ring-1 focus:ring-neonBlue"
                    />
                </div>
            </div>
        </>
    );
}

export default UserFields;
