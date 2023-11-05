import hash from "../../../lib/hash";

export function getNextLetter(previous) {
  if (!previous) return "A";
  let tail = "";
  let i = previous.length - 1;
  let char = previous[i];
  // find the index of the first character from the right that is not a 'Z'
  while (char === "Z" && i > 0) {
    i--;
    char = previous[i];
    tail = "A" + tail; // tail contains a string of 'A'
  }
  if (char === "Z")
    // the string was made only of 'Z'
    return "AA" + tail;
  // increment the character that was not a 'Z'
  return (
    previous.slice(0, i) + String.fromCharCode(char.charCodeAt(0) + 1) + tail
  );
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
}

export function getColorFromLetter(letter) {
  return intToRGB(hash(letter));
}

export default { getNextLetter, getColorFromLetter };
