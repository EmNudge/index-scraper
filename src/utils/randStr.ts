// a genarator would also have worked here, but I couldn't think of when a user might want to
// iterate over random chars
function getRandStr(length: number): string {
  const chars = [];

  for (let i = 0; i < length; i++) {
    // capital letters + lowercase letters + underscore = 26 + 26 + 1 = 53
    const randNum = ~~(Math.random() * 51.99);

    if (randNum === 51) {
      chars.push("_");
      continue;
    }

    const isLowercase = randNum >= 25;

    // 65 = 'A', 97 = 'a'
    const charCode = isLowercase ? 97 + (randNum - 25) : 65 + randNum;
    const char = String.fromCharCode(charCode);

    chars.push(char);
  }

  return chars.join("");
}

export default getRandStr;