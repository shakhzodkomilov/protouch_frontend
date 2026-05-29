import { useEffect, useMemo, useState } from "react";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const clamp0 = (n: number) => (n < 0 ? 0 : n);

const compute = (endsAt: string | null | undefined, nowMs: number): Countdown => {
  if (!endsAt) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const endMs = new Date(endsAt).getTime();
  const diffMs = clamp0(endMs - nowMs);
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
};

export function useCountdown(endsAt?: string | null) {
  const [startTime] = useState(() => Date.now());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const nowMs = useMemo(() => startTime + tick * 1000, [startTime, tick]);

  return useMemo(() => compute(endsAt, nowMs), [endsAt, nowMs]);
}
