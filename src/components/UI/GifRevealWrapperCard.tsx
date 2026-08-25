"use client";

import { ReactNode, useState } from "react";
import Rectangle from "@/assets/home/Rectangle.gif";

interface GifRevealWrapperCardProps {
  children: ReactNode;
  className?: string;
  gif?: string;
  borderSize?: number;
}

const GifRevealWrapperCard = ({
  children,
  className = "",
  gif = Rectangle.src,
  borderSize = 4,
}: GifRevealWrapperCardProps) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`group relative block h-full w-full overflow-hidden ${className}`}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
    >
      <div className="invisible h-full w-full" aria-hidden="true">
        {children}
      </div>

      <span
        className="absolute inset-0 rounded-sm bg-center object-cover"
        style={{ backgroundImage: `url(${gif})` }}
      />

      <div
        className={`absolute inset-0 z-10 transition-all duration-300 ease-in-out
                    group-hover:inset-[var(--gap)] ${active ? "inset-[var(--gap)]" : ""}`}
        style={{ "--gap": `${borderSize}px` } as React.CSSProperties}
      >
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default GifRevealWrapperCard;
