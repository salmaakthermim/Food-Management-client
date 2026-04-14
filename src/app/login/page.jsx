"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/provider/LanguageProvider";

const LoginPage = () => {
    const router = useRouter();
    const { t } = useLanguage();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Email + Password Login
    const handleLogin = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            console.log("Logged In:", userCredential.user);
            router.push("/"); // redirect after login
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    // Google Login
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log("Google User:", result.user);
            router.push("/"); // redirect after login
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-2 text-center text-white">Welcome Back</h2>
                <p className="text-white/80 mb-6 text-center">
                    Please login to continue to your dashboard.
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    {/* EMAIL */}
                    <div>
                        <label className="font-medium text-white">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-300 text-sm">Email is required.</p>}
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="font-medium text-white">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true, minLength: 8 })}
                            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter Password"
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-red-300 text-sm">Password is required.</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className="text-red-300 text-sm">Minimum 8 characters required.</p>
                        )}
                    </div>

                    {/* FORGOT PASSWORD */}
                    <div className="text-right">
                        <a className="text-orange-300 hover:underline text-sm">Forgot password?</a>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition-colors">
                        Login
                    </button>

                    {/* GOOGLE LOGIN */}
                    <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black py-2 rounded-md font-medium transition-colors border border-white/30">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>

                    {/* REGISTER LINK */}
                    <p className="text-center text-sm mt-2 text-white/80">
                        New User?{" "}
                        <a href="/Register" className="text-orange-300 underline font-semibold">
                            Register
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
