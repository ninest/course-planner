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
      className="flex items-center align-baseline space-x-1 text-sm -mx-1 px-1 text-gray-700 dark:text-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <FaChevronLeft className="-ml-1" />
      <div>{text}</div>
    </Link>
  );
};
