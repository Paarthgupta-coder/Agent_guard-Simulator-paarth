import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentGuard — Agent Flight Simulator",
  description:
    "The reliability layer for the agent economy. Test AI agents against synthetic users, adversarial prompts, and edge cases before they touch a real customer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
