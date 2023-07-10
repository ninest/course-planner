import { Navbar } from "@/components/navbar";
import { ReactNode } from "react";

export default async function HubLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="block md:hidden">
        <Navbar noBottomPadding />
      </div>
      <main className="p-5 md:max-w-[80ch] md:mx-auto">{children}</main>
    </>
  );
}
