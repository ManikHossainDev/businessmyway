"use client";

import { ReactNode, useState } from "react";
import Rectangle from "@/assets/home/Rectangle.gif";

interface GifRevealWrapperProps {
  children: ReactNode;
  className?: string;
  gif?: string;
  borderSize?: number;
}

const GifRevealWrapper = ({
  children,
  className = "",
  gif = Rectangle.src,
  borderSize = 4,
}: GifRevealWrapperProps) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`group relative inline-block overflow-hidden ${className}`}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
    >
      <div className="invisible" aria-hidden="true">
        {children}
      </div>

      <span
        className="absolute inset-0 rounded-sm bg-center bg-cover"
        style={{ backgroundImage: `url(${gif})` }}
      />

      <div
        className={`absolute z-10 overflow-hidden transition-[top,right,bottom,left] duration-300 ease-in-out ${
          active
            ? "top-[var(--gap)] right-[var(--gap)] bottom-[var(--gap)] left-[var(--gap)]"
            : "top-0 right-0 bottom-0 left-0 group-hover:top-[var(--gap)] group-hover:right-[var(--gap)] group-hover:bottom-[var(--gap)] group-hover:left-[var(--gap)]"
        }`}
        style={{ "--gap": `${borderSize}px` } as React.CSSProperties}
      >
        <div className="h-full w-full [&>*]:!box-border [&>*]:!h-full [&>*]:!w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GifRevealWrapper;
