import React from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "as"> &
  MotionProps & {
    children?: React.ReactNode;
    as?: React.ElementType;
    to?: string;
    [key: string]: unknown;
  };

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className = "",
  as = "button",
  ...rest
}) => {
  // Wrap custom React components (like react-router-dom Link) using motion()
  // created once per `as`, not on every render (motion.create replaces the deprecated motion())
  const Component = React.useMemo(
    () => (typeof as === "string" ? ((motion as unknown as Record<string, React.ElementType>)[as] || motion.button) : motion.create(as)),
    [as],
  );

  return (
    <Component
      {...rest}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      }}
      className={cn(
        "group inline-flex items-center justify-center h-12 px-8 rounded-full relative overflow-hidden bg-gradient-primary hover:shadow-glow text-white border-0 text-base font-semibold",
        "transition-all duration-200 hover:-translate-y-[0.125rem] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        "[--shine:rgba(255,255,255,.66)]",
        className
      )}
    >
      {/* Text with shine mask */}
      <motion.span
        className="tracking-wide flex items-center justify-center h-full w-full relative z-10 gap-2"
        style={{
          WebkitMaskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
          maskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
        }}
        initial={{ "--mask-x": "100%" } as never}
        animate={{ "--mask-x": "-100%" } as never}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
          repeatDelay: 1.2,
        }}
      >
        {children}
      </motion.span>

      {/* Border shine effect */}
      <motion.span
        className="block absolute inset-0 rounded-full p-px"
        style={{
          background:
            "linear-gradient(-75deg, transparent 30%, var(--shine) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        initial={{ backgroundPosition: "100% 0", opacity: 0 }}
        animate={{ backgroundPosition: ["100% 0", "0% 0"], opacity: [0, 1, 0] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1.2,
        }}
      />
    </Component>
  );
};

export default AnimatedButton;
