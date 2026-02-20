const GradientMesh = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary teal blob */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(170 80% 45%), transparent 70%)",
          left: "30%",
          top: "30%",
          opacity: 0.4,
        }}
      />
      {/* Purple accent blob */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[90px]"
        style={{
          background: "radial-gradient(circle, hsl(210 90% 50%), transparent 70%)",
          left: "55%",
          top: "70%",
          opacity: 0.3,
        }}
      />
      {/* Blue mid blob */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[80px]"
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
