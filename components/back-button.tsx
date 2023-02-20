import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  text?: string;
  href?: string;
}

export const BackButton = ({ text = "Back", href = "/" }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className="-mx-2 flex items-center align-baseline space-x-0.5 text-sm"
    >
      <ChevronLeft className="w-5" />
      <div>{text}</div>
    </Link>
  );
};
