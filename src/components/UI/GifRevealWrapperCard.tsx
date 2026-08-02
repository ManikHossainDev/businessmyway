/* eslint-disable @typescript-eslint/no-explicit-any */
// components/GifRevealWrapperCard.tsx
"use client";

import { ReactNode, useState, cloneElement, isValidElement, Children } from "react";
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

  const child = Children.only(children);
  const forcedChild = isValidElement(child)
    ? cloneElement(child as React.ReactElement<any>, {
        style: {
          ...(child.props as any).style,
          width: "100%",
          height: "100%",
        },
      })
    : child;

  return (
    <div
      className={`group relative block w-full h-full overflow-hidden ${className}`}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
    >
      {/* Sizer - normal flow e original size dhore rakhe */}
      <div className="invisible w-full h-full" aria-hidden="true">
        {children}
      </div>

      {/* GIF layer */}
      <span
        className="absolute inset-0 bg-center object-cover rounded-sm"
        style={{ backgroundImage: `url(${gif})` }}
      />

      {/* Visible content */}
      <div
        className={`absolute inset-0 z-10 transition-all duration-300 ease-in-out
                    group-hover:inset-[var(--gap)] ${active ? "inset-[var(--gap)]" : ""}`}
        style={{ "--gap": `${borderSize}px` } as React.CSSProperties}
      >
        {forcedChild}
      </div>
    </div>
  );
};

export default GifRevealWrapperCard;