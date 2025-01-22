import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export const AppHeaderLogo = () => {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                {/* Logo and App Name */}
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
                        <Label className="text-xl sm:text-2xl md:text-3xl font-semibold">npm</Label>
                        <Label className="text-xl sm:text-2xl md:text-3xl font-semibold">Initializer</Label>
                    </div>
                </div>

                {/* GitHub Button */}
                <Link href="https://github.com/Santhoshlm10/npm-initializr" target="_blank" className="mt-4 md:mt-0">
                    <Button className="flex items-center gap-2">
                        <Github className="w-5 h-5" />
                        <span className="text-sm sm:text-base">Github</span>
                    </Button>
                </Link>
            </div>
        </header>
    );
};