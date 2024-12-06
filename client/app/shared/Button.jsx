import React from "react";

export const FlipButton = ({ frontText = "Front", backText = "Back" }) => {
  return (
    <div
      className="relative w-32 h-12 cursor-pointer group"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front side of the button */}
        <div
          className="absolute w-full h-full bg-red-700 text-white rounded-lg flex items-center justify-center backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {frontText}
        </div>

        {/* Back side of the button */}
        <div
          className="absolute w-full h-full bg-blue-800 text-white rounded-lg flex items-center justify-center rotate-y-180 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {backText}
        </div>
      </div>
    </div>
  );
};
