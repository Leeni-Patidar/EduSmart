import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({
  className,
  size = "md",
  ...props
}) {
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const iconSize = sizeMap[size] || size;

  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      size={iconSize}
      className={cn("animate-spin", className)}
      {...props} />
  );
}

export { Spinner }
