/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {  useRef, useState } from "react";
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

  console.log("LoadingData", data);

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
      <div style={{margin:"1px"}} className="w-full max-w-full p-0 bg-gray-200 rounded h-1 relative overflow-hidden">
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
                  <CircleX/>
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
            Add Dependency
          </Button>
        </div>
      </div>
      {isOpen && (
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
                    onChange={(e: any) => debounced(e.target.value)}
                  />
                </div>
                {
                  isFetching && <Loader/>
                }
                <DialogDescription className="h-96 overflow-y-scroll">
                  {isError && <ErrorView />}
                  <div className="space-y-2">
                    {data &&
                      data?.objects &&
                      data?.objects.map((item: PackageInfo, index: number) => {
                        return RenderPackage(item, index);
                      })}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};
export default PackageDependency;
