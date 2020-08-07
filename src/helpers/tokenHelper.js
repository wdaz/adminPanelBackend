const { StringDecoder } = require("string_decoder");
const decoder = new StringDecoder("utf8");

module.exports = {
  getToken: (req) => {
    if (req.headers.authorization)
      return req.headers.authorization.split(" ")[1].replace(/"/g, "");
  },
  encodeBase64: (data) => {
    return decoder.write(Buffer.from(data));
  },
  decodeBase64: (data) => {
    return decoder.end(Buffer.from(data));
  },
};
