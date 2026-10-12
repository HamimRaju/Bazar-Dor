"use client";

import { signIn, signUp } from "@/app/lib/auth-client";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg("");
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as Record<string, string>;

        if (data.password !== data.confirmPassword) {
            setErrorMsg("পাসওয়ার্ড মিলছে না!");
            return;
        }

        const { error } = await signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
        });

        if (error) {
            setErrorMsg(error.message || "Registration failed");
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

    const handleGithubSignIn = async () => {
        await signIn.social({
            provider: "github",
            callbackURL: "/",
        });
    };

    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white border rounded-2xl p-8 shadow-sm space-y-6">
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
                    <p className="text-xs text-gray-500">বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
                </div>

                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <TextField isRequired name="name">
                        <Label className="text-sm font-medium text-gray-700">নাম</Label>
                        <Input placeholder="যেমন: রহিম উদ্দিন" className="w-full border rounded-lg p-2.5 text-sm" />
                        <FieldError />
                    </TextField>

                    <TextField isRequired name="email" type="email">
                        <Label className="text-sm font-medium text-gray-700">ইমেইল</Label>
                        <Input placeholder="you@example.com" className="w-full border rounded-lg p-2.5 text-sm" />
                        <FieldError />
                    </TextField>

                    <TextField isRequired minLength={8} name="password" type="password">
                        <Label className="text-sm font-medium text-gray-700">পাসওয়ার্ড</Label>
                        <Input placeholder="কমপক্ষে ৮ অক্ষর" className="w-full border rounded-lg p-2.5 text-sm" />
                        <FieldError />
                    </TextField>

                    <TextField isRequired minLength={8} name="confirmPassword" type="password">
                        <Label className="text-sm font-medium text-gray-700">পাসওয়ার্ড নিশ্চিত করুন</Label>
                        <Input placeholder="আবার লিখুন" className="w-full border rounded-lg p-2.5 text-sm" />
                        <FieldError />
                    </TextField>

                    {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}

                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition">
                        অ্যাকাউন্ট তৈরি করুন
                    </Button>
                </Form>

                <div className="text-center text-xs text-gray-400">অথবা</div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="border rounded-lg py-2.5 text-xs font-medium hover:bg-gray-50 transition flex items-center justify-center gap-1.5"
                    >
                        <span>Google দিয়ে চালিয়ে যান</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleGithubSignIn}
                        className="border rounded-lg py-2.5 text-xs font-medium hover:bg-gray-50 transition flex items-center justify-center gap-1.5"
                    >
                        <span>GitHub দিয়ে চালিয়ে যান</span>
                    </button>
                </div>

                <p className="text-center text-xs text-gray-600">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link href="/sign-in" className="text-emerald-600 font-semibold hover:underline">
                        সাইন ইন করুন
                    </Link>
                </p>
            </div>

            <div className="mt-6">
                <Link href="/" className="text-xs text-gray-500 hover:text-emerald-600">
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}