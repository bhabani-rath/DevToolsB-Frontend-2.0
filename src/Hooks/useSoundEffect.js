import { useCallback } from "react";

export const useSoundEffect = (soundUrl) => {
  const playSound = useCallback(() => {
    const audio = new Audio(soundUrl);
    audio.volume = 0.3;
    audio.play().catch((e) => console.log("Sound play failed:", e));
  }, [soundUrl]);

  return playSound;
};
