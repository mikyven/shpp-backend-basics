// цей файл потрібно буде дописати...

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
  const server = "Apache/2.2.14 (Win32)";
  const connection = "Closed";
  const contentType = "text/html; charset=utf-8";
  const contentLength = `${body}`.length;

  console.log(`HTTP/1.1 ${statusCode} ${statusMessage}
Server: ${server}
Connection: ${connection}
Content-Type: ${contentType}
Content-Length: ${contentLength}

${body}`);
}

function processHttpRequest(method, uri, headers, body) {
  if (method === "GET" && uri.startsWith("/sum")) {
    if (uri.includes("?nums=")) {
      const sum = uri
        .slice(uri.indexOf("=") + 1)
        .split(",")
        .reduce((a, c) => +a + +c, 0);
      outputHttpResponse(200, "OK", headers, sum);
    } else {
      outputHttpResponse(400, "Bad Request", headers, body);
    }
  } else {
    outputHttpResponse(404, "Not Found", headers, "not found");
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

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(...Object.values(http));
