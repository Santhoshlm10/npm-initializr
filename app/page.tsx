import { AppHeaderLogo } from "@/components/app/AppHeaderLogo";
import DownloadButton from "@/components/app/DownloadButton";
import PackageDependency from "@/components/app/PackageDependency";
import PackageInfo from "@/components/app/PackageInfo";

export default function Home() {
  return (
    <div className="m-4 p-2">
      <div className="flex justify-center">
        <AppHeaderLogo />
      </div>
      <div className="gap-16 items-center  py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 ">
        <PackageInfo />
      
        <PackageDependency />
      </div>
      <div>
        <DownloadButton />
      </div>
    </div>
  );
}
