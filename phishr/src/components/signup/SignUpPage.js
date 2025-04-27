import React, { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import SnackBar from '../SnackBar';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import LinearProgress from "@mui/material/LinearProgress";
import { registerUser, userExists } from '../../db/db_utils';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import SignupDialogbox from './SignupDialogbox';
import { GoogleSignUpButton } from '../GoogleButtons';
import { auth, googleAuthProvider } from '../../db/firebase-config';
import { signInWithPopup } from 'firebase/auth';

const SignupPage = () => {

    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [signUpClicked, setSignUpClicked] = useState(false);
    const [openSnackbar, setopenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [snackSeverity, setSnackSeverity] = useState('info');

    const savedEmail = Cookies.get('email');
    useEffect(() => {
        if (savedEmail) {
            navigate('/');
        }
    }, []);

    function setSnackbarState(message, severity, open) {
        setSnackMessage(message);
        setSnackSeverity(severity);
        setopenSnackbar(open);
    }

    const RegisterNewUser = async () => {
        setSignUpClicked(true);
        const AccountCreated = await registerUser(firstname, lastname, phone, email, password);

        if (AccountCreated) {
            setSnackbarState("Account Created! Login Now", "success", true);
            setTimeout(() => {
                setSignUpClicked(false);
                navigate('/login');
            }, 2500);
        } else {
            setSignUpClicked(false);
        }
    }

    const SignupHandler = async () => {
        if (!firstname || !lastname || !email || !phone || !password || !confirmPassword) {
            setSnackbarState("Please fill all fields!", "warning", true);
            return;
        }
        if (phone.length > 12) {
            setSnackbarState("Phone number should not exceed 12 digits!", "error", true);
            return;
        }
        if (email.length < 8) {
            setSnackbarState("Email should be greater than 8 characters!", "warning", true);
            return;
        }
        if (password.length < 8) {
            setSnackbarState("Password is too short!", "warning", true);
            return;
        }
        if (password !== confirmPassword) {
            setSnackbarState("Passwords don't match!", "error", true);
            return;
        }

        const emailAlreadyRegistered = await userExists(email);
        if (emailAlreadyRegistered) {
            setSnackbarState("Provided Email is already registered!", "warning", true);
            return;
        }

        setSignUpClicked(true);
    }

    const handleSignUpWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;
            const name = user.displayName;
            const email = user.email;
            const phone = user.phoneNumber;

            const existsAlready = await userExists(email);
            if (existsAlready) {
                setSnackbarState("Provided Email is already registered! Login Now", "warning", true);
                return;
            } else {
                navigate("/signup/set_password", { state: { name, email, phone } });
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <>
            <Header LoggedInUser={savedEmail} />
            {signUpClicked && <LinearProgress color="error" />}

            <div className="bg-darkBlue min-h-screen flex flex-col items-center p-8 pt-24">
                <div className="bg-deepBlue w-full max-w-3xl rounded-lg p-10 border border-neonBlue/30 shadow-lg">
                    <h1 className="text-neonBlue font-bold text-3xl md:text-4xl text-center mb-8">
                        Create Your Account
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-neonBlue text-sm mb-1 block">First Name</label>
                            <input
                                placeholder="First Name"
                                type="text"
                                onChange={(e) => setFirstname(e.target.value)}
                                maxLength={64}
                                className="w-full bg-darkBlue text-white py-3 px-4 rounded-md border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                            />
                        </div>

                        <div>
                            <label className="text-neonBlue text-sm mb-1 block">Last Name</label>
                            <input
                                placeholder="Last Name"
                                type="text"
                                onChange={(e) => setLastname(e.target.value)}
                                maxLength={64}
                                className="w-full bg-darkBlue text-white py-3 px-4 rounded-md border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                            />
                        </div>

                        <div>
                            <label className="text-neonBlue text-sm mb-1 block">Email Address</label>
                            <input
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                maxLength={64}
                                className="w-full bg-darkBlue text-white py-3 px-4 rounded-md border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                            />
                        </div>

                        <div>
                            <label className="text-neonBlue text-sm mb-1 block">Phone Number</label>
                            <input
                                placeholder="Phone Number"
                                type="number"
                                onChange={(e) => setPhone(e.target.value)}
                                maxLength={12}
                                className="w-full bg-darkBlue text-white py-3 px-4 rounded-md border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                            />
                        </div>

                        <div className="relative">
                            <label className="text-neonBlue text-sm mb-1 block">Password</label>
                            <input
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
                                maxLength={64}
                                className="w-full bg-darkBlue text-white py-3 px-4 rounded-md border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                            />
                            <div className="absolute top-10 right-4 cursor-pointer text-neonBlue">
                                {showPassword ? (
                                    <RiEyeOffLine onClick={() => setShowPassword(false)} />
                                ) : (
                                    <RiEyeLine onClick={() => setShowPassword(true)} />
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-neonBlue text-sm mb-1 block">Confirm Password</label>
                            <input
                                placeholder="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                maxLength={64}
                                className="w-full bg-darkBlue text-white py-3 px-4 rounded-md border border-neonBlue/30 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                            />
                            <div className="absolute top-10 right-4 cursor-pointer text-neonBlue">
                                {showPassword ? (
                                    <RiEyeOffLine onClick={() => setShowPassword(false)} />
                                ) : (
                                    <RiEyeLine onClick={() => setShowPassword(true)} />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-8 gap-4">
                        <button
                            onClick={SignupHandler}
                             className="bg-neonBlue text-darkBlue font-bold px-6 py-3 rounded-lg hover:bg-white transition hover:animate-glow"
                        >
                            SIGN UP
                        </button>

                        <GoogleSignUpButton handleClick={handleSignUpWithGoogle} />

                        <p className="text-gray-400 mt-4 text-sm">
                            Already have an account?
                            <Link to="/login" className="text-neonBlue font-semibold underline ml-1">
                                Login Now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />

            {signUpClicked && (
                <SignupDialogbox
                    email={email}
                    RegisterNewUser={RegisterNewUser}
                    setSignUpClicked={setSignUpClicked}
                />
            )}

            <SnackBar
                openSnackbar={openSnackbar}
                setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage}
                severity={snackSeverity}
                autoHideDuration={3000}
                position={{ vertical: "top", horizontal: "right" }}
            />
        </>
    );
};

export default SignupPage;
