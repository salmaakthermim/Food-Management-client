"use client";

import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase.config';

export const AuthContext = createContext()
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        setDbUser(null);
        return signOut(auth);
    }

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false); // set loading false immediately, don't wait for DB
            if (currentUser?.email) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/by-email/${currentUser.email}`);
                    if (res.ok) {
                        const data = await res.json();
                        setDbUser(data);
                    }
                } catch {
                    setDbUser(null);
                }
            } else {
                setDbUser(null);
            }
        })
        return () => unSubscribe();
    }, [])

    const authInfo = {
        user,
        dbUser,
        loading,
        registerUser,
         signInUser,
         signInGoogle,
         logOut,
         updateUserProfile
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;