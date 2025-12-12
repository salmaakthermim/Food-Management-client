"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back</h2>
                <p className="text-gray-600 mb-6 text-center">
                    Please login to continue to your dashboard.
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    {/* EMAIL */}
                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="w-full border rounded-md px-4 py-2 mt-1"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-600 text-sm">Email is required.</p>}
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="font-medium">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true, minLength: 8 })}
                            className="w-full border rounded-md px-4 py-2 mt-1"
                            placeholder="Enter Password"
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-red-600 text-sm">Password is required.</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className="text-red-600 text-sm">Minimum 8 characters required.</p>
                        )}
                    </div>

                    {/* FORGOT PASSWORD */}
                    <div className="text-right">
                        <a className="text-blue-600 hover:underline">Forgot password?</a>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                        Login
                    </button>

                    {/* GOOGLE LOGIN */}
                    <button onClick={handleGoogleLogin} className="btn bg-white w-full mt-3 text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>

                    {/* REGISTER LINK */}
                    <p className="text-center text-sm mt-2">
                        New User?{" "}
                        <a href="/Register" className="text-blue-600 underline">
                            Register
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
