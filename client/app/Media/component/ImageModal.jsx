import Image from "next/image";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from "react-icons/ai";

export default function ImageModal({ images, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative max-w-3xl w-full">
        {/* Close Icon */}
        <button
          className="absolute font-bold rounded-3xl bg-white px-3 py-2 -top-10 md:top-4 right-4 text-black text-2xl"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>

        {/* Image Slider */}
        <div className="flex items-center justify-center">
          <button
            className="absolute left-4 text-white text-2xl"
            onClick={handlePrev}
          >
            <AiOutlineLeft />
          </button>
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            width={350}
            height={600}
            className="max-h-[80vh] object-contain"
          />
          <button
            className="absolute right-4 text-white text-2xl"
            onClick={handleNext}
          >
            <AiOutlineRight />
          </button>
        </div>

        {/* Image Count */}
        <div className="text-center text-white mt-4">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
