import { cn } from "@/lib/cn";

type Tuple24<T> = [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T];

const WAVEFORM_BARS = [
  0.32, 0.58, 0.84, 0.46, 0.7, 0.38, 0.92, 0.54, 0.76, 0.42, 0.64, 0.88, 0.36, 0.72, 0.5, 0.96, 0.44,
  0.68, 0.8, 0.4, 0.6, 0.9, 0.48, 0.74,
] as const satisfies Tuple24<number>;

type WaveformProps = {
  active: boolean;
  className?: string;
};

export function Waveform({ active, className }: WaveformProps) {
  return (
    <div
      className={cn(
        "waveform flex h-8 w-full max-w-[14rem] items-end gap-px md:h-11",
        active && "is-running",
        className,
      )}
      aria-hidden="true"
    >
      {WAVEFORM_BARS.map((bar, index) => (
        <span
          key={index}
          className="waveform-bar bg-accent"
          style={{
            ["--bar" as string]: bar,
            animationDelay: `${(index % 8) * -0.09}s`,
          }}
        />
      ))}
    </div>
  );
}
