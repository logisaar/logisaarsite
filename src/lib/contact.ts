export const CONTACT = {
  email: "contact@logisaar.com",
  mailto: "mailto:contact@logisaar.com",
  phone: "+91 85960 72510",
  tel: "tel:+918596072510",
  whatsapp: "https://wa.me/918596072510",
  address: "Bhubaneswar, Odisha, India",
  officeAddress: "4th floor, Nalanda Institute of Technology, Khandagiri - Chandaka Rd, Bhubaneswar, Similipatana, Odisha 754012",
  cin: "U62012OD2026PTC053632",
  // Search link built from the office address; swap for a pinned Maps URL if the owner has one.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Nalanda+Institute+of+Technology+Khandagiri+Chandaka+Road+Bhubaneswar+754012",
} as const;

export const whatsappLink = (text?: string) =>
  text ? `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}` : CONTACT.whatsapp;
