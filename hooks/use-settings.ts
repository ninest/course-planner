import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const themes = ["light", "dark"] as const;
type Theme = (typeof themes)[number];

interface Settings {
  theme: Theme;
}

const settingsAtom = atomWithStorage<Settings>("settings", {
  theme: "dark",
});

export function useSettings() {
  const [settings, setSettings] = useAtom(settingsAtom);

  const mergeSettings = (newSettings: Partial<Settings>) => {
    setSettings({ ...settings, ...newSettings });
  };

  return { settings, setSettings, mergeSettings };
}

export function useTheme() {
  const { settings, mergeSettings } = useSettings();

  const setTheme = (theme: Theme) => {
    mergeSettings({ theme });
    document.documentElement.className = theme;
  };

  const toggleTheme = () => {
    if (settings.theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const isLightTheme = settings.theme == "light";
  const isDarkTheme = settings.theme == "dark";

  return {
    setTheme,
    toggleTheme,
    isLightTheme,
    isDarkTheme,
  };
}
