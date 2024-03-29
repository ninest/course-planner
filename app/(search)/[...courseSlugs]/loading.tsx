import { Loading } from "@/components/loading";
import { slugToCourse2 } from "@/course";

export default function LoadingCoursePage() {
  return (
    <div className="pt-3 px-5 md:p-5 w-full md:mx-auto md:max-w-[75ch] space-y-2">
      <Loading className="md:hidden w-10" heights={[2]} />
      <Loading
        heights={[
          3,
          { type: "spacer", height: 1 },
          1,
          { type: "spacer", height: 1 },
          2,
          { type: "spacer", height: 1 },
          3,
          { type: "spacer", height: 1 },
          7,
          { type: "spacer", height: 1 },
          5,
          { type: "spacer", height: 1 },
          7,
        ]}
      />
    </div>
  );
}
