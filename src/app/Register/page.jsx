"use client";

import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    // Email + Password registration (NO MONGODB SAVE)
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        const name = e.target.name.value;
        const photoURL = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            // Create user in Firebase
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update Firebase profile
            await updateProfile(result.user, {
                displayName: name,
                photoURL: photoURL,
            });

            toast.success("Account Created Successfully!");
            e.target.reset();

            router.push("/");
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    // Google Signup (ONLY THIS WILL SAVE TO MONGODB)
    const handleGoogleSignup = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const newUser = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                provider: "google",
            };

            // Save only Google users to MongoDB
            await fetch("https://users-management-food-server.vercel.app/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            toast.success("Logged in with Google!");
            router.push("/");
        } catch (err) {
            toast.error(err.message);
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-50 px-4">
            <ToastContainer />
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
                    Create Your Account
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block font-medium mb-1">Photo URL</label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Enter profile image URL"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Create a password"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-600 text-sm text-center">{error}</p>
                    )}

                    {/* Register Button */}
                    <button className="btn bg-green-600 hover:bg-green-700 text-white w-full">
                        Register
                    </button>
                </form>

                {/* Google Signup */}
                <button
                    onClick={handleGoogleSignup}
                    className="btn bg-white w-full mt-3 text-black border-[#e5e5e5]"
                >
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </g>
                    </svg>
                    Continue with Google
                </button>

                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-green-700 font-semibold underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
