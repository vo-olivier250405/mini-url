import React, { FC } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TooltipProps } from "@radix-ui/react-tooltip";

interface FastTooltipProps extends React.HtmlHTMLAttributes<TooltipProps> {
  tooltipTrigger: React.ReactNode;
  tooltipContent: React.ReactNode;
  side?: "bottom" | "left" | "top" | "right";
}

const FastTooltip: FC<FastTooltipProps> = ({
  tooltipContent,
  tooltipTrigger,
  side = "bottom",
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>{tooltipTrigger}</TooltipTrigger>
      <TooltipContent side={side} className="bg-slate-900 text-white mx-4">
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
};

export default FastTooltip;
