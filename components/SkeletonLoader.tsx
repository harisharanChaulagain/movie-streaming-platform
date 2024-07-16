import React from "react";

export const HeroSkeleton = () => {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-200 animate-pulse">
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full px-4 md:px-10 lg:px-16 xl:px-28 mx-auto">
          <div className="flex flex-col h-screen mt-28 sm:mt-20">
            <div className="h-10 bg-gray-300 rounded w-2/3 mb-4 animate-pulse"></div>
            <div className="flex flex-col mb-4 gap-4">
              <div className="h-8 bg-gray-300 rounded-full w-40 mr-2 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded-full w-24 animate-pulse"></div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="h-8 w-10 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="h-8 w-10 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="h-16 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="absolute top-[55vh] left-0 right-0 p-4  ">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 ">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="w-full bg-gray-400 rounded-lg overflow-hidden shadow-lg animate-pulse"
              >
                <div className="w-full h-[40vh] bg-gray-400 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
