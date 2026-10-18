"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error: signError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setPending(false);
    if (signError) {
      setError(signError.message);
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <section className="mx-auto max-w-md px-5 pb-20 pt-36">
      <h1 className="font-display text-4xl text-forest">Login</h1>
      <p className="mt-3 text-[15px] text-ink-soft">Use the email and password for your ISTIQEME Technologies account.</p>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <label className="text-[13px]">
          Email
          <input name="email" type="email" required className="mt-1 w-full rounded-xl border border-line px-3 py-3" />
        </label>
        <label className="text-[13px]">
          Password
          <input name="password" type="password" required minLength={8} className="mt-1 w-full rounded-xl border border-line px-3 py-3" />
        </label>
        {error && <p className="text-[13px] text-red-700">{error}</p>}
        <button type="submit" disabled={pending} className="rounded-full bg-forest px-5 py-3 text-[13px] text-white">
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-[14px]">
        New here? <Link href="/signup" className="text-forest underline">Create an account</Link>
      </p>
    </section>
  );
}
