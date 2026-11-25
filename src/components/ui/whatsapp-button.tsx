import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappUrl } from "@/config/site";
import { buttonClass, type ButtonVariant } from "./button-class";

/** WhatsApp and call buttons. Each renders only when its number is set in config/site.ts. */
export function WhatsAppButton({ variant = "ghost-dark" }: { variant?: ButtonVariant }) {
  const href = whatsappUrl("Hello, I would like a quote for a private transfer.");
  const { phone } = site.contact;
  return (
    <>
      {href && <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant)}>
      <MessageCircle className="size-5" aria-hidden="true" /> WhatsApp us
      </a>}
      {phone && <a href={`tel:${phone}`} className={buttonClass(variant)}>
        <Phone className="size-5" aria-hidden="true" /> Call us
      </a>}
    </>
  );
}
