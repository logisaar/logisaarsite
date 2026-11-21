import { OrdersDemo } from "./OrdersDemo";
import { ReceptionistDemo } from "./ReceptionistDemo";
import { WorkflowDemo } from "./WorkflowDemo";
import { DocsDemo } from "./DocsDemo";
import type { Crop } from "./DemoShell";

export { OrdersDemo, ReceptionistDemo, WorkflowDemo, DocsDemo };
export type { Crop };

/** Crops (native px) that show the most telling part of each demo in small cards. */
export const MINI_CROPS: Record<string, Crop> = {
  "software-development": { x: 220, y: 60, w: 980, h: 520 },
  "ai-agents": { x: 0, y: 0, w: 1200, h: 620 },
  "business-automation": { x: 0, y: 70, w: 900, h: 560 },
  "ai-software": { x: 240, y: 0, w: 960, h: 580 },
};

/** The demo for a service id from src/data/company.ts. */
export const ServiceDemo = ({ id, active = true, mini = false, className }: { id: string; active?: boolean; mini?: boolean; className?: string }) => {
  const crop = mini ? MINI_CROPS[id] : undefined;
  const props = { active, crop, className };
  switch (id) {
    case "software-development": return <OrdersDemo {...props} />;
    case "ai-agents": return <ReceptionistDemo {...props} />;
    case "business-automation": return <WorkflowDemo {...props} />;
    default: return <DocsDemo {...props} />;
  }
};
