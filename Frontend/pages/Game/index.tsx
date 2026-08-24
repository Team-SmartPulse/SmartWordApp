import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function GameHome() {
  const router = useRouter();
  useEffect(() => {
    const mode = router.query.mode === "earn" ? "earn" : "free";
    router.replace(`/Game/level?mode=${mode}`);
  }, [router]);
  return null;
}
