"use client";

import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const user = session?.user;
  const currentName = user?.name ?? "";
  const inputName = name ?? currentName;

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      setMessage("সাইন আউট করতে ব্যর্থ হয়েছে।");
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = inputName.trim();

    if (!trimmedName) {
      setMessage("নাম লিখুন।");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        setMessage("আপডেট করতে ব্যর্থ হয়েছে।");
        return;
      }

      setName(trimmedName);
      setMessage("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
    } catch (error) {
      console.error("Profile update failed:", error);
      setMessage("আপডেট করতে ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 text-center">
        <div className="inline-block p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm">
          <p className="animate-pulse font-bold text-emerald-700 text-sm">
            তাজা তথ্য লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-28 text-center">
        <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-emerald-100 shadow-xl space-y-4">
          <div className="w-14 h-14 mx-auto bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            🔒
          </div>
          <h2 className="text-xl font-bold text-gray-900">সাইন ইন প্রয়োজন</h2>
          <p className="text-sm text-gray-500">
            আপনার প্রোফাইল এবং অ্যাকাউন্টের তথ্য দেখতে প্রথমে সাইন ইন করুন।
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => router.push("/sign-in")}
              className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-600/30 transition hover:scale-[1.02]"
            >
              সাইন ইন করুন
            </button>
            <Link
              href="/"
              className="rounded-xl border border-emerald-200 bg-white px-6 py-3 font-bold text-emerald-800 transition hover:bg-emerald-50"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const userName = inputName || "ব্যবহারকারী";
  const userEmail = user.email ?? "";
  const userImage = user.image;

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            আপনার অ্যাকাউন্টের ব্যক্তিগত তথ্য ও সেটিংস পরিচালনা করুন।
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 self-start sm:self-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50/80 backdrop-blur-md border border-emerald-200 hover:bg-emerald-100/70 transition shadow-2xs"
        >
          <span>←</span>
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      {/* User Information Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-3xl border border-emerald-200/80 bg-white/90 backdrop-blur-xl p-6 shadow-xl shadow-emerald-900/5">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative flex h-16 w-16 sm:h-18 sm:w-18 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-2xl font-bold text-white shadow-md shadow-emerald-600/30">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                fill
                sizes="72px"
                className="object-cover"
              />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"></div>
          </div>

          <div className="min-w-0 space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              {user.name || "ব্যবহারকারী"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {userEmail}
            </p>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
              🌿 সক্রিয় অ্যাকাউন্ট
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-2 self-end sm:self-center rounded-xl border border-red-200 bg-red-50/50 px-4 py-2 text-xs sm:text-sm font-bold text-red-600 transition hover:bg-red-100/70"
        >
          <span aria-hidden="true">↵</span>
          সাইন আউট
        </button>
      </div>

      {/* Profile Form Card */}
      <div className="space-y-6 rounded-3xl border border-emerald-200/80 bg-white/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-emerald-900/5">
        <div className="border-b border-gray-100 pb-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            ব্যক্তিগত তথ্য আপডেট
          </h3>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="profile-name"
              className="block text-xs sm:text-sm font-bold text-gray-700"
            >
              আপনার নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={inputName}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              autoComplete="name"
              className="w-full rounded-2xl border border-emerald-200/80 bg-white p-3.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 text-gray-800 font-medium"
              placeholder="আপনার নাম লিখুন"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-gray-700">
              ইমেইল ঠিকানা
            </label>

            <input
              type="email"
              value={userEmail}
              readOnly
              className="w-full cursor-not-allowed rounded-2xl border border-gray-200 bg-gray-50 p-3.5 text-sm text-gray-500 font-medium select-none"
            />

            <p className="text-[11px] text-gray-400">
              নিরাপত্তার কারণে ইমেইল সরাসরি পরিবর্তনযোগ্য নয়। পরিবর্তন করতে ভেরিফিকেশন ফ্লো প্রয়োজন।
            </p>
          </div>

          {message && (
            <div
              role="status"
              aria-live="polite"
              className={`p-3 rounded-xl text-xs sm:text-sm font-bold border ${
                message.includes("সফল")
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "আপডেট হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
          </button>
        </form>
      </div>
    </main>
  );
}