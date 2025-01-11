import { AppHeaderLogo } from "@/components/app/AppHeaderLogo";
import DownloadButton from "@/components/app/DownloadButton";
import PackageDependency from "@/components/app/PackageDependency";
import PackageInfo from "@/components/app/PackageInfo";

export default function Home() {
  return (
    <div className="m-2 p-2">
      <div>
        <AppHeaderLogo />
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"/>
      </div>
      <div className="gap-16 py-8 px-4 mx-auto max-w-screen-2xl lg:grid lg:grid-cols-2 lg:py-8 lg:px-6 ">
        <PackageInfo />
        <PackageDependency />
      </div>
      <div>
        <DownloadButton />
      </div>
    </div>
  );
}
