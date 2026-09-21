import Image from "next/image";
import { projectsCopy } from "@/constants";
import { cn } from "@/lib/cn";

type MediaFrameProps = {
  src?: string | null;
  alt: string;
  sizes?: string;
  className?: string;
  videoSrc?: string | null;
  poster?: string | null;
};

export function MediaFrame({
  src,
  alt,
  sizes = "100vw",
  className,
  videoSrc,
  poster,
}: MediaFrameProps) {
  const hasVideo = Boolean(videoSrc);
  const hasImage = Boolean(src);

  return (
    <figure
      className={cn(
        "relative aspect-video overflow-hidden rounded-lg border border-line bg-surface",
        className,
      )}
    >
      {hasVideo && videoSrc ? (
        <video
          className="h-full w-full object-cover"
          controls
          preload="none"
          playsInline
          poster={poster || undefined}
          title={alt}
        >
          <source src={videoSrc} />
        </video>
      ) : hasImage && src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="flex h-full min-h-[12rem] items-center justify-center px-4">
          <p className="text-label text-text-dim">{projectsCopy.screenshotSoon}</p>
        </div>
      )}
    </figure>
  );
}
