const GradientMesh = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary teal blob */}
      <div
        className="absolute w-[43.75rem] h-[43.75rem] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(170 80% 45%), transparent 70%)",
          left: "30%",
          top: "30%",
          opacity: 0.4,
        }}
      />
      {/* Purple accent blob */}
      <div
        className="absolute w-[37.5rem] h-[37.5rem] rounded-full blur-[90px]"
        style={{
          background: "radial-gradient(circle, hsl(210 90% 50%), transparent 70%)",
          left: "55%",
          top: "70%",
          opacity: 0.3,
        }}
      />
      {/* Blue mid blob */}
      <div
        className="absolute w-[31.25rem] h-[31.25rem] rounded-full blur-[80px]"
        style={{
          background: "radial-gradient(circle, hsl(220 80% 50%), transparent 70%)",
          left: "50%",
          top: "40%",
          opacity: 0.2,
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
};

export default GradientMesh;
