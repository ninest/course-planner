import "../styles/globals.scss";

import { NavigationRail } from "./navigation-rail";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <Providers>
        <body className="text-gray-500 md:flex">
          <aside className="hidden md:block flex-none">
            <NavigationRail />
          </aside>
          <div className="flex-1 min-h-screen">{children}</div>
        </body>
      </Providers>
    </html>
  );
}
