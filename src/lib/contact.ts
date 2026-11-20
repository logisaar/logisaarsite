export const CONTACT = {
  email: "contact@logisaar.com",
  mailto: "mailto:contact@logisaar.com",
  phone: "+91 85960 72510",
  tel: "tel:+918596072510",
  whatsapp: "https://wa.me/918596072510",
  address: "Bhubaneswar, Odisha, India",
  registeredOffice: "Logisaar Technologies Private Limited, Cuttack, Odisha, India",
  cin: "U62012OD2026PTC053632",
  // TODO(owner): exact address / Google Maps URL. This is a search link until then.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Logisaar+Technologies+Cuttack+Odisha",
} as const;

export const whatsappLink = (text?: string) =>
  text ? `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}` : CONTACT.whatsapp;
