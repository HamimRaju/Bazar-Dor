"use client";

import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await authClient.updateUser({ name });
      setMessage("Totho safolvabe update kora hoyeche!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage("Error: " + err.message);
      } else {
        setMessage("An unknown error occurred");
      }
    } finally {
      setUpdating(false);
    }
  };

  if (!session) return <p className="p-8 text-center">Loading...</p>;

  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white border rounded-2xl p-6 space-y-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2.5 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
            <input
              type="email"
              value={session.user.email}
              disabled
              className="w-full border bg-gray-50 rounded-lg p-2.5 text-sm text-gray-500"
            />
          </div>

          {message && <p className="text-sm font-semibold text-emerald-600">{message}</p>}

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-emerald-600 text-white font-medium py-2.5 rounded-lg hover:bg-emerald-700 transition"
          >
            {updating ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
          </button>
        </form>
      </div>
    </main>
  );
}