"use client";

import { signIn } from "@/app/lib/auth-client";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as Record<string, string>;

        const { error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
        });

        setLoading(false);
        if (error) {
            setErrorMsg(error.message || "লগইন ব্যর্থ হয়েছে");
        } else {
            router.push("/");
        }
    };

    const handleGoogleSignIn = async () => {
        await signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="min-h-[88vh] flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30">
            <div className="max-w-md w-full bg-white/90 backdrop-blur-2xl border border-emerald-100/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-950/5 space-y-6">
                
                {/* Brand Mini Header */}
                <div className="text-center space-y-1.5">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white rounded-2xl shadow-md shadow-emerald-500/25 mb-1">
                        <svg className="w-6 h-6 filter drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c2 2 .5 5.5-.6 9.2A7 7 0 0 1 11 20z"></path>
                            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.5 12 16 13 18"></path>
                        </svg>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 bg-clip-text text-transparent">
                        বাজার দর
                    </h1>
                    <p className="text-xs font-medium text-emerald-700/80">আপনার অ্যাকাউন্টে সাইন ইন করুন</p>
                </div>

                {/* Side-by-Side Toggle Tabs */}
                <div className="grid grid-cols-2 p-1 bg-emerald-50/80 border border-emerald-200/60 rounded-2xl">
                    <Link
                        href="/sign-in"
                        className="py-2 text-xs sm:text-sm font-bold rounded-xl text-center transition-all bg-white text-emerald-800 shadow-md shadow-emerald-600/10 scale-[1.02]"
                    >
                        সাইন ইন
                    </Link>
                    <Link
                        href="/sign-up"
                        className="py-2 text-xs sm:text-sm font-bold rounded-xl text-center transition-all text-gray-600 hover:text-emerald-700"
                    >
                        সাইন আপ
                    </Link>
                </div>

                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <TextField isRequired name="email" type="email">
                        <Label className="text-xs font-bold text-gray-700">ইমেইল ঠিকানা</Label>
                        <Input placeholder="you@example.com" className="w-full bg-white/60 border border-emerald-200/70 rounded-xl p-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition" />
                        <FieldError />
                    </TextField>

                    <TextField isRequired minLength={8} name="password" type="password">
                        <Label className="text-xs font-bold text-gray-700">পাসওয়ার্ড</Label>
                        <Input placeholder="কমপক্ষে ৮ অক্ষর" className="w-full bg-white/60 border border-emerald-200/70 rounded-xl p-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition" />
                        <FieldError />
                    </TextField>

                    {errorMsg && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold text-center">
                            {errorMsg}
                        </div>
                    )}

                    <Button 
                        type="submit" 
                        isDisabled={loading}
                        className="w-full mt-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:opacity-95 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                    >
                        {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
                    </Button>
                </Form>

                <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-emerald-100"></div>
                    <span className="flex-shrink mx-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">অথবা</span>
                    <div className="flex-grow border-t border-emerald-100"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white/80 border border-emerald-200/70 hover:bg-emerald-50/50 rounded-xl py-2.5 text-xs font-bold text-gray-700 transition flex items-center justify-center gap-2 shadow-2xs hover:border-emerald-300"
                >
                    <span>Google দিয়ে চালিয়ে যান</span>
                </button>
            </div>

            {/* Modernized Stylish Home Button */}
            <div className="mt-6">
                <Link 
                    href="/" 
                    className="group inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-emerald-200/70 rounded-xl text-xs font-bold text-emerald-800 shadow-sm hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 transition-all duration-200"
                >
                    <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>হোম পেজে ফিরে যান</span>
                </Link>
            </div>
        </div>
    );
}