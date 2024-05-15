import React from "react";

const OutputDetails = ({ outputDetails }: {outputDetails: any}) => {
  return (
    <div className="metrics-container px-4 mt-4 flex space text-white lato flex-row gap-4 justify-end">
      <p className="text-sm">
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-blue-1">
          {outputDetails?.status?.description || 0}
        </span>
      </p>
      <p className="text-sm">
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-blue-1">
          {outputDetails?.memory || 0}
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-blue-1">
          {outputDetails?.time || 0}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
