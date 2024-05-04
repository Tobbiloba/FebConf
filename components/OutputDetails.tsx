import React from "react";

const OutputDetails = ({ outputDetails }: {outputDetails: any}) => {
  return (
    <div className="metrics-container mt-4 flex lato flex-row gap-4 ">
      <p className="text-sm">
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-blue-1">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-sm">
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-blue-1">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-blue-1">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
