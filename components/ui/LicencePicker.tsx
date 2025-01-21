import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

const licenses = {
  "Popular": ["MIT", "Apache-2.0", "GPL-3.0", "ISC", "BSD-3-Clause"],
  "Permissive": ["Unlicense", "CC0-1.0", "Artistic-2.0"],
  "Copyleft": ["AGPL-3.0", "LGPL-3.0", "MPL-2.0"],
  "Other": ["EPL-2.0", "WTFPL", "Zlib"],
};

interface ILicenceState {
    setLicence: (data: string) => void;
}

export default function LicencePicker({setLicence}:ILicenceState) {
  const [selectedLicense, setSelectedLicense] = useState("ISC"); 

  useEffect(() => {
    setLicence(selectedLicense);
  },[selectedLicense])

  return (
    <Select value={selectedLicense} onValueChange={setSelectedLicense}>
      <SelectTrigger>
        <SelectValue placeholder="Select a license" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(licenses).map(([category, licenses]) => (
          <SelectGroup key={category}>
            <SelectLabel>{category}</SelectLabel>
            {licenses.map((license) => (
              <SelectItem key={license} value={license}>
                {license}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}