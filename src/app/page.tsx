import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Form from "./client";

export default function Home() {
  return (
    <main className="mx-auto text-center px-4 max-w-2xl py-28">
      <h1 className="md:text-5xl text-3xl mb-7 font-bold text-center">
        Discover Letters That Resonate with Your Heart
      </h1>
      <p className="text-center text-slate-500">
        Please write anything freely on this form about your thoughts, feelings,
        or daily events. Vector search technology will find words from people
        with similar emotional movements to your message, providing unexpected
        connections.
      </p>
      <Form />
    </main>
  );
}
