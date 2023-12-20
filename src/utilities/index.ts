import crypto from "crypto";

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
