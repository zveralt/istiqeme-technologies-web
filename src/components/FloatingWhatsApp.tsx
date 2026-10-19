import { site, waLink } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(site.whatsapp.defaultText)}
      target="_blank"
      rel="noreferrer"
      aria-label="Message us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-[2.75rem] items-center gap-2 rounded-full bg-whatsapp px-4 py-3 font-dm text-[13px] font-semibold text-white shadow-[0_18px_40px_-16px_rgba(18,140,126,0.8)] transition-[background-color,transform] duration-200 hover:bg-[#0f7a6e] active:scale-[0.97]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l5.9-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.5.7.7-3.4-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.5l.4-.5.3-.4c.1-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3s-1 1-1 2.4 1 2.8 1.2 3 .2.4 2.1 3.3a11.8 11.8 0 0 0 3.4 2.1c.5.2.9.2 1.2.1s1.6-.7 1.8-1.3.2-1.2.1-1.3-.3-.2-.6-.3Z" />
      </svg>
      WhatsApp
    </a>
  );
}
