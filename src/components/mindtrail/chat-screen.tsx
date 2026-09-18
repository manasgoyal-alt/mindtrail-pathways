import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, MessageSquarePlus, MoreHorizontal, PanelLeftClose, ShieldCheck } from "lucide-react";
import type { UIMessage } from "ai";
import { AppShell } from "./app-shell";
import { BrandMark } from "./brand-mark";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea, type PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { mindtrailService } from "@/services/mindtrail";

const initial: UIMessage[] = [
  { id: "welcome", role: "assistant", parts: [{ type: "text", text: "I’m here with you. We can talk through what’s on your mind, make a small plan, or simply pause for a moment. Where would you like to begin?" }] },
];
const threads = [{id:"demo-welcome",title:"A busy week",time:"Today"},{id:"project-pressure",title:"Group project pressure",time:"Tue"},{id:"sleep-reset",title:"Sleep routine",time:"Mon"}];

export function ChatScreen({ threadId }: { threadId: string }) {
  const navigate=useNavigate(); const [messages,setMessages]=useState<UIMessage[]>(initial); const [status,setStatus]=useState<"ready"|"submitted">("ready"); const [showThreads,setShowThreads]=useState(true); const textRef=useRef<HTMLTextAreaElement>(null);
  useEffect(()=>{ textRef.current?.focus(); },[threadId,status]);
  const submit=async (message:PromptInputMessage)=>{ const text=message.text.trim(); if(!text||status!=="ready")return; const user: UIMessage={id:crypto.randomUUID(),role:"user",parts:[{type:"text",text}]}; setMessages((m)=>[...m,user]); setStatus("submitted"); await mindtrailService.saveDemoMessage(threadId,"user",text); await new Promise((resolve)=>setTimeout(resolve,900)); const reply="That sounds like a lot to hold at once. We can slow it down together. Would it help to name the most pressing part, or choose one small thing you can leave for tomorrow?"; setMessages((m)=>[...m,{id:crypto.randomUUID(),role:"assistant",parts:[{type:"text",text:reply}]}]); await mindtrailService.saveDemoMessage(threadId,"assistant",reply); setStatus("ready"); };
  const newThread=()=>navigate({to:"/chat/$threadId",params:{threadId:crypto.randomUUID()}});
  return <AppShell><div className="flex h-[calc(100vh-4.5rem)] md:h-screen">
    {showThreads && <aside className="hidden w-72 shrink-0 border-r bg-card p-4 lg:block"><div className="flex items-center justify-between"><BrandMark compact/><Button size="icon-sm" onClick={newThread} aria-label="New conversation"><MessageSquarePlus/></Button></div><p className="mt-8 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Conversations</p><div className="mt-3 space-y-1">{threads.map((thread)=><Link key={thread.id} to="/chat/$threadId" params={{threadId:thread.id}} className={`block rounded-md px-3 py-3 ${thread.id===threadId?"bg-secondary":"hover:bg-muted"}`}><p className="truncate text-sm font-semibold">{thread.title}</p><p className="mt-1 text-xs text-muted-foreground">{thread.time}</p></Link>)}</div><p className="mt-6 rounded-md bg-muted p-3 text-xs leading-5 text-muted-foreground">MindTrail offers support, not diagnosis or emergency monitoring.</p></aside>}
    <section className="flex min-w-0 flex-1 flex-col">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center border-b bg-card px-4 py-3 sm:px-6"><div className="flex min-w-0 items-center gap-3"><Button variant="ghost" size="icon-sm" asChild><Link to="/today" aria-label="Back to today"><ArrowLeft/></Link></Button><div className="min-w-0"><h1 className="truncate font-semibold">A busy week</h1><p className="truncate text-xs text-muted-foreground">Private conversation · Today</p></div></div><div className="flex shrink-0 gap-1"><Button className="hidden lg:inline-flex" variant="ghost" size="icon-sm" onClick={()=>setShowThreads(false)} aria-label="Hide conversation list"><PanelLeftClose/></Button><Button variant="ghost" size="icon-sm" aria-label="Conversation options"><MoreHorizontal/></Button></div></header>
      <Conversation className="min-h-0"><ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-5 py-8 sm:px-8">{messages.length===0?<ConversationEmptyState icon={<BrandMark compact/>} title="A fresh conversation" description="Share only what feels useful."/>:messages.map((message)=><Message key={message.id} from={message.role} className={message.role==="user"?"max-w-[82%]":"max-w-full"}><MessageContent className={message.role==="user"?"bg-primary text-primary-foreground":"bg-transparent px-0 py-0"}>{message.parts.map((part,index)=>part.type==="text"?<MessageResponse key={index}>{part.text}</MessageResponse>:null)}</MessageContent><time className={`text-[10px] text-muted-foreground ${message.role==="user"?"text-right":""}`}>Just now</time></Message>)}{status==="submitted"&&<div className="flex items-center gap-3"><BrandMark compact/><Shimmer>Thinking with you…</Shimmer></div>}</ConversationContent><ConversationScrollButton/></Conversation>
      <div className="border-t bg-card px-4 py-4 sm:px-6"><div className="mx-auto max-w-3xl"><PromptInput onSubmit={submit}><PromptInputTextarea ref={textRef} placeholder="Write what’s on your mind…" aria-label="Message MindTrail"/><PromptInputFooter className="justify-between"><span className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><ShieldCheck className="size-3.5"/>You choose what to share</span><PromptInputSubmit status={status} disabled={status!=="ready"}/></PromptInputFooter></PromptInput><div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>MindTrail can make mistakes and does not diagnose.</span><Link to="/support" className="font-semibold text-primary">Need a person?</Link></div></div></div>
    </section>
  </div></AppShell>;
}