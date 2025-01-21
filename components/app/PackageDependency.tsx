"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronRight,
  TrashIcon,
} from "lucide-react";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { getPackageInfo, getSuggesstions } from "@/apis/apis";
import { useDebouncedCallback } from "use-debounce";
import { PackageInfo } from "@/models/package";
import { ScrollArea } from "../ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LoadingSpinner from "../ui/LoadingSpinner";

const PackageDependency = ({ setDependencyList, dependencyList }: { setDependencyList: (data: Record<string, { version: string[], selected: string }>) => void; dependencyList: Record<string, { version: string[], selected: string }> }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const searchInput = useRef<string | null>("");

  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [importedPackages, setImportedPackages] = useState<string[]>([]);


  const {
    data,
    isLoading,
    refetch: fetchSuggestedPackages,
  } = useQuery({
    queryFn: async () => await getSuggesstions(searchInput.current as string),
    queryKey: ["suggestions"],
    enabled: false,
  });

  const { refetch: fetchPackageInfo, isLoading: isFetchPackageLoading } = useQuery({
    queryFn: async () => await getPackageInfo(importedPackages),
    queryKey: ["info"],
    enabled: false,
  })

  const Loader = () => {
    return (
      <div style={{ margin: "1px" }} className="w-full max-w-full p-0 bg-gray-200 rounded h-1 relative overflow-hidden">
        <div className="progress-bar absolute top-0 left-0 h-full bg-black">
        </div>
        <style jsx>{`
        @keyframes progress {
          0% {
            left: -50%;
          }
          50% {
            left: 25%;
            width: 50%;
          }
          100% {
            left: 100%;
            width: 0;
          }
        }

        .progress-bar {
          animation: progress 1.5s infinite;
        }
      `}</style>
      </div>
    )
  }

  const debounced = useDebouncedCallback((value) => {
    searchInput.current = value;
    if (value) {
      fetchSuggestedPackages();
    }
  }, 1000);

  const handleCheck = useCallback((checked: boolean, packageName: string) => {
    if (checked) {
      setSelectedPackages([...selectedPackages, packageName]);
    } else {
      setSelectedPackages(selectedPackages.filter(item => item !== packageName));
    }
  }, [selectedPackages]);

  const handleImportPackage = useCallback(async () => {
    setImportedPackages([...selectedPackages]);
  }, [selectedPackages]);

  const removePackage = useCallback((packageName: string) => {
    setImportedPackages(importedPackages.filter(item => item !== packageName));
    const temp = { ...dependencyList };
    delete temp[packageName];
    setDependencyList(temp);
  }, [importedPackages, dependencyList, setDependencyList]);


  const handleApplyChanges = useCallback(async () => {
    if (importedPackages.length > 0) {
      const res = await fetchPackageInfo();
      const data = res.data?.reduce((acc: Record<string, { version: string[], selected: string }>, itr) => {
        if (itr.status === "fulfilled") {
          const { name, versions } = itr.value;
          const versionList = Object.keys(versions).reverse()
          acc[name] = {
            version: versionList,
            selected: versionList[0]
          };
        }
        return acc;
      }, {});
      if (data) {
        setDependencyList(data);
      }
    }
    setIsOpen(false);
  }, [importedPackages, fetchPackageInfo, setDependencyList]);


  const handleVersionChange = useCallback((keyName:string,newValue:string) => {
    setDependencyList({
      ...dependencyList,
      [keyName]: {
        ...dependencyList[keyName],
        selected: newValue
      }
    })
  }, [dependencyList, setDependencyList]);

  const renderPackageList = useMemo(() => {
    return (
      <div className="space-y-4 mt-8">
        {
          Object.keys(dependencyList).map((key: string, index: number) => {
            return (
              <div key={index} className="flex items-center gap-2 m-2 justify-between">
                <div>
                  <Label>{key}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={dependencyList[key].selected}
                    onValueChange={(e:string) => handleVersionChange(key,e)}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        dependencyList[key].version.reverse().map((item: string, index: number) => {
                          return (
                            <SelectItem key={index} value={item}>{item}</SelectItem>
                          )
                        })
                      }
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={() => removePackage(key)}>
                    <TrashIcon size={14} className="text-red-500"/>
                  </Button>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }, [dependencyList, handleVersionChange]);

  return (
    <>
      <div className="mt-2 w-12/12">
        <div className="flex gap-2 items-center justify-between">
          <Label className="text-base font-bold">Package Dependency</Label>
          <Button variant={"outline"} onClick={() => setIsOpen(true)}>
            Import Packages
          </Button>
        </div>
        {renderPackageList}
      </div>
      {isOpen && (
        <div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="min-w-[930px] max-w-[50vw]">
              <DialogHeader className="space-y-6">
                <DialogTitle>Import Packages</DialogTitle>
              </DialogHeader>
              <div>
                <div className="flex flex-row items-center gap-2 mt-4">
                  <div className="space-y-2">

                    <Label className="text-sm font-medium leading-none">Package List</Label>
                    <Input
                      placeholder="Search for packages"
                      onChange={(e) => debounced(e.target.value)}
                      className="mt-2"
                    />
                    {isLoading && <Loader />}

                    <ScrollArea className="h-96 w-96 md:w-72 lg:w-96 rounded-md border">
                      <div className="p-4">
                        {
                          data && data?.objects && data?.objects.map((item: PackageInfo, index: number) => {
                            return (
                              <div key={index}>
                                <div className="text-sm flex items-center gap-2">
                                  <Checkbox checked={selectedPackages.includes(item.package.name)} onCheckedChange={(checked: boolean) => handleCheck(checked, item.package.name)} />
                                  {item.package.name}
                                </div>
                                <Separator className="my-2" />
                              </div>
                            )
                          })
                        }
                      </div>
                    </ScrollArea>
                  </div>
                  <div className="w-24">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" onClick={handleImportPackage}>
                            <ChevronRight />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <Label>Import</Label>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium leading-none">Selected Packages</Label>
                    <ScrollArea className="h-96 w-96 md:w-72 lg:w-96 rounded-md border">
                      <div className="p-4">
                        {
                          importedPackages.map((item: string, index: number) => {
                            return (
                              <div key={index}>
                                <div className="text-sm">
                                  {item}
                                </div>
                                <Separator className="my-2" />
                              </div>
                            )
                          })
                        }
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <Button variant={"outline"} onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button disabled={isFetchPackageLoading} onClick={handleApplyChanges}>
                    {
                      isFetchPackageLoading && <LoadingSpinner className="" />
                    }
                    Apply Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};
export default PackageDependency;
