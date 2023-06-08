import { Loading } from "@/components/loading";
import { slugToCourse2 } from "@/course";

export default function LoadingCoursePage() {
  return (
    <div className="px-5 md:p-5 w-full md:mx-auto md:max-w-[75ch]">
      <div className="mb-2 divide-y">
        <Loading
          heights={[
            3,
            { type: "spacer", height: 1 },
            1,
            { type: "spacer", height: 1 },
            2,
            { type: "spacer", height: 1 },
            3,
          ]}
        />
      </div>
    </div>
  );
}
