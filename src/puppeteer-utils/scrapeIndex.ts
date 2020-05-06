import { Browser } from 'puppeteer'
import downloadFile from "../utils/downloadFile";
import makeFolder from '../utils/makeFolder'
import joinPaths from '../utils/joinPaths'
import getLinks from './getLinks'

interface scrapeOptions {
  url: string;
  dir: string;
  browser: Browser;
  isDir: boolean;
}

async function scrapeIndex(options: scrapeOptions) {
  const { url, isDir, dir, browser } = options;

  if (!isDir) {
    await downloadFile(url, dir);
    return;
  }

  makeFolder(dir);

  const page = await browser.newPage();
  await page.goto(url);

  const linksData = await getLinks(page);
  const scrapes = linksData.map(({ name, link, isDir }) => {
    return scrapeIndex({ 
      url: link, 
      isDir,
      dir: joinPaths(dir, name), 
      browser 
    });
  });

  await Promise.all(scrapes);
}

export default scrapeIndex