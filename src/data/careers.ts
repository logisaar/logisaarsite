/** Open roles and where to apply (owner-provided Google Forms, 22 Nov 2026). */
export interface CareerRole {
  id: string;
  title: string;
  /** Google Form URL */
  formUrl: string;
  place: string;
  type: string;
}

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "Business Development Associate",
    title: "Business Development Associate",
    formUrl: "https://forms.gle/yjtrqHWTus85eZkg9",
    place: "Bhubaneswar",
    type: "Full time, freshers welcome",
  },
  {
    id: "Content Creator & Graphic Designer",
    title: "Content Creator & Graphic Designer",
    formUrl: "https://forms.gle/NpEzEMbAwBbRr2QJ9",
    // TODO(owner): confirm the location and type for this role (the old page left the location blank).
    place: "Bhubaneswar",
    type: "Reels, design, video",
  },
];

export const careerRole = (id: string) => CAREER_ROLES.find((r) => r.id === id)!;
