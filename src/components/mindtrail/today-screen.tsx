import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, ChevronRight, CircleHelp, LockKeyhole, MessageCircle, Wind } from "lucide-react";
import { useState } from "react";
import { AppShell } from "./app-shell";
import { PageHeader } from "./page-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function TodayScreen() {
  const [nudge, setNudge] = useState<"available" | "saved" | "dismissed">("available");
  return <AppShell><div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
    <PageHeader eyebrow="Friday · Week 6" title="Good afternoon, Asha." description="A quiet place to notice what’s changed and choose your next step." action={<div className="hidden items-center gap-2 rounded-full border bg-card px-3 py-2 text-xs font-semibold sm:flex"><span className="size-2 rounded-full bg-success" /> Tracking is on</div>} />
    <section className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
      <div className="animate-gentle-rise border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between"><p className="text-sm font-semibold">Today’s check-in</p><span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">About 15 seconds</span></div>
        <h2 className="mt-7 max-w-xl font-display text-3xl font-semibold">How are you arriving today?</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">A few quick questions about mood, energy, stress, and sleep. Skip anything you’d rather not answer.</p>
        <Button asChild className="mt-7 h-11"><Link to="/check-in">Start check-in <ArrowRight /></Link></Button>
      </div>
      <div className="animate-gentle-rise border bg-primary p-6 text-primary-foreground shadow-sm [animation-delay:80ms]">
        <MessageCircle className="size-6" /><h2 className="mt-6 font-display text-2xl font-semibold">Want to talk it through?</h2><p className="mt-3 text-sm leading-6 text-primary-foreground/75">Start a private conversation at your own pace. MindTrail listens without judging.</p><Button asChild variant="secondary" className="mt-6"><Link to="/chat/demo-welcome">Open chat <ChevronRight /></Link></Button>
      </div>
    </section>
    <section className="mt-5 grid gap-5 lg:grid-cols-2">
      <div className="border bg-card p-6">
        <div className="flex items-center gap-2"><BookOpen className="size-4 text-warm"/><p className="text-sm font-semibold">What changed this week</p></div>
        <p className="mt-4 font-display text-xl font-semibold">Two assignment dates moved closer together.</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">This fictional academic update is included only because demo consent is enabled. It does not determine how you are feeling.</p>
      </div>
      <div className="border bg-card p-6">
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Wind className="size-4 text-primary"/><p className="text-sm font-semibold">A gentle suggestion</p></div><span className="text-xs text-muted-foreground">Optional</span></div>
        {nudge === "available" ? <><p className="mt-4 font-display text-xl font-semibold">Take a two-minute breathing break.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">You noted lower energy recently, and your study schedule changed.</p><div className="mt-5 flex flex-wrap gap-2"><Button onClick={() => setNudge("saved")}><Check /> Save for later</Button><Button variant="outline" onClick={() => setNudge("dismissed")}>Not now</Button><Dialog><DialogTrigger asChild><Button variant="ghost" size="icon" aria-label="Why this appeared"><CircleHelp /></Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Why this appeared</DialogTitle><DialogDescription>Recent check-ins mentioned less energy, and the fictional demo timetable shows two deadlines moving closer. No hidden score or diagnosis is being shown.</DialogDescription></DialogHeader></Dialog></div></> : <div className="mt-5 rounded-md bg-muted p-4 text-sm">{nudge === "saved" ? "Saved. You can revisit it whenever it feels useful." : "Dismissed. MindTrail will not keep prompting you today."}</div>}
      </div>
    </section>
    <section className="mt-5 grid gap-5 sm:grid-cols-3">
      {[['Check-in completed','Yesterday · 8:20 PM'],['Breathing pause','Tuesday · 4:10 PM'],['Support options viewed','Monday · 1:35 PM']].map(([title,time]) => <div key={title} className="border bg-card p-5"><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-muted-foreground">{time}</p></div>)}
    </section>
    <div className="mt-5 flex items-center gap-3 border bg-muted/50 p-4 text-sm"><LockKeyhole className="size-5 shrink-0 text-primary"/><p className="min-w-0 text-muted-foreground">You can change tracking and visibility choices at any time.</p><Button asChild variant="ghost" className="ml-auto shrink-0"><Link to="/privacy">Review privacy</Link></Button></div>
  </div></AppShell>;
}