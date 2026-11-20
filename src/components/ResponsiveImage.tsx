import type { ImgHTMLAttributes } from "react";
import type { ResponsiveSrc } from "@/data/images";

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> {
  image: ResponsiveSrc;
  alt: string;
  /** set true for above-the-fold images */
  priority?: boolean;
}

/** AVIF + WebP at 800w / 1600w, lazy by default, with explicit dimensions. */
const ResponsiveImage = ({ image, alt, priority = false, sizes = "(min-width: 1024px) 50vw, 100vw", ...rest }: Props) => (
  <picture>
    <source type="image/avif" srcSet={`${image.base}-800.avif 800w, ${image.base}-1600.avif 1600w`} sizes={sizes} />
    <source type="image/webp" srcSet={`${image.base}-800.webp 800w, ${image.base}-1600.webp 1600w`} sizes={sizes} />
    <img
      src={`${image.base}-800.webp`}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      {...rest}
    />
  </picture>
);

export default ResponsiveImage;
