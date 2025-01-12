"use client";

import { ChangeEvent, FormEventHandler, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { MessageSquareText, Search, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { getPackageInfo, getSuggesstions } from "@/apis/apis";

const PackageDependency = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const searchInput = useRef<string | null>("");

    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await getSuggesstions("sqlink"),
        queryKey: ["movies"], //Array according to Documentation
      });
    
      if (isLoading) return <p>Loading...</p>
      if (isError) return <div>Sorry There was an Error</div>;
      
    

    return (
        <>
            <div className="mt-2 w-12/12">
                <div className="flex gap-2 items-center justify-between">
                    <Label className="text-base font-bold">Package Dependency</Label>
                    <Button variant={"outline"} onClick={() => setIsOpen(true)}>Add Dependency</Button>
                </div>
            </div>
            {
                isOpen && (
                    <>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogContent className="min-w-[900]">
                                <DialogHeader className="space-y-6">
                                    <DialogTitle>Add Packages</DialogTitle>
                                    <div className="relative h-10 w-full">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
                                        <Input
                                            type="text"
                                            placeholder="Search package name"
                                            className="pl-10 pr-3 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent" // Add additional styling as needed
                                            // value={searchInput.current as string}
                                            // onInput={(e:ChangeEvent<HTMLInputElement>) => {
                                            //     searchInput.current = e.target.value
                                            // }}
                                            // onChangeCapture={(e:FormEventHandler<HTMLInputElement>) => {
                                            //     searchInput.current = e.target.value
                                            // }}      
                                       />
                                    </div>
                                    <DialogDescription className="h-96">
                                        
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </>
                )
            }
        </>
    )
};
export default PackageDependency