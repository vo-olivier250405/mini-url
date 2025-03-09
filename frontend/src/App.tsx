import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import FastTooltip from "./components/FastTooltip";
import { Minimize2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { post } from "./lib/queries";
import { toast } from "sonner";
import CoptyTextButton from "./components/CopyTextButton";

function App() {
  const [url, setUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");

  const mutation = useMutation({
    mutationKey: ["mini-url", url],
    mutationFn: () => post("urls", { longUrl: url }),
    onSuccess: (data) => {
      setUrl("");
      toast.success("Your url is available");
      setGeneratedUrl(data.shortUrl);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    if (!url) return;
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <main className="w-full h-screen flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1 items-center justify-center">
        <h1 className="font-bold text-7xl text-center m-4">MINI-URL</h1>
        <i className="text-2xl">Shrink your url</i>
      </div>
      <form
        className="flex flex-row gap-3 justify-center items-center m-4"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder="Paste url here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <FastTooltip
          tooltipTrigger={
            <Button
              type="submit"
              variant="outline"
              disabled={!url}
              className="hover:bg-slate-900 hover:text-white hover:border-slate-900"
            >
              <Minimize2 />
            </Button>
          }
          tooltipContent={
            <p>{!!url ? "Minimize url" : "You need to specify an url."} </p>
          }
        />
      </form>
      {generatedUrl && (
        <CoptyTextButton
          className="items-center justify-center"
          text={generatedUrl}
        />
      )}
    </main>
  );
}

export default App;
