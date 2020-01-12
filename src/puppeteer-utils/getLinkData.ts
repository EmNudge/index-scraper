import { ElementHandle } from "puppeteer";
import getLast from '../utils/getLast'

interface linkData {
  name: string,
  link: string,
}

async function getLinkData(linkTag: ElementHandle): Promise<linkData> {
  let name: string, link: string;
  
  try {
    const linkJsHandle = await linkTag.getProperty("href");
    link = await linkJsHandle.jsonValue() as string;
    name = getLast(link, '/')
  } catch(e) {
    console.log('unable to extract href from <a> tag ', e)
  }

  return { name, link }
}

export default getLinkData