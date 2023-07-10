"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type MenuItemDisplay = {
  icon?: LucideIcon;
  href?: string;
  title: string;
};
// TODO: either have an action or href not both
type MenuItemAction = MenuItemDisplay & { action?: () => void; href?: string };

type MenuItem = MenuItemAction | "separator";

interface MenuButtonProps {
  children: JSX.Element;
  items: MenuItem[];
}
export const MenuButton = ({ children, items }: MenuButtonProps) => {
  return (
    <div className="relative z-50 inline-block">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="focus:outline-none">{children}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            className="mt-1 ml-5 z-40 shadow-md rounded-xl bg-gray-100 w-52 p-2 border dark:bg-gray-900 dark:border-gray-800"
          >
            {items.map((item, index) => {
              if (item === "separator") {
                return <hr key={index} className="my-2 dark:border-gray-800" />;
              }
              const Icon = item.icon;
              const dropdownMenuItem = (
                <DropdownMenu.Item
                  key={index}
                  onClick={() => {
                    if (item.action) item.action();
                  }}
                  className="text-lg font-medium flex items-center px-4 py-2 text-gray-700 focus:outline-none hover:bg-gray-200 rounded-md dark:hover:bg-gray-800"
                >
                  {/* <div className="w-8 text-gray-500 text-xs ">{Icon && <Icon className="text-lg" />}</div> */}
                  <div className="dark:text-gray-400">{item.title}</div>
                </DropdownMenu.Item>
              );

              if (item.href) {
                return (
                  <Link key={index} href={item.href}>
                    {dropdownMenuItem}
                  </Link>
                );
              }

              return dropdownMenuItem;
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
