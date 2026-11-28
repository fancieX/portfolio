import { useId } from "react";

export interface ClientLogoItem {
  /** Stable lowercase slug for test IDs and React keys */
  id: string;
  /** Displayed client partnership wordmark */
  name: string;
}

export interface ClientLogosProps {
  /** Uppercase social-proof eyebrow label */
  eyebrow?: string;
  /** Client partnership wordmarks rendered in horizontal wrap row */
  clients?: readonly ClientLogoItem[];
  /** Optional wrapper class name */
  className?: string;
}

export const DEFAULT_CLIENT_LOGOS: readonly ClientLogoItem[] = [
  { id: "northwind", name: "Northwind" },
  { id: "lumen-co", name: "Lumen&Co" },
  { id: "parcelly", name: "Parcelly" },
  { id: "ostra", name: "Ostra" },
  { id: "halcyon", name: "Halcyon" },
];

/**
 * ClientLogos
 *
 * Hero social proof row reproducing Snapline's `Trust` (`.framer-6lxo89`)
 * and `Client Row` (`.framer-1dnbg79`) typography, spacing, muted monochrome
 * styling, hover contrast transition, and `[0.16, 1, 0.3, 1]` entrance curve.
 */
export function ClientLogos({
  eyebrow = "Trusted by 50+ teams",
  clients = DEFAULT_CLIENT_LOGOS,
  className = "",
}: ClientLogosProps) {
  const eyebrowId = useId();
  const visibleClients = clients.filter((item) => item.name.trim().length > 0);

  if (visibleClients.length === 0) {
    return null;
  }

  return (
    <div
      role="region"
      aria-labelledby={eyebrowId}
      data-testid="client-logos"
      className={[
        "flex w-full flex-col items-start gap-3 pt-[18px] animate-hero-trust",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p
        id={eyebrowId}
        data-testid="client-logos-eyebrow"
        className="w-full font-sans text-[11px] font-normal uppercase leading-[1.2] tracking-[0.14em] text-[#8A8A8A] select-none"
      >
        {eyebrow}
      </p>

      <ul
        role="list"
        data-testid="client-logos-row"
        className="flex w-full flex-wrap items-center justify-start gap-x-[26px] gap-y-2.5"
      >
        {visibleClients.map((client) => (
          <li
            key={client.id}
            data-testid={`client-logo-${client.id}`}
            className="cursor-default whitespace-nowrap font-sans text-[15px] font-medium leading-[1.55] tracking-[-0.02em] text-[#605F5F]/85 transition-[color,opacity] duration-200 ease-out hover:text-[#2A2926] hover:opacity-100 select-none"
          >
            {client.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientLogos;
