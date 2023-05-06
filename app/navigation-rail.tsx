import { FaSearch, FaTable } from "react-icons/fa";

export function NavigationRail() {
  return (
    <div className="w-16 border-r h-full">
      <div className="h-[5rem] p-5 flex justify-center items-center">
        <div className="w-5 h-5 bg-gray-500 rounded-md"></div>
      </div>
      <div className="flex justify-center items-center">
        <div className="space-y-2">
          <div className="bg-gray-100 text-gray-600 p-4 rounded-lg">
            <FaSearch />
          </div>
          <div className="hover:bg-gray-100 text-gray-600 p-4 rounded-lg">
            <FaTable />
          </div>
        </div>
      </div>
    </div>
  );
}
