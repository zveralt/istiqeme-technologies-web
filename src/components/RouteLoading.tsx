"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function RouteLoading() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setShow(true);
    const timer = window.setTimeout(() => setShow(false), 650);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/92 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <img src="/logo.png" alt="" className="h-16 w-auto" />
        <span className="mt-5 h-[2px] w-28 overflow-hidden rounded-full bg-sand">
          <span className="load-bar block h-full w-1/2 bg-ember" />
        </span>
      </div>
    </div>
  );
}
