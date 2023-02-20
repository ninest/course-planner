import { X } from "lucide-react";

interface XButtonProps {
  text?: string;
  action: (...args: any[]) => void;
}
export const XButton = ({ text = "cancel", action }: XButtonProps) => {
  return (
    <button onClick={() => action()} className="flex items-center justify-center text-gray-500 space-x-1 text-sm hover:bg-gray-50">
      <X className="w-3" />
      <div>{text}</div>
    </button>
  );
};
