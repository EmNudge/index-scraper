import { ElementHandle } from "puppeteer";
import getLast from '../utils/getLast'

interface linkData {
  name: string;
  link: string;
  isDir: boolean;
}

async function getLinkData(linkTag: ElementHandle): Promise<linkData> {
  let name: string;
  let link: string;
  let isDir: boolean;
  
  try {
    const linkJsHandle = await linkTag.getProperty("href");
    link = await linkJsHandle.jsonValue() as string;
    name = getLast(link, '/');
    isDir = link.endsWith('/');
  } catch(e) {
    console.log('unable to extract href from <a> tag ', e);
  }

  return { name, link, isDir }
}

export default getLinkData