import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { CalendarCheck, Home, LockKeyhole, MessageCircle, ShieldCheck, Users, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./brand-mark";
import { supabase } from "@/integrations/supabase/client";

const items = [
  { to: "/today", label: "Today", icon: Home },
  { to: "/chat/$threadId", params: { threadId: "demo-welcome" }, label: "Chat", icon: MessageCircle },
  { to: "/check-in", label: "Check-ins", icon: CalendarCheck },
  { to: "/support", label: "Support", icon: Users },
  { to: "/privacy", label: "Privacy", icon: LockKeyhole },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useLocation({ select: (location) => location.pathname });
  const navigate = useNavigate();
  const signOut = async () => { await supabase.auth.signOut(); navigate({ to: "/" }); };
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-card px-4 py-6 md:flex md:flex-col">
        <div className="px-2"><BrandMark /></div>
        <nav className="mt-10 space-y-1" aria-label="Main navigation">
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (label === "Chat" && pathname.startsWith("/chat/"));
            const className = `flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition-colors ${active ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`;
            return label === "Chat"
              ? <Link key={label} to="/chat/$threadId" params={{ threadId: "demo-welcome" }} className={className}><Icon className="size-4" />{label}</Link>
              : <Link key={label} to={to} className={className}><Icon className="size-4" />{label}</Link>;
          })}
        </nav>
        <div className="mt-auto rounded-md border bg-muted/50 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary"><ShieldCheck className="size-4" />Private by choice</div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">You decide what is tracked and when to ask for support.</p>
        </div>
        <Button variant="ghost" className="mt-3 justify-start" onClick={signOut}><LogOut /> Sign out</Button>
      </aside>
      <main className="min-h-screen pb-20 md:ml-64 md:pb-0">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-card/95 px-1 py-2 backdrop-blur md:hidden" aria-label="Mobile navigation">
        {items.map(({ to, label, icon: Icon }) => {
          const className = `flex min-w-0 flex-col items-center gap-1 py-1 text-[10px] font-semibold ${pathname === to || (label === "Chat" && pathname.startsWith("/chat/")) ? "text-primary" : "text-muted-foreground"}`;
          const content = <><Icon className="size-5" /><span className="truncate">{label}</span></>;
          return label === "Chat"
            ? <Link key={label} to="/chat/$threadId" params={{ threadId: "demo-welcome" }} aria-label={label} className={className}>{content}</Link>
            : <Link key={label} to={to} aria-label={label} className={className}>{content}</Link>;
        })}
      </nav>
    </div>
  );
}