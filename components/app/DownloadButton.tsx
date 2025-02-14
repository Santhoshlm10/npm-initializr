import { DownloadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { MouseEventHandler } from "react";

const DownloadButton = ({onClick}:{onClick:MouseEventHandler<HTMLButtonElement>}) => {

    return (
        <div>
            <Button onClick={onClick} className="text-xl w-120 h-10 fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white px-6 py-3 rounded shadow-lg" >
                <DownloadIcon />
                Download</Button>
        </div>
    )
};
export default DownloadButton;