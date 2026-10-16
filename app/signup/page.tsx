"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setNotice("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const supabase = createClient();
    const { data, error: signError } = await supabase.auth.signUp({ email, password });
    if (signError) {
      setPending(false);
      setError(signError.message);
      return;
    }
    if (data.session && data.user) {
      await supabase.from("profiles").upsert({ id: data.user.id, email });
      setPending(false);
      router.push("/");
      router.refresh();
      return;
    }
    setPending(false);
    setNotice("Check your email to confirm the account. Your profile is created when you first sign in.");
  }

  return (
    <section className="mx-auto max-w-md px-5 pb-20 pt-36">
      <h1 className="font-display text-4xl text-forest">Sign up</h1>
      <p className="mt-3 text-[15px] text-ink-soft">Create an account with your email and a password of at least 8 characters.</p>
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
        {notice && <p className="text-[13px] text-forest">{notice}</p>}
        <button type="submit" disabled={pending} className="rounded-full bg-forest px-5 py-3 text-[13px] text-white">
          {pending ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="mt-6 text-[14px]">
        Already registered? <Link href="/login" className="text-forest underline">Login</Link>
      </p>
    </section>
  );
}
