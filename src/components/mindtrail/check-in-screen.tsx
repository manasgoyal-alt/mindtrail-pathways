import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AppShell } from "./app-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  { key: "mood", title: "How has your mood felt today?", options: ["Steady", "Low", "Tense", "Hopeful", "Overwhelmed"] },
  { key: "energy", title: "How is your energy right now?", options: ["Very low", "Low", "Okay", "Good", "Strong"] },
  { key: "stress", title: "How much pressure are you carrying?", options: ["Very little", "A little", "Some", "A lot", "Too much"] },
  { key: "sleep", title: "How restorative was your sleep?", options: ["Not at all", "A little", "Somewhat", "Mostly", "Very"] },
] as const;

export function CheckInScreen() {
  const navigate = useNavigate(); const [step,setStep]=useState(0); const [answers,setAnswers]=useState<Record<string,string>>({}); const [note,setNote]=useState(""); const done=step===steps.length; const current=steps[step];
  return <AppShell><div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-8 sm:px-8 lg:py-12">
    <div className="flex items-center justify-between"><Button variant="ghost" onClick={() => step ? setStep(step-1) : navigate({to:"/today"})}><ArrowLeft /> Back</Button><span className="text-xs font-semibold text-muted-foreground">{Math.min(step+1,5)} of 5</span></div>
    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary transition-[width] duration-500" style={{width:`${((step+1)/5)*100}%`}} /></div>
    <div className="my-auto py-12 animate-gentle-rise" key={step}>
      {!done && current ? <><p className="text-sm font-semibold text-primary">A quick check-in</p><h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">{current.title}</h1><p className="mt-3 text-sm text-muted-foreground">Choose the answer that feels closest. There is no right answer.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{current.options.map((option,index)=><Button key={option} variant={answers[current.key]===String(index+1)?"default":"outline"} className="h-auto justify-start whitespace-normal px-5 py-4 text-left" onClick={()=>setAnswers({...answers,[current.key]:String(index+1)})}><span className="mr-2 grid size-6 shrink-0 place-items-center rounded-full border text-xs">{index+1}</span>{option}</Button>)}</div></> : <><p className="text-sm font-semibold text-primary">Optional</p><h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Anything else you want to name?</h1><p className="mt-3 text-sm text-muted-foreground">Keep it brief, or leave this blank.</p><Textarea value={note} onChange={(e)=>setNote(e.target.value)} maxLength={280} rows={5} className="mt-8" placeholder="A thought, a pressure, or something that helped…"/><p className="mt-2 text-right text-xs text-muted-foreground">{note.length}/280</p></>}
    </div>
    <div className="flex items-center justify-between border-t pt-5"><Button variant="ghost" onClick={()=> done ? navigate({to:"/today"}) : setStep(step+1)}>Skip</Button><Button disabled={!done && current ? !answers[current.key] : false} onClick={()=> done ? navigate({to:"/today"}) : setStep(step+1)}>{done ? <><Check /> Finish check-in</> : <>Continue <ArrowRight /></>}</Button></div>
  </div></AppShell>;
}