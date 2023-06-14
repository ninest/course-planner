import { atom, useAtom } from "jotai";

const bottomSheetExpandedAtom = atom(false);

export function useBottomSheet() {
  const [bottomSheetExpanded, setBottomSheetExpanded] = useAtom(bottomSheetExpandedAtom);

  return { bottomSheetExpanded, setBottomSheetExpanded };
}
