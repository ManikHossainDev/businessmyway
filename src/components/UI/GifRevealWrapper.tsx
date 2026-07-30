// components/GifRevealWrapper.tsx
"use client";

import { ReactNode, useState, cloneElement, isValidElement, Children } from "react";
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

  // Child (button) er original width/height class thakleo,
  // inline style diye jorpurbok w-full h-full kore dicchi
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
      className={`group relative inline-block overflow-hidden ${className}`}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
    >
      {/* Sizer - normal flow e original size dhore rakhe, kokhono change hoy na */}
      <div className="invisible " aria-hidden="true">
        {children}
      </div>

      {/* GIF layer */}
      <span
        className="absolute inset-0 bg-center object-cover rounded-sm"
        style={{ backgroundImage: `url(${gif})` }}
      />

      {/* Visible content - hover e inset shrink hoy, child forcefully w-full h-full follow kore */}
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

export default GifRevealWrapper;