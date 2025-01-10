import { DownloadIcon } from "lucide-react";
import { Button } from "../ui/button";

const DownloadButton = () => {
    return (
        <div>
            <Button className="text-xl w-120 h-12 fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white px-6 py-3 rounded shadow-lg" >
                <DownloadIcon className="text-2xl" />
                Download</Button>
        </div>
    )
};
export default DownloadButton;