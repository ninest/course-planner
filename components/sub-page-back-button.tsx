import { ChevronLeft } from "lucide-react";
import { Button } from "./button";

interface SubPageBackButtonProps {
  href: string;
}

export const SubPageBackButton = ({ href }: SubPageBackButtonProps) => {
  return (
    <Button
      variant={"ghost"}
      href={href}
      className="-ml-2 flex items-center space-x-2"
    >
      <ChevronLeft className="" />
    </Button>
  );
};
