import React from "react";
import styles from "../styles/Home.module.css";

export type TxPhase = "idle" | "submitted" | "confirming" | "success" | "error";

export function TxStatus({
  phase,
  successText,
  error,
}: {
  phase: TxPhase;
  successText: string;
  error?: string;
}) {
  if (phase === "idle") return null;
  const copy =
    phase === "submitted"
      ? "Transaction submitted…"
      : phase === "confirming"
      ? "Waiting for confirmation…"
      : phase === "success"
      ? successText
      : error || "Transaction failed. Please try again.";
  const tone =
    phase === "success"
      ? styles.txSuccess
      : phase === "error"
      ? styles.txError
      : styles.txPending;
  return <div className={`${styles.txBanner} ${tone}`}>{copy}</div>;
}
