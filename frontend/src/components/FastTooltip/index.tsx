import React, { FC } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TooltipProps } from "@radix-ui/react-tooltip";

interface FastTooltipProps extends React.HtmlHTMLAttributes<TooltipProps> {
  tooltipTrigger: React.ReactNode;
  tooltipContent: React.ReactNode;
}

const FastTooltip: FC<FastTooltipProps> = ({
  tooltipContent,
  tooltipTrigger,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>{tooltipTrigger}</TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
};

export default FastTooltip;
