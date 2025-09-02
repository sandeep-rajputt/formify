const SVGComponent = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x={6} y={6} width={36} height={36} rx={12} fill="#3b82f6" />
    <rect x={14} y={18} width={20} height={4} rx={2} fill="#ffffff" />
    <rect x={14} y={26} width={12} height={4} rx={2} fill="#ffffff" />
  </svg>
);
export default SVGComponent;
