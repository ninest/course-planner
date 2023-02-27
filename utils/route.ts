import { usePathname } from "next/navigation";

export const useCurrentPlanId = () => {
  return usePathname()?.split("/")[2];
}