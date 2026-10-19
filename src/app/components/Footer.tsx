import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 text-gray-600 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-emerald-100/80">
        
        {/* Brand & Mission */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-tr from-emerald-600 to-teal-400 text-white rounded-xl shadow-md shadow-emerald-500/20">
              <svg className="w-5 h-5 filter drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c2 2 .5 5.5-.6 9.2A7 7 0 0 1 11 20z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.5 12 16 13 18"></path>
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 bg-clip-text text-transparent">
              বাজার দর
            </span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            দৈনন্দিন প্রয়োজনীয় তাজা শাকসবজি, মাছ-মাংস ও নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর এক নজরে যাচাই করুন।
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">দ্রুত লিংক</h3>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <Link href="/" className="hover:text-emerald-600 transition-colors">হোম পেজ</Link>
            </li>
            <li>
              <Link href="/sign-in" className="hover:text-emerald-600 transition-colors">সাইন ইন / অ্যাকাউন্ট</Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-emerald-600 transition-colors">আমার প্রোফাইল</Link>
            </li>
          </ul>
        </div>

        {/* Disclaimer / Info */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">সতর্কবার্তা</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            এখানে প্রদর্শિત সকল দাম সম্ভাব্য এবং বাজার অবস্থার ওপর নির্ভর করে পরিবর্তনশীল। সঠিক মূল্যের জন্য স্থানীয় বাজারের সাথে মিলিয়ে নিন।
          </p>
        </div>

      </div>

      {/* Copyright Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p className="font-medium">© ২০২৬ বাজার দর — সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="text-[11px] text-emerald-700/80 font-medium">তাজা বাজার দর সবসময় আপনার সাথে 🌿</p>
      </div>
    </footer>
  );
}