/*
 * convert an int in a correponding string of bits with chosen lenght
 * ex: 2 -> 4 -> "11"
 * ex: 4 -> 7 -> "0111"
 */
// int -> int -> string
export const intToStrOfXBits = mulOf2 => int => {
  const binary = (int >>> 0).toString(2);
  return (
    Array(mulOf2 - binary.length)
      .fill("0")
      .join("") + binary
  );
};

export const intToStrOf2Bits = intToStrOfXBits(2);
export const intToStrOf4Bits = intToStrOfXBits(4);
export const intToStrOf8Bits = intToStrOfXBits(8);
export const intToStrOf16Bits = intToStrOfXBits(16);

export const strBitToBool = a => !!+a;
export const strToInt = a => +a;
