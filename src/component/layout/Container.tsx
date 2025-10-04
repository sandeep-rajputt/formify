import type { ClassNameAndChildrenProps } from "@/types";

function Container({ children, className = "" }: ClassNameAndChildrenProps) {
  return (
    <div className={`max-w-7xl h-full px-5 mx-auto ${className}`}>
      {children}
    </div>
  );
}

export default Container;
