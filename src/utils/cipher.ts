import crypto from "crypto";
import config from "../config";

const key = Buffer.from(config.crypto.key, "hex");
const algorithm = config.crypto.algorithm;

export function encrypt(password: string) {
  const iv = crypto.randomBytes(config.crypto.ivByteSize);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${encrypted.toString("hex")}:${iv.toString("hex")}`;
}

export function decrypt(cipherText: string) {
  const [encryptedTextString, ivString] = cipherText.split(":");
  let iv = Buffer.from(ivString, "hex");
  let encryptedText = Buffer.from(encryptedTextString, "hex");

  // Creating Decipher
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);

  // Updating encrypted text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // returns data after decryption
  return decrypted.toString();
}
