import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      {" "}
      <svg
        className="animate-spin h-32 w-32"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="yellow"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="90, 150"
          strokeDashoffset="0"
          className="animate-spin"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="502"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="25"
          cy="25"
          r="15"
          fill="none"
          stroke="green"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="80, 150"
          strokeDashoffset="0"
          className="animate-spin"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="502"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

export default Spinner;

export const LoadingSkeleton = ({
  height = "20px",
  width = "100%",
  borderRadius = "4px",
}) => {
  return (
    <div
      className="animate-pulse bg-gray-200"
      style={{
        height,
        width,
        borderRadius,
      }}
    />
  );
};
