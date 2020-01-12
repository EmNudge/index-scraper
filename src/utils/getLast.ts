/**
 *  Gets the last string after splitting up using separator that isn't empty
 *  If the last string is empty, it will keep going backwards until it can't
 * */ 
function getLast(text: string, separator: RegExp | string): string {
  const arr = text.split(separator)

  let last = arr[arr.length - 1];
  while (!last && arr.length) {
    arr.length--;
    last = arr[arr.length - 1];
  }

  return last
}

export default getLast