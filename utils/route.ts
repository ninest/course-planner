import { usePathname } from "next/navigation";

export const useCurrentTermCode = () => {
  return usePathname()?.split("/")[1];
};

export const useCurrentPlanId = () => {
  return usePathname()?.split("/")[2];
};
