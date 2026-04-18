"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    onClose();
    await signOut();
    router.refresh();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 opacity-100"
          onClick={onClose}
        />
      )}


      {/* Drawer Panel */}
      <div
        className={`fixed right-0 top-0 z-[70] h-full w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-lg object-cover" />
              <span className="text-lg font-black text-slate-900">Menu</span>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {/* User Account Section */}
            <div className="mb-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-6 font-outfit">My Account</h3>
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100/50">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white uppercase">
                      {user.email?.[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {user.user_metadata?.full_name || user.email?.split("@")[0]}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <nav className="space-y-1">
                    <Link href="/profile" onClick={onClose} className="flex items-center py-3 text-base font-bold text-slate-800 hover:text-emerald-600 border-b border-slate-50">
                      View Profile
                    </Link>
                    <Link href="/cart" onClick={onClose} className="flex items-center py-3 text-base font-bold text-slate-800 hover:text-emerald-600 border-b border-slate-50">
                      My Orders
                    </Link>
                    <button onClick={handleLogout} className="flex w-full items-center py-3 text-base font-bold text-rose-600 hover:text-rose-700">
                      Sign Out
                    </button>
                  </nav>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-sm font-medium text-slate-600 mb-4">Log in to track orders and manage your profile.</p>
                  <Link 
                    href="/login" 
                    onClick={onClose}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Access Section */}
            <div className="mb-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-6 font-outfit">Quick Access</h3>
              <nav className="space-y-1">
                {[
                  { name: "Store Home", href: "/" },
                  { name: "All Products", href: "/products" },
                  { name: "Your Cart", href: "/cart" },
                  { name: "Checkout", href: "/checkout" },
                  { name: "AI Assistant", href: "/assistant" },
                ].map((item) => (

                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center py-3 text-base font-bold text-slate-800 hover:text-emerald-600 transition-colors border-b border-slate-50 last:border-0"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Customer Care Section */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-6 font-outfit">Customer Care</h3>
              <nav className="space-y-1">
                {[
                  { name: "Admin Portal", href: "/admin" },
                  { name: "About Us", href: "/about" },
                  { name: "Contact & Support", href: "/contact" },
                  { name: "Privacy Policy", href: "/privacy-policy" },
                ].map((item) => (

                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center py-3 text-base font-bold text-slate-800 hover:text-emerald-600 transition-colors border-b border-slate-50 last:border-0"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Footer inside Drawer */}
          <div className="border-t border-slate-100 p-6 bg-slate-50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
              © 2026 Asali Swad Premium
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

