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
  width?: number;
  height?: number;
  caption?: string;
};

export function MediaFrame({
  src,
  alt,
  sizes = "100vw",
  className,
  videoSrc,
  poster,
  width,
  height,
  caption,
}: MediaFrameProps) {
  const hasVideo = Boolean(videoSrc);
  const hasImage = Boolean(src);
  const frameWidth = width ?? 1600;
  const frameHeight = height ?? 900;
  const ratioStyle =
    width && height
      ? { aspectRatio: `${width} / ${height}` }
      : undefined;

  return (
    <figure className={cn("min-w-0", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-line bg-surface",
          !ratioStyle && "aspect-video",
        )}
        style={ratioStyle}
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
          <Image
            src={src}
            alt={alt}
            width={frameWidth}
            height={frameHeight}
            sizes={sizes}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full min-h-[12rem] items-center justify-center px-4">
            <p className="text-label text-text-dim">{projectsCopy.screenshotSoon}</p>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2 text-label text-text-dim">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
