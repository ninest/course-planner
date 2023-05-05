interface LoadingProps {
  heights: (number | { type: "spacer"; height: number })[];
}

export function Loading({ heights }: LoadingProps) {
  return (
    <div className="space-y-0.5">
      {heights.map((height, index) => {
        if (typeof height === "number")
          return (
            <div key={index} style={{ height: `${height}rem` }} className="bg-gray-50 rounded-md animate-pulse"></div>
          );
        else {
          if (height.type === "spacer")
            return <div key={index} style={{ height: `${height.height}rem` }} aria-hidden></div>;
        }
      })}
    </div>
  );
}
