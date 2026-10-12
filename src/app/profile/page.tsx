"use client";

import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="animate-pulse font-semibold text-emerald-600">
          তথ্য লোড হচ্ছে...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="mb-4 text-gray-600">
          প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
        </p>
        <button
          type="button"
          onClick={() => router.push("/sign-in")}
          className="rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          সাইন ইন
        </button>
      </div>
    );
  }

  const userName = inputName || "ব্যবহারকারী";
  const userEmail = user.email ?? "";
  const userImage = user.image;

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* User Information Card */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-emerald-100 text-2xl font-bold text-emerald-800">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>

          <div className="min-w-0">
            <h2 className="wrap-break text-xl font-bold text-gray-900">
              {user.name || "ব্যবহারকারী"}
            </h2>
            <p className="break-all text-sm text-gray-500">
              {userEmail}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-2 self-end rounded-xl border border-red-200 px-5 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:self-center"
        >
          <span aria-hidden="true">↵</span>
          সাইন আউট
        </button>
      </div>

      {/* Profile Form */}
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-lg font-bold text-gray-900">
          ব্যক্তিগত তথ্য
        </h3>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="profile-name"
              className="block text-sm font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={inputName}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              autoComplete="name"
              className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              placeholder="আপনার নাম লিখুন"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ইমেইল
            </label>

            <input
              type="email"
              value={userEmail}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-500"
            />

            <p className="text-xs text-gray-400">
              ইমেইল পরিবর্তন করতে আলাদা email verification flow প্রয়োজন।
            </p>
          </div>

          {message && (
            <p
              role="status"
              aria-live="polite"
              className={`text-sm font-medium ${
                message.includes("সফল")
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "আপডেট হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
          </button>
        </form>
      </div>
    </main>
  );
}