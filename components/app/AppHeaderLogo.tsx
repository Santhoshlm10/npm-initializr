import Image from "next/image";
import { Label } from "@/components/ui/label"


export const AppHeaderLogo = () => {
    return (
        <div className="flex gap-2">
            <Image
                className="dark:invert"
                src="./app.svg"
                alt="App logo"
                width={55}
                height={12}
                priority
            />
            <div className="flex flex-col">
                <Label className="text-lg font-semibold">npm</Label>
                <Label className="text-lg font-semibold">Initializer</Label>
            </div>
        </div>
    )
}