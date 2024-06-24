import React, { useMemo } from "react";

const Skeleton = (count = 5) => {
  const skeletonItems = useMemo(() => {
    const items = [];
    for (let index = 0; index < 10; index++) {
      items.push(
        <div
          className="flex flex-col w-[200px] h-[200px] gap-4 border p-2 justify-center items-center animate-pulse"
          key={index}
        >
          <div className="w-full h-[100px] bg-bglightgrey"></div>
          <div className="w-full h-2 bg-bglightgrey"></div>
          <div className="w-full h-2 bg-bglightgrey"></div>
          <div className="w-full h-2 bg-bglightgrey"></div>
        </div>
      );
    }
    return items;
  }, [count]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 pt-5 justify-center items-center">
      {skeletonItems}
    </div>
  );
};

export default Skeleton;
