import { cn } from "@/lib/utils";
import React, { FC } from "react";
import FastTooltip from "../FastTooltip";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Clipboard } from "lucide-react";

interface CopyTextButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

const CoptyTextButton: FC<CopyTextButtonProps> = (
  { text, className },
  ...props
) => {
  const handleOnCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Url copied.");
  };

  return (
    <div
      {...props}
      className={cn("flex flex-row items-center gap-3", className)}
    >
      <span className="border-1 border-slate-900 rounded-md p-2 text-sm px-4">
        <a href={text} target="_blank" className="text-blue-800">
          {text}
        </a>
      </span>
      <FastTooltip
        tooltipContent={<p>Copy to clipboard</p>}
        tooltipTrigger={
          <Button
            onClick={handleOnCopy}
            variant="outline"
            className="hover:bg-green-200 hover:text-green-900 hover:border-green-900 h-10"
          >
            <Clipboard className="size-6" />
          </Button>
        }
      />
    </div>
  );
};

export default CoptyTextButton;
