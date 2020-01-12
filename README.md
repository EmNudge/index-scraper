# index-scraper

This is a scraper for index sites. They are file systems and, as such, will force you to go in them one by one in order to download.

This is a script built with puppeteer and typescript that allows you to mass-download those files.

# Usage
1. download node if you haven't already
2. navigate to the directory
3. run `npm install`
4. create a `.env` file with the keys `URL` and `FOLDER`(optional) pointing to the correct url and folder to output to in the downloads folder
5. run `npm run start`
6. find files in downloads/`<folder_name>`
