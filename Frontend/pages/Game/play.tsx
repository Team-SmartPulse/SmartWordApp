import React from "react";
import { useRouter } from "next/router";
import GameBoard from "../../Components/GameBoard";
import { parseLevelId, parseMode, parseStage } from "../../lib/game";

export default function PlayPage() {
  const router = useRouter();
  if (!router.isReady) return null;
  return (
    <GameBoard
      levelId={parseLevelId(router.query.level)}
      stage={parseStage(router.query.stage)}
      mode={parseMode(router.query.mode)}
    />
  );
}
