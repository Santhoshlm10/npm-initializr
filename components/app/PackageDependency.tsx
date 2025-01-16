/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  CircleX,
  OctagonAlert,
  PlusIcon,
  Search,
  SearchX,
} from "lucide-react";
import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { getSuggesstions } from "@/apis/apis";
import { useDebouncedCallback } from "use-debounce";
import { PackageInfo } from "@/models/package";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const PackageDependency = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const searchInput = useRef<string | null>("");
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const {
    data,
    isFetching,
    isError,
    refetch: fetchSuggestedPackages,
  } = useQuery({
    queryFn: async () => await getSuggesstions(searchInput.current as string),
    queryKey: [""],
    enabled: false,
  });


  const ErrorView = () => {
    return (
      <div className="flex flex-col items-center gap-4 justify-center mt-24">
        <OctagonAlert />
        <p>There was an error while getting package</p>
      </div>
    );
  };

  const EmptyView = () => {
    return (
      <div className="flex flex-col items-center gap-4 justify-center mt-24">
        <SearchX />
        <Label>Search didnot return any result</Label>
      </div>
    );
  };

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

  const RenderPackage = (data: PackageInfo, index: number) => {
    return (
      <div key={index}>
        <Card className="w-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {data.package.name}
              </CardTitle>
              {selectedPackages.includes(data.package.name) ? (
                <Button
                  variant={"outline"}
                  onClick={() =>
                    setSelectedPackages((c) => [...c].filter((c) => c != data.package.name))
                  }
                >
                  <CircleX />
                  Remove
                </Button>
              ) : (
                <Button
                  variant={"outline"}
                  onClick={() =>
                    setSelectedPackages((c) => [...c].concat(data.package.name))
                  }
                >
                  <PlusIcon />
                  Add
                </Button>
              )}
            </div>
            <CardDescription>{data.package.description}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  };
  const debounced = useDebouncedCallback((value) => {
    searchInput.current = value;
    if (value) {
      fetchSuggestedPackages();
    }
  }, 1000);
  return (
    <>
      <div className="mt-2 w-12/12">
        <div className="flex gap-2 items-center justify-between">
          <Label className="text-base font-bold">Package Dependency</Label>
          <Button variant={"outline"} onClick={() => setIsOpen(true)}>
            Import Packages
          </Button>
        </div>
      </div>
      {isOpen && (
        <div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="min-w-[930]">
              <DialogHeader className="space-y-6">
                <DialogTitle>Import Packages</DialogTitle>
              </DialogHeader>
              <div>
                <div className="flex flex-row items-center gap-2 mt-4">
                  <div>
                    <ScrollArea className="h-96 w-96 rounded-md border">
                      <div className="p-4">
                        <Label className="text-sm font-medium leading-none">Package List</Label>
                        <Input
                          placeholder="Search for packages"
                          onChange={(e) => debounced(e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </ScrollArea>
                  </div>
                  <div className="w-24">
                    <div className="flex flex-col items-center justify-center gap-4">


                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <ChevronRight />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <Label>Include</Label>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                        <ChevronLeft />
                      </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <Label>Exclude</Label>
                        </TooltipContent>
                      </Tooltip>

  
                    </div>
                  </div>
                  <div>
                    <ScrollArea className="h-96 w-96 rounded-md border">
                      <div className="p-4">
                        <Label className="text-sm font-medium leading-none">Selected Packages</Label>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <Button variant={"outline"} onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsOpen(false)}>
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
