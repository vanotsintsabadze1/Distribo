import { ring } from "ldrs";

ring.register();

interface SpinnerProps {
  color: string;
  size: number;
}

export default function Spinner({ color, size }: SpinnerProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <l-ring size={size} stroke="2" bg-opacity="0%" speed="2" color={color}></l-ring>
    </div>
  );
}
