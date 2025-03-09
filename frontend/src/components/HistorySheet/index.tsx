import { FC, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { History, Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/queries";

const HistorySheet: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["list", "history-sheet"],
    queryFn: () => get("urls/history"),
    enabled: !!isOpen,
  });

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="absolute top-0 right-0 m-4">
        <History className="size-6" />
      </SheetTrigger>

      <SheetContent className=" bg-white text-white">
        <SheetHeader className="bg-slate-900 text-white">
          <SheetTitle>History sheet</SheetTitle>
          <SheetDescription>All your urls</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <Loader className="animate-spin size-6" />
        ) : isError ? (
          <p className="text-red-500">{error.message}</p>
        ) : !!data ? (
          <div className="flex flex-col gap-4 m-4 text-black">
            {data.map((date: any, idx: number) => (
              <div
                className="border-1 border-slate-700 hover:border-slate-900 p-4"
                key={idx}
              >
                <p>{date.date}</p>
                <div className="flex flex-col gap-2">
                  {date.urls.map((url: any) => (
                    <div key={url.id}>{url.longUrl}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default HistorySheet;
