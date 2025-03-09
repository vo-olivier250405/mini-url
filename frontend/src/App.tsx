import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import FastTooltip from "./components/FastTooltip";
import { Minimize } from "lucide-react";

function App() {
  const [url, setUrl] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <form action="">
        <Input
          type="text"
          placeholder="Copy url here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <FastTooltip
          tooltipTrigger={
            <Button type="submit">
              <Minimize />
            </Button>
          }
          tooltipContent={<p>Minimize url</p>}
        />
      </form>
    </>
  );
}

export default App;
