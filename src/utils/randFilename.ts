import getRandStr from "./randStr";

function getRandFilename(ext?: string): string {
  const date = new Date()
    .toLocaleDateString("en-US")
    .split("/")
    .join("-");

  const extension = ext ? `.${ext}` : "";

  return `${date} ${getRandStr(8)}${extension}`;
}

export default getRandFilename;
