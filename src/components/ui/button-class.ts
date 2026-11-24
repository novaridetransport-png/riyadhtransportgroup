export type ButtonVariant = "primary" | "secondary" | "ghost-dark";
const base = "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold transition duration-200 hover:-translate-y-0.5";
const variants: Record<ButtonVariant, string> = {
  primary: "bg-royal text-white hover:bg-royal-dark",
  secondary: "border border-navy bg-white text-navy hover:bg-mist",
  "ghost-dark": "border border-white/40 text-white hover:border-white hover:bg-white/10",
};
export const buttonClass = (variant: ButtonVariant = "primary") => `${base} ${variants[variant]}`;
