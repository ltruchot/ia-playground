export const intToStrOfBits = (int, nb = 4) => {
  const binary = (int >>> 0).toString(2);
  return (
    Array(nb - binary.length)
      .fill("0")
      .join("") + binary
  );
};

export const strBitToBool = a => !!+a;
export const strToInt = a => +a;
