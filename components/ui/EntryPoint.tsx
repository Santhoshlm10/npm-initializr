import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChangeEvent, useEffect, useState } from "react";

 interface IEntryPoint {
  main: string;
  mainExtension: string;
}

interface IEntryProps {
    returnValue: (data: string) => void;
}

export default function EntryPoint(props:IEntryProps) {
  const [packageInfo, setPackageInfo] = useState<IEntryPoint>({
    main: "index", // Default entry point
    mainExtension: ".js", // Default extension
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackageInfo({ ...packageInfo, main: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setPackageInfo({ ...packageInfo, mainExtension: value });
  };

  useEffect(() => {
    props.returnValue(packageInfo.main + packageInfo.mainExtension);
  },[packageInfo])

  return (
    <div className="flex items-center gap-2">
      <Input
        onChange={handleInputChange}
        value={packageInfo.main}
        placeholder="Enter entry point"
      />
      <Select value={packageInfo.mainExtension} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Select extension" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=".js">.js</SelectItem>
          <SelectItem value=".ts">.ts</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 