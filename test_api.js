import http from "http";

const data = JSON.stringify({
  name: "Test",
  quantity: 10,
  price: 9.99,
  category: "Electronics"
});

const req = http.request({
  hostname: "localhost",
  port: 5000,
  path: "/api/products",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
}, (res) => {
  let body = "";
  res.on("data", chunk => body += chunk);
  res.on("end", () => {
    console.log("Status Code:", res.statusCode);
    console.log("Response Body:", body);
  });
});

req.on("error", (e) => {
  console.error("Request Error:", e.message);
});

req.write(data);
req.end();
