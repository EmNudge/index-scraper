import { get, IncomingMessage } from "http";
import { createWriteStream, WriteStream, unlink } from "fs";
import { promisify } from "util";

// promisified http.get (for my use case)
function request(url: string): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const request = get(url, res => {
      resolve(res);
    });
    request.on("error", e => {
      reject(e);
    });
  });
}

function finishPromise(file: WriteStream): Promise<void> {
  return new Promise(resolve => {
    file.on("finish", () => resolve());
  });
}

function endPromise(file: WriteStream): Promise<void> {
  return new Promise(resolve => {
    file.end(() => resolve())
  })
}

async function downloadFile(url: string, dest: string) {
  const name = dest.split("/").slice(-1)[0];
  console.log(`downloading file ${name} into ${dest}...`);

  const file = createWriteStream(dest);

  let response: IncomingMessage;

  try {
    response = await request(url);
  } catch (e) {
    console.log("could not get the url via http: ", e);

    try {
      await promisify(unlink)(dest);
    } catch (e) {
      console.log("could not delete the file: ", e);
    }
  }

  response.pipe(file);

  // neither of these throw an error, so we don't need a try/catch block
  await finishPromise(file);
  await endPromise(file)
}

export default downloadFile;
