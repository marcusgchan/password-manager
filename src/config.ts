const config = {
  crypto: {
    algorithm: "aes-256-cbc",
    key: process.env.CIPHER_KEY as string,
    ivByteSize: 16,
    // keyByteSize: 32 // Used tp gemerate key: console.log(crypto.randomBytes(32).toString("hex"));
  },
};

export default config;
