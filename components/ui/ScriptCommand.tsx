import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { PlusIcon, TrashIcon } from "lucide-react";

interface ScriptObject {
  name: string;
  command: string;
}

interface ScriptProps {
    returnScript: (data: Record<string,string>) => void;
}

export default function ScriptCommand(props: ScriptProps) {
  const [scripts, setScripts] = useState<ScriptObject[]>([
    {
      name: "test",
      command: "npm test",
    },
  ]);

  const addScript = () => {
    setScripts([...scripts, { name: "", command: "" }]);
  };

  const updateScript = (index: number, field: keyof ScriptObject, value: string) => {
    const updatedScripts = scripts.map((script, i) =>
      i === index ? { ...script, [field]: value } : script
    );
    setScripts(updatedScripts);
  };

  const removeScript = (index: number) => {
    if(index == 0) return;
    const updatedScripts = scripts.filter((_, i) => i !== index);
    setScripts(updatedScripts);
  };

  useEffect(() => {
    const commands = scripts.reduce((acc:Record<string,string>, script) => {
        if(script.name && script.command) {
            acc[script.name] = script.command;
        }
        return acc;
    }, {});
    props.returnScript(commands);
  },[scripts])

  return (
    <div>
    <div className="flex items-center justify-between pb-1">
      <div>
        <Label>Entry Script Command</Label>
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-80"
        onClick={addScript}
      >
        <PlusIcon size={14} />
        <Label>Add</Label>
      </div>
    </div>
    <div className="space-y-4">
      {scripts.map((script, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-2 items-center">
          <Input
            placeholder="Command name"
            className="w-full sm:w-[200px]"
            value={script.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateScript(index, "name", e.target.value)
            }
          />
          <Input
            placeholder="Enter script command"
            className="w-full"
            value={script.command}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateScript(index, "command", e.target.value)
            }
          />
          <div
            className="cursor-pointer hover:opacity-80"
            onClick={() => removeScript(index)}
          >
            <TrashIcon size={14} className="text-red-500" />
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}