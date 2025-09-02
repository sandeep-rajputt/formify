"use client";
function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-7xl px-5 mx-auto ${className}`}>{children}</div>
  );
}

export default Container;
