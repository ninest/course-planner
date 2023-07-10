import "../styles/globals.scss";

import { NavigationRail } from "./navigation-rail";
import { Providers } from "./providers";

export const metadata = {
  title: {
    template: "%s - Husker",
    default: "Husker",
  },
  description: "Useful resources for Northeastern University",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Default dark theme
    <html lang="en" className="dark">
      <head />
      <Providers>
        <body className="text-gray-500 bg-white dark:bg-gray-950 md:flex">
          <aside className="hidden sticky top-0 md:block flex-none h-screen">
            <NavigationRail />
          </aside>
          <div className="flex-1 min-h-[100dvh]">{children}</div>
        </body>
      </Providers>
    </html>
  );
}
