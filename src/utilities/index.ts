import crypto from "crypto";

export const operatorsData = [
  {
    label: "Mobicom",
    value: "MOBICOM",
  },
  {
    label: "Unitel",
    value: "UNITEL",
  },
  {
    label: "Gmobile",
    value: "GMOBILE",
  },
  {
    label: "Skytel",
    value: "SKYTEL",
  },
];
export const encryptData = (plaintext: string, isClient: boolean = false) => {
  const secretKey =
    (isClient ? process.env.DATA_SECRET : global.process.env.DATA_SECRET) || "";
  const cipher = crypto.createCipher("aes-256-ctr", secretKey);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf-8"),
    cipher.final(),
  ]);
  return encrypted.toString("hex");
};

export const dataDecrypt = (
  encryptedData: string,
  isClient: boolean = false
) => {
  const secretKey =
    (isClient ? process.env.DATA_SECRET : global.process.env.DATA_SECRET) || "";
  const decipher = crypto.createDecipher("aes-256-ctr", secretKey);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString("utf-8");
};

export const moneyFormatter = (
  numberValue: number,
  minPrecision: number,
  maxPrecision: number
) => {
  if (typeof numberValue === "number" && !Number.isNaN(numberValue)) {
    return new Intl.NumberFormat("ja-JP", {
      minimumFractionDigits: minPrecision,
      maximumFractionDigits: maxPrecision,
    }).format(numberValue);
  }
  return new Intl.NumberFormat("ja-JP", {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  }).format(0);
};
