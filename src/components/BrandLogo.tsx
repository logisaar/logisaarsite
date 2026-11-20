interface BrandLogoProps {
  /** "light" for white/light backgrounds, "white" for dark backgrounds */
  variant?: "light" | "white";
  className?: string;
  priority?: boolean;
}

/** Full Logisaar lockup (LS mark + LogiSaar + TECHNOLOGIES PVT. LTD.). Size it with a height class, never crop it. */
const BrandLogo = ({ variant = "light", className = "", priority = false }: BrandLogoProps) => {
  const name = variant === "white" ? "logisaar-logo-white-480" : "logisaar-logo-480";
  return (
    <picture style={{ display: "contents" }}>
      <source type="image/webp" srcSet={`/brand/${name}.webp`} />
      <img
        src={`/brand/${name}.png`}
        width={480}
        height={114}
        alt="Logisaar Technologies Pvt. Ltd."
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`w-auto ${className}`}
      />
    </picture>
  );
};

export default BrandLogo;
