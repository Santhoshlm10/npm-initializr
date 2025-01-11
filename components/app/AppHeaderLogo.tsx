import Image from "next/image";
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import Link from "next/link";


export const AppHeaderLogo = () => {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <div className="flex gap-2 items-center">
                    <Image
                        className="dark:invert"
                        src="./app.svg"
                        alt="App logo"
                        width={55}
                        height={12}
                        priority
                    />
                    <div className="flex gap-2">
                        <Label className="text-3xl font-semibold">npm</Label>
                        <Label className="text-3xl font-semibold">Initializer</Label>
                    </div>
                </div>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

                </nav>
                <Link href={"https://github.com/Santhoshlm10/npm-initializr"} target="_blank">
                <Button>
                    <Github/>
                    Github
                </Button>
                </Link>
            </div>
        </header>
    )
}