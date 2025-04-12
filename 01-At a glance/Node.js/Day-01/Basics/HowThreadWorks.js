const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

/**
 * Password Encryption Syntax
 *
 * crypto.pbkdf2("password value(string)", "salt", "Iteration", "key-length(number)", "digest algorithm(string)", () => {})
 *
 */

process.env.UV_THREADPOOL_SIZE = 8;

fs.readFile("sample.txt", "utf-8", (err, res) => {
  if (err) {
    console.log("Error occurs while reading the sample.txt file. Err : ", err);
  } else {
    console.log("File log is : ", res);
  }
  crypto.pbkdf2("password1", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "required to encrypt Password1");
  });
  crypto.pbkdf2("password2", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "required to encrypt Password2");
  });
  crypto.pbkdf2("password3", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "required to encrypt Password3");
  });
  crypto.pbkdf2("password4", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "required to encrypt Password4");
  });
  crypto.pbkdf2("password5", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "required to encrypt Password5");
  });
  crypto.pbkdf2("password5", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "required to encrypt Password5");
  });
  crypto.pbkdf2("password5", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "required to encrypt Password5");
  });
  crypto.pbkdf2("password5", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms`, "required to encrypt Password5");
  });
});
