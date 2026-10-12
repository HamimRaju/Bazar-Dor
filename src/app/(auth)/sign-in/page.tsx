"use client";

import { signIn } from "@/app/lib/auth-client";
import { Check } from "@gravity-ui/icons";
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

export default function SignInPage() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg("");
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as Record<string, string>;

        const { data: finalData, error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
        });

        if (error) {
            setErrorMsg(error.message || "Login failed");
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
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white border rounded-2xl p-8 shadow-sm space-y-6">
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
                    <p className="text-xs text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্ট ঢুকুন।</p>
                </div>

                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
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

                    {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}

                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition">
                        সাইন ইন
                    </Button>
                </Form>

                <div className="text-center text-xs text-gray-400">অথবা</div>

                <div className="flex gap-3">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full border rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    >
                        Google দিয়ে চালিয়ে যান
                    </button>
                </div>

                <p className="text-center text-xs text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/sign-up" className="text-emerald-600 font-semibold hover:underline">
                        সাইন আপ করুন
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