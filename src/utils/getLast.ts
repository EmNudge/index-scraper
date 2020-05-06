/**
 *  Gets the last string after splitting up using separator that isn't empty
 *  If the last string is empty, it will keep going backwards until it can't
 * */ 
function getLast(text: string, separator: RegExp | string): string {
  const arr = text.split(separator)

  let last: undefined | string;
  do {
    last = arr[arr.length - 1];
    if (arr.length) arr.length--;
  } while (!last && arr.length);

  return last
}

export default getLast