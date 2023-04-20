import { ReactNode } from "react";
// import { SearchHeader } from "./search-header";

export default function SearchLayout({children}: {children: ReactNode}) {
  return <main>
    <SearchHeader/>
    <div>
      {/* <SearchResults /> */}
      <div>{children}</div>
    </div>
  </main>
}