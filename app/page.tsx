import { AppHeaderLogo } from "@/components/app/AppHeaderLogo";
import DownloadButton from "@/components/app/DownloadButton";

export default function Home() {
  return (
    <div className="m-4 p-2">
      <div className="flex justify-center">
        <AppHeaderLogo />
      </div>

      <div>
        <DownloadButton />
      </div>
    </div>
  );
}
