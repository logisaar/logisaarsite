import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { LucideIcon } from "lucide-react";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tagline: string;
  color: string;
  size: "normal" | "large" | "wide";
  index: number;
  isInView: boolean;
}

interface Shard {
  id: number;
  points: string;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  rotate: number;
  rotateX: number;
  rotateY: number;
  delay: number;
  scale: number;
}

interface CrackLine {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

// Synthesize glass crack sound via Web Audio API
const playGlassCrack = () => {
  try {
    const ctx = new AudioContext();
    const duration = 0.6;

    // White noise burst for the crack
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      const t = i / ctx.sampleRate;
      const envelope = Math.exp(-t * 12) * (1 + Math.random() * 0.3);
      noiseData[i] = (Math.random() * 2 - 1) * envelope * 0.4;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // High-pass filter for glassy sound
    const highPass = ctx.createBiquadFilter();
    highPass.type = "highpass";
    highPass.frequency.value = 2000;
    highPass.Q.value = 1.5;

    // Bandpass for the "tink" resonance
    const bandPass = ctx.createBiquadFilter();
    bandPass.type = "bandpass";
    bandPass.frequency.value = 4500;
    bandPass.Q.value = 3;

    // Secondary high-pitched crack
    const crackOsc = ctx.createOscillator();
    crackOsc.frequency.value = 3200;
    crackOsc.type = "square";
    const crackGain = ctx.createGain();
    crackGain.gain.setValueAtTime(0.15, ctx.currentTime);
    crackGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    // Tinkling fragments (delayed tiny pings)
    for (let i = 0; i < 5; i++) {
      const pingOsc = ctx.createOscillator();
      pingOsc.frequency.value = 5000 + Math.random() * 4000;
      pingOsc.type = "sine";
      const pingGain = ctx.createGain();
      const pingStart = ctx.currentTime + 0.1 + Math.random() * 0.3;
      pingGain.gain.setValueAtTime(0, pingStart);
      pingGain.gain.linearRampToValueAtTime(0.06, pingStart + 0.005);
      pingGain.gain.exponentialRampToValueAtTime(0.001, pingStart + 0.05 + Math.random() * 0.05);
      pingOsc.connect(pingGain).connect(ctx.destination);
      pingOsc.start(pingStart);
      pingOsc.stop(pingStart + 0.1);
    }

    noiseSource.connect(highPass).connect(ctx.destination);
    noiseSource.connect(bandPass).connect(ctx.destination);
    crackOsc.connect(crackGain).connect(ctx.destination);

    noiseSource.start();
    noiseSource.stop(ctx.currentTime + duration);
    crackOsc.start();
    crackOsc.stop(ctx.currentTime + 0.1);
  } catch {
    // Audio not supported, silently ignore
  }
};

// Synthesize gentle reverse/reassemble sound
const playReassembleSound = () => {
  try {
    const ctx = new AudioContext();
    // Rising shimmer
    for (let i = 0; i < 6; i++) {
      const osc = ctx.createOscillator();
      osc.frequency.value = 800 + i * 400;
      osc.type = "sine";
      const gain = ctx.createGain();
      const start = ctx.currentTime + i * 0.06;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.05, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.2);
    }
    // Final "click" when assembled
    const click = ctx.createOscillator();
    click.frequency.value = 2000;
    click.type = "sine";
    const clickGain = ctx.createGain();
    const clickTime = ctx.currentTime + 0.5;
    clickGain.gain.setValueAtTime(0.1, clickTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.05);
    click.connect(clickGain).connect(ctx.destination);
    click.start(clickTime);
    click.stop(clickTime + 0.1);
  } catch {
    // ignore
  }
};

const generateCracks = (impactX: number, impactY: number): CrackLine[] => {
  const cracks: CrackLine[] = [];
  const numMainCracks = 8 + Math.floor(Math.random() * 5);

  for (let i = 0; i < numMainCracks; i++) {
    const angle = (i / numMainCracks) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const length = 60 + Math.random() * 80;
    cracks.push({
      id: i,
      x1: impactX,
      y1: impactY,
      x2: impactX + Math.cos(angle) * length,
      y2: impactY + Math.sin(angle) * length,
      delay: Math.random() * 0.08,
    });
    if (Math.random() > 0.3) {
      const midX = impactX + Math.cos(angle) * length * 0.5;
      const midY = impactY + Math.sin(angle) * length * 0.5;
      const branchAngle = angle + (Math.random() - 0.5) * 1.2;
      const branchLen = 20 + Math.random() * 40;
      cracks.push({
        id: numMainCracks + i,
        x1: midX,
        y1: midY,
        x2: midX + Math.cos(branchAngle) * branchLen,
        y2: midY + Math.sin(branchAngle) * branchLen,
        delay: 0.04 + Math.random() * 0.06,
      });
    }
  }
  for (let ring = 1; ring <= 2; ring++) {
    const radius = ring * 30;
    const segments = 6 + ring * 2;
    for (let s = 0; s < segments; s++) {
      const a1 = (s / segments) * Math.PI * 2;
      const a2 = ((s + 1) / segments) * Math.PI * 2;
      cracks.push({
        id: 100 + ring * 20 + s,
        x1: impactX + Math.cos(a1) * radius,
        y1: impactY + Math.sin(a1) * radius,
        x2: impactX + Math.cos(a2) * radius,
        y2: impactY + Math.sin(a2) * radius,
        delay: ring * 0.04 + Math.random() * 0.04,
      });
    }
  }
  return cracks;
};

const generateShards = (impactX: number, impactY: number): Shard[] => {
  const shards: Shard[] = [];
  const numShards = 35 + Math.floor(Math.random() * 15);
  for (let i = 0; i < numShards; i++) {
    const numVertices = 3 + Math.floor(Math.random() * 3);
    const cx = Math.random() * 100;
    const cy = Math.random() * 100;
    const shardSize = 4 + Math.random() * 12;
    const vertices: string[] = [];
    for (let v = 0; v < numVertices; v++) {
      const angle = (v / numVertices) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
      const r = shardSize * (0.5 + Math.random() * 0.5);
      vertices.push(`${cx + Math.cos(angle) * r}% ${cy + Math.sin(angle) * r}%`);
    }
    const dx = cx - impactX;
    const dy = cy - impactY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const force = 300 + Math.random() * 500;
    shards.push({
      id: i,
      points: `polygon(${vertices.join(", ")})`,
      originX: cx,
      originY: cy,
      targetX: (dx / dist) * force + (Math.random() - 0.5) * 200,
      targetY: (dy / dist) * force + (Math.random() - 0.5) * 200 + Math.random() * 150,
      rotate: (Math.random() - 0.5) * 1080,
      rotateX: (Math.random() - 0.5) * 360,
      rotateY: (Math.random() - 0.5) * 360,
      delay: 0.12 + Math.random() * 0.15,
      scale: 0.3 + Math.random() * 0.7,
    });
  }
  return shards;
};

const ValueCard = ({ icon: Icon, title, description, tagline, color, size, index, isInView }: ValueCardProps) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [phase, setPhase] = useState<"idle" | "cracking" | "exploding" | "done" | "reassembling">("idle");
  const cardRef = useRef<HTMLDivElement>(null);
  const [revealedLetters, setRevealedLetters] = useState(0);
  const taglineRef = useRef(null);
  const taglineInView = useInView(taglineRef, { once: true, amount: 0.5 });
  const [impactPoint, setImpactPoint] = useState({ x: 50, y: 50 });

  const cracks = useMemo(() => generateCracks(impactPoint.x, impactPoint.y), [impactPoint]);
  const shards = useMemo(() => generateShards(impactPoint.x, impactPoint.y), [impactPoint]);

  useEffect(() => {
    if (!taglineInView) return;
    const interval = setInterval(() => {
      setRevealedLetters((prev) => {
        if (prev >= tagline.length) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [taglineInView, tagline.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || phase !== "idle") return;
    const rect = cardRef.current.getBoundingClientRect();
    setRotate({
      x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -8,
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    if (phase === "done") {
      // Reassemble!
      playReassembleSound();
      setPhase("reassembling");
      setTimeout(() => setPhase("idle"), 800);
      return;
    }

    if (phase !== "idle") return;

    const rect = cardRef.current.getBoundingClientRect();
    setImpactPoint({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    setPhase("cracking");
    setRotate({ x: 0, y: 0 });
    playGlassCrack();

    setTimeout(() => setPhase("exploding"), 200);
    setTimeout(() => setPhase("done"), 1400);
  }, [phase]);

  const sizeClasses = {
    large: "md:col-span-2 md:row-span-1",
    wide: "md:col-span-2",
    normal: "",
  };

  const isShattered = phase !== "idle" && phase !== "reassembling";

  return (
    <motion.div
      ref={cardRef}
      className={`${sizeClasses[size]} relative`}
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => phase === "idle" && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Crack lines */}
      <AnimatePresence>
        {(phase === "cracking" || phase === "exploding") && (
          <svg className="absolute inset-0 w-full h-full z-30 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {cracks.map((c) => (
              <motion.line
                key={c.id}
                x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                stroke="rgba(255,255,255,0.9)" strokeWidth="0.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: phase === "exploding" ? 0 : 1 }}
                transition={{
                  pathLength: { duration: 0.12, delay: c.delay, ease: "easeOut" },
                  opacity: phase === "exploding" ? { duration: 0.15 } : { duration: 0.01, delay: c.delay },
                }}
              />
            ))}
            <motion.circle cx={impactPoint.x} cy={impactPoint.y} r="3" fill="rgba(255,255,255,0.8)"
              initial={{ r: 0, opacity: 1 }} animate={{ r: 12, opacity: 0 }} transition={{ duration: 0.3 }}
            />
          </svg>
        )}
      </AnimatePresence>

      {/* Shards - exploding out or reassembling back */}
      <AnimatePresence>
        {(phase === "exploding" || phase === "done" || phase === "reassembling") && (
          <>
            {shards.map((shard) => (
              <motion.div
                key={shard.id}
                className="absolute z-20 pointer-events-none"
                style={{
                  left: `${shard.originX}%`,
                  top: `${shard.originY}%`,
                  width: "100%",
                  height: "100%",
                  clipPath: shard.points,
                  background: `linear-gradient(${Math.random() * 360}deg, ${color}ee, ${color}99, rgba(255,255,255,0.5))`,
                  border: `1px solid rgba(255,255,255,0.6)`,
                  boxShadow: `0 0 15px ${color}60, inset 0 0 10px rgba(255,255,255,0.3)`,
                }}
                initial={phase === "reassembling"
                  ? { x: shard.targetX, y: shard.targetY, rotate: shard.rotate, opacity: 0, scale: 0 }
                  : { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }
                }
                animate={phase === "reassembling"
                  ? { x: 0, y: 0, rotate: 0, opacity: [0, 1, 1], scale: 1 }
                  : {
                      x: shard.targetX,
                      y: shard.targetY,
                      rotate: shard.rotate,
                      opacity: [1, 1, 0],
                      scale: [1, shard.scale, 0],
                    }
                }
                transition={phase === "reassembling"
                  ? {
                      duration: 0.7,
                      delay: shard.delay * 0.5,
                      ease: [0.34, 1.56, 0.64, 1],
                      opacity: { times: [0, 0.2, 1] },
                    }
                  : {
                      duration: 1.0,
                      delay: shard.delay,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      opacity: { duration: 1.0, delay: shard.delay, times: [0, 0.6, 1] },
                      scale: { duration: 1.0, delay: shard.delay, times: [0, 0.3, 1] },
                    }
                }
              />
            ))}
            {/* Impact flash */}
            {phase === "exploding" && (
              <motion.div
                className="absolute z-30 pointer-events-none rounded-full"
                style={{
                  left: `${impactPoint.x}%`,
                  top: `${impactPoint.y}%`,
                  transform: "translate(-50%, -50%)",
                  background: `radial-gradient(circle, rgba(255,255,255,0.9), ${color}66, transparent)`,
                }}
                initial={{ width: 0, height: 0, opacity: 1 }}
                animate={{ width: 200, height: 200, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}
          </>
        )}
      </AnimatePresence>

      {/* "Click to restore" hint when shattered */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.p
              className="text-xs font-mono tracking-wider text-muted-foreground/60"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              click to restore
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card content */}
      <motion.div
        className={`glass-card h-full p-8 relative overflow-hidden group ${phase === "idle" || phase === "done" ? "cursor-pointer" : ""}`}
        animate={{
          rotateX: isShattered ? 0 : rotate.x,
          rotateY: isShattered ? 0 : rotate.y,
          opacity: phase === "exploding" || phase === "done" ? 0 : 1,
          scale: phase === "cracking" ? 0.98 : phase === "exploding" ? 0.95 : 1,
        }}
        transition={
          phase === "reassembling"
            ? { duration: 0.6, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }
            : phase === "cracking"
              ? { duration: 0.05, ease: "easeOut" }
              : phase === "exploding"
                ? { duration: 0.2, ease: "easeOut" }
                : { type: "spring", stiffness: 300, damping: 30 }
        }
        style={{
          transformStyle: "preserve-3d",
          borderColor: isHovered ? `${color}40` : undefined,
          boxShadow: isHovered ? `0 8px 32px -8px ${color}25, 0 0 0 1px ${color}20` : undefined,
          filter: phase === "cracking" ? "brightness(1.3)" : undefined,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${color}15, transparent 40%, ${color}10)` }}
        />
        <motion.div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 animate-float"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}bb)`,
            boxShadow: `0 4px 20px -4px ${color}50`,
          }}
          whileHover={{ scale: 1.15, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Icon className="text-white" size={24} />
        </motion.div>
        <h3 className="font-display text-xl font-bold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
        <div ref={taglineRef} className="font-mono text-xs tracking-wider" style={{ color }}>
          {tagline.slice(0, revealedLetters)}
          {revealedLetters < tagline.length && (
            <motion.span className="inline-block w-[2px] h-3 ml-0.5 align-middle" style={{ backgroundColor: color }}
              animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
          )}
        </div>
        <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.04] rounded-bl-[3rem]" style={{ backgroundColor: color }} />
      </motion.div>
    </motion.div>
  );
};

export default ValueCard;