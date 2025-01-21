"use client";
import { AppHeaderLogo } from "@/components/app/AppHeaderLogo";
import DownloadButton from "@/components/app/DownloadButton";
import PackageDependency from "@/components/app/PackageDependency";
import PackageInfo from "@/components/app/PackageInfo";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";


export interface IPackageInfo {
  name: string;
  version: string;
  main: string;
  scripts: Record<string, string>;
  author: string;
  license: string;
  description: string;
  keywords?: string[];
}

export default function Home() {

  const [packageInfo, setPackageInfo] = useState<IPackageInfo>({
    name: '',
    version: '',
    main: 'index.js',
    scripts: {
      test: '',
    },
    author: '',
    license: 'ISC',
    description: '',
    keywords: []
  });

  const [dependencyList, setDependencyList] = useState<Record<string, { version: string[], selected: string }>>({});

  const handleDownloadClick = async () => {
    const zip = new JSZip();
    zip.file(packageInfo.main, `console.log('Hello World from npm initializr');`);
    const packageJson = {
      ...packageInfo,
      dependencies: Object.keys(dependencyList).reduce((acc: Record<string,string>, key) => {
        if (dependencyList[key].selected) {
          acc[key] = dependencyList[key].selected;
        }
        return acc;
      }, {})
    }
    zip.file("package.json", JSON.stringify(packageJson, null, 2));
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `${packageInfo.name}.zip`);
  }

  return (
    <TooltipProvider>

      <div className="m-2 p-2">
        <div>
          <AppHeaderLogo />
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
        <div className="gap-16 py-8 px-8 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-8 lg:px-6 ">
          <PackageInfo setPackageInfo={setPackageInfo} packageInfo={packageInfo} />
          <PackageDependency setDependencyList={setDependencyList} dependencyList={dependencyList} />
        </div>
        <div className="mb-6">
          <DownloadButton onClick={handleDownloadClick} />
        </div>
      </div>
    </TooltipProvider>
  );
}
