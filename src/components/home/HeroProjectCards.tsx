import { motion, useMotionValue, useTransform, useAnimationControls } from "framer-motion";
import { useRef, RefObject, useCallback, useEffect, useMemo } from "react";
import { projects as allProjects } from "@/data/projects";

const rotations = [-8, 7, -4];
const cardPositions = [
  { x: 0, y: -80 },
  { x: 60, y: 20 },
  { x: -40, y: 120 },
];

function shuffleAndPick(arr: typeof allProjects, count: number) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count).map((p, i) => ({
    name: p.title,
    image: p.image,
    rotate: rotations[i],
    posX: cardPositions[i].x,
    posY: cardPositions[i].y,
  }));
}

const floatDurations = [5, 6, 4.5];

const playDropSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch {}
};

const ProjectCard = ({
  project,
  index,
  dragConstraintsRef,
}: {
  project: { name: string; image: string; rotate: number; posX: number; posY: number };
  index: number;
  dragConstraintsRef: RefObject<HTMLDivElement>;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const controls = useAnimationControls();

  // Run entrance animation on mount
  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 1.4 + index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    });
  }, [controls, index]);

  const rotateXVal = useTransform(mouseY, [0, 1], [6, -6]);
  const rotateYVal = useTransform(mouseX, [0, 1], [-6, 6]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleDragEnd = useCallback(() => {
    playDropSound();
    // Clear any existing timer
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    // Snap back to origin after 3 seconds
    snapTimerRef.current = setTimeout(() => {
      controls.start({
        x: project.posX,
        y: project.posY,
        transition: { type: "spring", stiffness: 200, damping: 20 },
      });
    }, 3000);
  }, [controls, project.posX, project.posY]);

  return (
    <motion.div
      ref={cardRef}
      animate={controls}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      drag
      dragConstraints={dragConstraintsRef}
      dragElastic={0.15}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0 }}
      style={{
        rotateX: rotateXVal,
        rotateY: rotateYVal,
        rotate: project.rotate,
        x: project.posX,
        y: project.posY,
        transformStyle: "preserve-3d",
        zIndex: 3 - index,
      }}
      className="absolute w-[180px] md:w-[280px] cursor-grab active:cursor-grabbing shadow-lg rounded-xl"
      whileHover={{ scale: 1.05, zIndex: 30 }}
      whileDrag={{ scale: 1.08, zIndex: 50, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
    >
      <motion.div
        animate={{ y: index === 1 ? [0, 8, 0] : index === 2 ? [0, -6, 0] : [0, -10, 0] }}
        transition={{
          duration: floatDurations[index],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="rounded-t-xl bg-card/80 backdrop-blur-xl border border-border px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-destructive/60" />
            <span className="w-2 h-2 rounded-full bg-primary/40" />
            <span className="w-2 h-2 rounded-full bg-primary/60" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[10px] text-muted-foreground font-medium tracking-wide">
              {project.name}
            </span>
          </div>
        </div>
        <div className="rounded-b-xl overflow-hidden border border-t-0 border-border">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-auto object-cover pointer-events-none"
            loading="lazy"
            draggable={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const HeroProjectCards = ({ dragConstraintsRef }: { dragConstraintsRef: RefObject<HTMLDivElement> }) => {
  const heroProjects = useMemo(() => shuffleAndPick(allProjects, 3), []);

  return (
    <div
      className="relative w-full flex items-center justify-center py-12 overflow-visible"
      style={{ perspective: "800px" }}
    >
      <div className="absolute w-[250px] h-[250px] rounded-full bg-primary/15 blur-[80px] z-0" />
      <div className="relative w-[280px] md:w-[400px] h-[350px] md:h-[450px]">
        {heroProjects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} dragConstraintsRef={dragConstraintsRef} />
        ))}
      </div>
    </div>
  );
};

export default HeroProjectCards;
