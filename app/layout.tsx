import "../styles/globals.scss";

import { NavigationRail } from "./navigation-rail";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <Providers>
        <body className="text-gray-500 md:flex">
          <aside className="hidden sticky top-0 md:block flex-none h-screen">
            <NavigationRail />
          </aside>
          <div className="flex-1 min-h-[100dvh]">{children}</div>
        </body>
      </Providers>
    </html>
  );
}
