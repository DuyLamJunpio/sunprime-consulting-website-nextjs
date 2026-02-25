import { type ReactNode } from "react";

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-base text-text-primary selection:bg-brand-soft">
      {children}
    </div>
  );
}
