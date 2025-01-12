import axios from "axios";


const SEARCH_URL = "https://www.npmjs.com/search/suggestions";
const PACKAGE_INFO = "https://www.npmjs.com/package/"

let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)" 
   }
   

async function getData(data: Record<string,string>) {
    let response = await axios.request(data);
    return response.data;
}


export async function getSuggesstions(keyword: string) {
    const response = await axios.get(`/api/suggestions?q=${keyword}`);
    return response.data;
  }