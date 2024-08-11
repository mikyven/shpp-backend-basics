// цей файл потрібно буде дописати...
const fs = require("fs");

// не звертайте увагу на цю функцію
// вона потрібна для того, щоб коректно зчитувати вхідні данні
function readHttpLikeInput() {
  var fs = require("fs");
  var res = "";
  var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
  let was10 = 0;
  for (;;) {
    try {
      fs.readSync(0 /*stdin fd*/, buffer, 0, 1);
    } catch (e) {
      break; /* windows */
    }
    if (buffer[0] === 10 || buffer[0] === 13) {
      if (was10 > 10) break;
      was10++;
    } else was10 = 0;
    res += new String(buffer);
  }

  return res;
}

let contents = readHttpLikeInput();

function outputHttpResponse(statusCode, statusMessage, headers, body) {
  const host = headers.Host;
  const server = "Apache/2.2.14 (Win32)";
  const contentLength = `${body}`.length;
  const connection = "Closed";
  const contentType = "text/html; charset=utf-8";

  console.log(`HTTP/1.1 ${statusCode} ${statusMessage} ${
    host ? `\nHost: ${host}` : ""
  }
Server: ${server}
Content-Length: ${contentLength}
Connection: ${connection}
Content-Type: ${contentType}

${body}`);
}

function processHttpRequest(method, uri, headers, body) {
  // 3
  // if (method === "GET" && uri.startsWith("/sum")) {
  //   if (!uri.includes("?nums=")) {
  //     outputHttpResponse(400, "Bad Request", headers, body);
  //   } else {
  //     const sum = uri
  //       .slice(uri.indexOf("=") + 1)
  //       .split(",")
  //       .reduce((a, c) => +a + +c, 0);
  //     outputHttpResponse(200, "OK", headers, sum);
  //   }
  // } else {
  //   outputHttpResponse(404, "Not Found", headers, "not found");
  // }

  // 4
  // if (method === "POST" && uri === "/api/checkLoginAndPassword") {
  //   const [login, password] = body.split("&").map((i) => i.split("=")[1]);
  //   let passwords;
  //   try {
  //     passwords = require("fs").readFileSync("passwords.txt", "utf8");
  //   } catch {
  //     outputHttpResponse(500, "Internal Server Error", "", "");
  //     return;
  //   }
  //   if (passwords.includes(`${login}:${password}`)) {
  //     outputHttpResponse(200, "OK", "", '<h1 style="color:green">FOUND</h1>');
  //   } else {
  //     outputHttpResponse(
  //       404,
  //       "Not Found",
  //       "",
  //       '<h1 style="color:red">NOT FOUND</h1>'
  //     );
  //   }
  // }

  // 5
  if (method === "GET") {
    let path = "else";
    if (headers.Host) {
      if (headers.Host.startsWith("student.shpp.me")) {
        path = "student";
      } else if (headers.Host.startsWith("another.shpp.me")) {
        path = "another";
      }
    }

    if (uri === "/") uri = "/index.html";

    try {
      const file = fs.readFileSync(`${path}/${uri}`);
      outputHttpResponse(200, "OK", headers, file);
    } catch (error) {
      if (error.code === "ENOENT") {
        outputHttpResponse(404, "Not Found", headers, "");
      } else if (error.code === "EISDIR") {
        outputHttpResponse(403, "Forbidden", headers, "");
      }
    }
  }
}

// ось цю функцію, власне, і треба написати
function parseTcpStringAsHttpRequest(string) {
  splitString = string.split("\n");
  splitFirstLine = splitString[0].split(" ");
  const headers = splitString
    .filter((i) => i.includes(":"))
    .reduce((a, c) => {
      const splitValue = c.split(":");
      return { ...a, [splitValue[0]]: splitValue[1].slice(1) };
    }, {});
  const body = splitString
    .filter((i) => !i.includes(":"))
    .slice(1)
    .filter((i) => i)[0];

  return {
    method: splitFirstLine[0],
    uri: splitFirstLine[1],
    headers,
    body,
  };
}

// 2
// http = parseTcpStringAsHttpRequest(contents);
// console.log(JSON.stringify(http, undefined, 2));

// 3
// const request = parseTcpStringAsHttpRequest(`GET /sum?nums=1,2,3,4 HTTP/1.1
// Host: shpp.me
// Accept: image/gif, image/jpeg, */*
// Accept-Language: en-us
// Accept-Encoding: gzip, deflate
// User-Agent: Mozilla/4.0

// `);
// processHttpRequest(...Object.values(request));

// 4
// const request =
//   parseTcpStringAsHttpRequest(`POST /api/checkLoginAndPassword HTTP/1.1
// Accept: */*
// Content-Type: application/x-www-form-urlencoded
// User-Agent: Mozilla/4.0
// Content-Length: 35

// login=student&password=12345
// `);
// processHttpRequest(...Object.values(request));

// 5
const request = parseTcpStringAsHttpRequest(`GET /test.txt HTTP/1.1
Host: student.shpp.me
Accept: image/gif, image/jpeg, */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0

`);
processHttpRequest(...Object.values(request));
