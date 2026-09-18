import { createFileRoute } from "@tanstack/react-router";
import { WelcomeScreen } from "@/components/mindtrail/welcome-screen";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Welcome — MindTrail" },
    { name: "description", content: "Sign in to your private MindTrail student wellbeing space." },
    { property: "og:title", content: "Welcome — MindTrail" },
    { property: "og:description", content: "A calm, private space for student check-ins and support." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: WelcomeScreen,
});
