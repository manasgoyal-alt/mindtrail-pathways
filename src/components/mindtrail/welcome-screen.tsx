import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandMark } from "./brand-mark";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export function WelcomeScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function signIn() {
    setBusy(true); setNotice("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) { setNotice(error.message); return; }
    navigate({ to: "/today" });
  }

  async function googleSignIn() {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) setNotice(result.error.message);
    if (!result.redirected && !result.error) navigate({ to: "/today" });
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-[1.08fr_.92fr]">
      <section className="relative hidden overflow-hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <BrandMark />
        <div className="max-w-xl animate-gentle-rise">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">A private pause in your day</p>
          <h1 className="font-display text-6xl font-medium leading-[1.04]">Notice how you’re doing. Choose what comes next.</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-primary-foreground/75">MindTrail offers brief check-ins, supportive conversations, and clear paths to people who can help.</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-primary-foreground/70"><LockKeyhole className="size-4" /> Your participation and tracking choices stay visible and changeable.</div>
      </section>
      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md animate-gentle-rise">
          <div className="mb-10 lg:hidden"><BrandMark /></div>
          <p className="text-sm font-semibold text-primary">WELCOME BACK</p>
          <h2 className="mt-2 font-display text-4xl font-semibold">Your space is ready.</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Sign in to continue. Tracking is always opt-in, and MindTrail does not diagnose or replace professional care.</p>
          <div className="mt-8 space-y-5">
            <div className="space-y-2"><Label htmlFor="email">Student email</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@college.edu" /></div>
            <div className="space-y-2"><Label htmlFor="password">Password</Label><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="pr-11" /><Button type="button" size="icon" variant="ghost" className="absolute right-0 top-0" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff /> : <Eye />}</Button></div></div>
            {notice && <p role="alert" className="text-sm text-destructive">{notice}</p>}
            <Button className="h-11 w-full" disabled={busy || !email || !password} onClick={signIn}>{busy ? "Signing in…" : "Sign in"}</Button>
            <Button className="h-11 w-full" variant="outline" onClick={googleSignIn}>Continue with Google</Button>
            <div className="flex items-center gap-3"><span className="h-px flex-1 bg-border"/><span className="text-xs text-muted-foreground">HACKATHON DEMO</span><span className="h-px flex-1 bg-border"/></div>
            <Button className="h-11 w-full" variant="secondary" onClick={() => navigate({ to: "/today" })}>Enter as mock student</Button>
          </div>
          <p className="mt-8 text-xs leading-5 text-muted-foreground">Demo data is fictional. In a real emergency, contact local emergency services or a trusted person nearby.</p>
        </div>
      </section>
    </main>
  );
}