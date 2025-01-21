"use client"
import { IPackageInfo } from "@/app/page";
import { Label } from "../ui/label";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent } from "react";
import EntryPoint from "../ui/EntryPoint";
import LicencePicker from "../ui/LicencePicker";
import ScriptCommand from "../ui/ScriptCommand";

interface PackageInfoProps {
    setPackageInfo: (data: IPackageInfo) => void;
    packageInfo: IPackageInfo;
}


const PackageInfo = ({ setPackageInfo, packageInfo }: PackageInfoProps) => {

    return (
        <div>
            <Label className="text-base font-bold">Package Details</Label>
            <div className="mt-2 w-12/12">

                <div className="space-y-4">
                    <div>
                        <Label>Package Name</Label>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPackageInfo({ ...packageInfo, name: e.target.value })
                            }}
                            value={packageInfo.name}
                            placeholder="Enter package name" />
                    </div>


                    <div>
                        <Label>Package Version</Label>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPackageInfo({ ...packageInfo, version: e.target.value })
                            }}
                            value={packageInfo.version}
                            placeholder="Enter version" />
                    </div>


                    <div>
                        <Label>Package Description</Label>
                        <Textarea
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                setPackageInfo({ ...packageInfo, description: e.target.value })
                            }}
                            value={packageInfo.description}
                            placeholder="Enter package description" />
                    </div>


                    <div>
                        <Label>Entry Point</Label>
                        <EntryPoint returnValue={(value: string) => {
                            setPackageInfo({ ...packageInfo, main: value })
                        }} />
                    </div>


                    <div>
                        <ScriptCommand returnScript={(result) => {
                            setPackageInfo({ ...packageInfo, scripts: result })

                        }} />
                    </div>


                    <div>
                        <Label>Entry Keywords (comma seperated)</Label>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPackageInfo({ ...packageInfo, keywords: e.target.value.split(",") })
                            }}
                            value={packageInfo.keywords?.join(",")}
                            placeholder="Enter keywords" />
                    </div>

                    <div>
                        <Label>Entry Authour</Label>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPackageInfo({ ...packageInfo, author: e.target.value })
                            }}
                            value={packageInfo.author}
                            placeholder="Enter author name" />
                    </div>


                    <div>
                        <Label>Licence</Label>
                        <LicencePicker setLicence={(value: string) => {
                            setPackageInfo({ ...packageInfo, license: value })
                        }} />
                    </div>

                </div>
            </div>
        </div>
    )
};

export default PackageInfo;