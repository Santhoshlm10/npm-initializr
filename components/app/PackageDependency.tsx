"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const PackageDependency = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
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