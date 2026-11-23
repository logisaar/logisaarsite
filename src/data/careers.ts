/** Open roles and where to apply (owner-provided Google Forms, 22 Nov 2026). */
export interface CareerRole {
  id: string;
  title: string;
  /** Google Form URL */
  formUrl: string;
  /** Job description (Google Drive) */
  jdUrl: string;
  place: string;
  type: string;
}

/** Job description document (owner-provided, 23 Nov 2026; one document for both roles). */
const JD_URL = "https://drive.google.com/file/d/104B5Menwk_646zZHW4Pm06OdN_s2b4_1/view?usp=sharing";

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "Business Development Associate",
    title: "Business Development Associate",
    formUrl: "https://forms.gle/yjtrqHWTus85eZkg9",
    jdUrl: JD_URL,
    place: "Bhubaneswar",
    type: "Full time, freshers welcome",
  },
  {
    id: "Content Creator & Graphic Designer",
    title: "Content Creator & Graphic Designer",
    formUrl: "https://forms.gle/NpEzEMbAwBbRr2QJ9",
    jdUrl: JD_URL,
    // TODO(owner): confirm the location and type for this role (the old page left the location blank).
    place: "Bhubaneswar",
    type: "Reels, design, video",
  },
];

export const careerRole = (id: string) => CAREER_ROLES.find((r) => r.id === id)!;
