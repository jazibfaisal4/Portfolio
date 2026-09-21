import Image from "next/image";
import { cn } from "@/lib/cn";

type MediaFrameProps = {
  src?: string | null;
  alt: string;
  sizes?: string;
  className?: string;
};

export function MediaFrame({ src, alt, sizes = "100vw", className }: MediaFrameProps) {
  const hasImage = Boolean(src);

  return (
    <figure
      className={cn(
        "relative aspect-video overflow-hidden rounded-lg border border-line bg-surface",
        className,
      )}
    >
      {hasImage && src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="flex h-full min-h-[12rem] items-center justify-center">
          <p className="text-label text-text-dim">Screenshot coming soon</p>
        </div>
      )}
    </figure>
  );
}
