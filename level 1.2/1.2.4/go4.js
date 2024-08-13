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
  const server = "Apache/2.2.14 (Win32)";
  const contentLength = `${body}`.length;
  const connection = "Closed";
  const contentType = "text/html; charset=utf-8";

  console.log(`HTTP/1.1 ${statusCode} ${statusMessage}
Server: ${server}
Content-Length: ${contentLength}
Connection: ${connection}
Content-Type: ${contentType}

${body}`);
}

function processHttpRequest(method, uri, headers, body) {
  if (method === "POST" && uri === "/api/checkLoginAndPassword") {
    const [login, password] = body.split("&").map((i) => i.split("=")[1]);
    let passwords;
    try {
      passwords = fs.readFileSync("passwords.txt", "utf8");
    } catch {
      outputHttpResponse(500, "Internal Server Error", "", "");
      return;
    }

    if (passwords.includes(`${login}:${password}`)) {
      outputHttpResponse(200, "OK", "", '<h1 style="color:green">FOUND</h1>');
    } else {
      outputHttpResponse(
        404,
        "Not Found",
        "",
        '<h1 style="color:red">NOT FOUND</h1>'
      );
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

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(...Object.values(http));
