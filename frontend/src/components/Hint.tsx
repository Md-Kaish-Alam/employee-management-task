import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface HintProps {
  label: string;
  children: React.ReactNode;
  asChild?: boolean;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  isDelete?: boolean;
}

export const Hint = ({ label, children, asChild, side, align,isDelete }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className={cn(
            isDelete
              ? "text-white bg-red-600 dark:bg-red-800"
              : "text-black bg-white dark:bg-gray-800 dark:text-white"
          )}
          side={side}
          align={align}
        >
          <p className="font-semibold text-sm">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
