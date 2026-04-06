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

    // Email + Password registration
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

            // Update Firebase profile (only displayName, photo stored in MongoDB)
            await updateProfile(result.user, {
                displayName: name,
            });

            // Save to MongoDB
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    photo: photoURL,
                    provider: "email",
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to save user");
            }

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

            // Save to MongoDB
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
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
        <div
            className="relative flex justify-center items-center min-h-screen px-4"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <ToastContainer />
            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/55" />

            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-xl p-8">
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    Create Your Account
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block font-medium mb-1 text-white">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Enter your name"
                            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block font-medium mb-1 text-white">Photo URL</label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Enter profile image URL"
                            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium mb-1 text-white">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your email"
                            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-medium mb-1 text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Create a password"
                            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-300 text-sm text-center">{error}</p>
                    )}

                    {/* Register Button */}
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition-colors">
                        Register
                    </button>
                </form>

                {/* Google Signup */}
                <button
                    onClick={handleGoogleSignup}
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-medium py-2 rounded-md mt-3 transition-colors"
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

                <p className="mt-4 text-center text-white/80">
                    Already have an account?{" "}
                    <a href="/login" className="text-green-300 font-semibold underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
