"use client";
import { AppHeaderLogo } from "@/components/app/AppHeaderLogo";
import DownloadButton from "@/components/app/DownloadButton";
import PackageDependency from "@/components/app/PackageDependency";
import PackageInfo from "@/components/app/PackageInfo";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useState } from "react";


export interface IPackageInfo  {
  name:string;
  version:string;
  main:string;
  scripts: {
    test: string;
  };
  author:string;
  license:string;
  description:string;
  keywords?: string[];
}

export default function Home() {

  const [packageInfo,setPackageInfo] = useState<IPackageInfo>({
    name:'',
    version:'',
    main:'',
    scripts: {
      test: '',
    },
    author:'',
    license:'',
    description:'',
    keywords:[]
  });
  // const [dependencyList,setDependencyList] = useState<ObjectTemplate>({});

  const handleDownloadClick = async () => {
    const zip = new JSZip();
    zip.file("file1.txt", "This is the content of file 1.");
    zip.file("file2.txt", "This is the content of file 2.");
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "example.zip");
  }

  return (
    <div className="m-2 p-2">
      <div>
        <AppHeaderLogo />
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"/>
      </div>
      <div className="gap-16 py-8 px-8 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-8 lg:px-6 ">
        <PackageInfo setPackageInfo={setPackageInfo} packageInfo={packageInfo}/>
        <PackageDependency />
      </div>
      <div>
        <DownloadButton onClick={handleDownloadClick}/>
      </div>
    </div>
  );
}
