import Link from "next/link";
import { SignupForm } from "./SignupForm";

export default function SignupPage() {
  const disabled = process.env.SIGNUP_DISABLED === "true";

  return (
    <section className="mx-auto max-w-md px-5 pb-20 pt-36">
      <h1 className="font-display text-4xl text-forest">Sign up</h1>
      {disabled ? (
        <>
          <p className="mt-3 text-[15px] text-ink-soft">
            New account registration is not open on this site. Contact the team if you need access.
          </p>
          <p className="mt-6 text-[14px]">
            <Link href="/login" className="text-forest underline">
              Back to login
            </Link>
            {" · "}
            <Link href="/contact" className="text-forest underline">
              Contact us
            </Link>
          </p>
        </>
      ) : (
        <>
          <p className="mt-3 text-[15px] text-ink-soft">
            Create an account with your email and a password of at least 8 characters.
          </p>
          <SignupForm />
        </>
      )}
    </section>
  );
}
