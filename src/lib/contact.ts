export const CONTACT = {
  email: "contact@logisaar.com",
  mailto: "mailto:contact@logisaar.com",
  phone: "+91 85960 72510",
  tel: "tel:+918596072510",
  whatsapp: "https://wa.me/918596072510",
  address: "Bhubaneswar, Odisha, India",
} as const;

export const whatsappLink = (text?: string) =>
  text ? `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}` : CONTACT.whatsapp;
