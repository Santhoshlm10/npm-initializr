import { PackageResponse } from "@/models/package";

const SEARCH_URL = "https://registry.npmjs.com/-/v1/search?text="
const PACKAGE_INFO = "https://registry.npmjs.com/"


async function getData(url:string) {
    const response = await fetch(url)
    return await response.json();
}
export async function getSuggesstions(keyword: string) {
    return await getData(SEARCH_URL + keyword) as PackageResponse
}
export async function getPackageInfo(packageName:string){
    return await getData(PACKAGE_INFO + packageName)
}