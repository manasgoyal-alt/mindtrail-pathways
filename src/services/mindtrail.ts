import { supabase } from "@/integrations/supabase/client";

export type CheckInInput = { mood: "steady" | "low" | "tense" | "hopeful" | "overwhelmed"; energy: number; stress: number; sleep: number; note?: string };
export type PrivacyInput = { tracking_enabled: boolean; academic_context_enabled: boolean; support_contact_enabled: boolean };

async function userId() {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export const mindtrailService = {
  async saveCheckIn(input: CheckInInput) {
    const id = await userId();
    if (!id) { localStorage.setItem("mindtrail:last-check-in", JSON.stringify({ ...input, created_at: new Date().toISOString() })); return; }
    const { error } = await supabase.from("check_ins").insert({ user_id: id, ...input, note: input.note || null });
    if (error) throw error;
  },
  async savePrivacy(input: PrivacyInput) {
    const id = await userId();
    if (!id) { localStorage.setItem("mindtrail:privacy", JSON.stringify(input)); return; }
    const { error } = await supabase.from("privacy_preferences").upsert({ user_id: id, ...input, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    if (error) throw error;
  },
  async requestSupport(support_type: "peer" | "counsellor") {
    const id = await userId();
    if (!id) { localStorage.setItem("mindtrail:support-request", JSON.stringify({ support_type, consent_confirmed: true, created_at: new Date().toISOString() })); return; }
    const { error } = await supabase.from("support_requests").insert({ user_id: id, support_type, consent_confirmed: true });
    if (error) throw error;
  },
  async saveDemoMessage(threadId: string, role: "user" | "assistant", text: string) {
    const key = `mindtrail:thread:${threadId}`;
    const existing = JSON.parse(localStorage.getItem(key) ?? "[]") as Array<{ role: string; text: string; created_at: string }>;
    localStorage.setItem(key, JSON.stringify([...existing, { role, text, created_at: new Date().toISOString() }]));
  },
};