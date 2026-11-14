import Image from "next/image";
import type { Person } from "@/content/team";

export function Avatar({ person, size = "md" }: { person: Person; size?: "md" | "lg" }) {
  const dim = size === "lg" ? "h-28 w-28 text-3xl" : "h-16 w-16 text-xl";
  const initials = person.name
    .replace(/^(Dr\.|Prof\.)\s+/, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  if (person.photo) {
    return (
      <Image src={person.photo} alt="" width={160} height={160} className={`${dim} shrink-0 rounded-full object-cover`} />
    );
  }
  return (
    <span
      aria-hidden
      className={`${dim} flex shrink-0 items-center justify-center rounded-full bg-wine-800 font-display italic text-gold`}
    >
      {initials}
    </span>
  );
}
