import { Browser } from 'puppeteer'
import downloadFile from "../utils/downloadFile";
import makeFolder from '../utils/makeFolder'
import joinPaths from '../utils/joinPaths'
import getLinks from './getLinks'

interface scrapeOptions {
  name?: string;
  url: string;
  dir: string;
  browser: Browser;
}

async function scrapeIndex(options: scrapeOptions) {
  const { name = '', url, dir, browser } = options;

  if (name.includes(".")) {
    await downloadFile(url, dir);
    return;
  }

  makeFolder(dir);

  const page = await browser.newPage();
  await page.goto(url);

  const linksData = await getLinks(page);
  const scrapes = linksData.map(({ name, link }) => {
    return scrapeIndex({ name, url: link, dir: joinPaths(dir, name), browser });
  });

  await Promise.all(scrapes);
}

export default scrapeIndex