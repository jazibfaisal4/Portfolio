"use client";

import { useEffect, useState } from "react";

/** True while the mobile nav dialog (`#mobile-nav`) is in the document. */
export function useMobileNavOpen() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function sync() {
      setOpen(Boolean(document.getElementById("mobile-nav")));
    }

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return open;
}
