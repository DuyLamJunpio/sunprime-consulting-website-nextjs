import { type ReactNode } from "react";

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-base text-text-primary selection:bg-brand-soft">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        {children}
      </div>
    </div>
  );
}
