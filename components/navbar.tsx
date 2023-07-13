"use client";

import clsx from "clsx";
import { FaBook, FaGripLines, FaList, FaRegBookmark } from "react-icons/fa";
import { MenuButton } from "./menu-button";

export function Navbar({ noBottomPadding = false }: { noBottomPadding?: boolean }) {
  return (
    <>
      <header className={clsx({ "p-5": !noBottomPadding, "px-5 pt-5": noBottomPadding }, "bg-white dark:bg-dark")}>
        <MenuButton
          items={[
            { icon: FaList, title: "Links", href: "/links" },
            { icon: FaRegBookmark, title: "Wiki", href: "/wiki" },
            { icon: FaBook, title: "Courses", href: "/" },
          ]}
        >
          <div className="border rounded-md p-2">
            <FaGripLines />
          </div>
        </MenuButton>
      </header>
      <nav></nav>
    </>
  );
}
