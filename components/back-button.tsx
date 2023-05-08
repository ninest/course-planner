import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

interface BackButtonProps {
  text?: string;
  href?: string;
}

export const BackButton = ({ text = "Back", href = "/" }: BackButtonProps) => {
  return (
    <Link
      href={href}
      // className="inline-flex items-center align-baseline space-x-0.5 text-sm hover:bg-gray-50"
      className="flex items-center align-baseline space-x-1 text-sm -mx-1 px-1  rounded hover:bg-gray-50"
    >
      <FaChevronLeft className="-ml-1"/>
      {/* <ChevronLeft className="h-5 text-xs w-5" /> */}
      <div>{text}</div>
    </Link>
  );
};
