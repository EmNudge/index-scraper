import { launch } from "puppeteer";
import getRandFilename from "./utils/randFilename";
import makeFolder from './utils/makeFolder'
import getLast from './utils/getLast'
import scrapeIndex from './puppeteer-utils/scrapeIndex'
// import config from '../scrapeconfig.json'

// to allow .env file to be used
import { resolve } from "path"
import { config } from "dotenv"
config({ 
  path: resolve(__dirname, "../.env") 
});

(async () => {
  // prepping folders for later use
  makeFolder('screenshots');
  makeFolder('downloads');
  const { URL, FOLDER } = process.env

  console.log("opening puppeteer...");
  const browser = await launch();
  const page = await browser.newPage();
  
  console.log("opening site...");
  await page.goto(URL);

  const path = `screenshots/${getRandFilename("png")}`;

  await page.screenshot({ path });
  console.log(`screenshot at ${path}`);

  let folderName = FOLDER || getLast(URL, '/');
  if (folderName.includes('.')) folderName = getRandFilename()

  await scrapeIndex({
    dir: `downloads/${folderName}`,
    url: URL,
    isDir: true,
    browser
  });

  console.log("all pages scraped!");

  await browser.close();
})();

