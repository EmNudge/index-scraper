import { Page } from 'puppeteer'
import getLinkData from './getLinkData'

/**
 * retrieves all the links and returns the linksdata for files or directories
 */
async function getLinks(page: Page) {
  // removing the first element since it's a link to the parent directory
  const links = (await page.$$("td a")).slice(1);

  // get promises for each link tag to retrieve name and link url
  const linksData = links.map(linkTag => getLinkData(linkTag));

  return await Promise.all(linksData);
}

export default getLinks