import { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import zlib from "zlib";
import Cookies from "cookies";

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false, // Disable default bodyParser
  },
};
const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not supported" });
  }

  const cookies = new Cookies(req, res);
  const token = cookies.get("access_token");
  if (!token) {
    return res.status(401).json({ message: "You need to login first" });
  }

  req.headers.authorization = `Bearer ${token}`;

  return new Promise((resolve) => {
    const handleProxyResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";

      proxyRes.on("data", (chunk) => {
        body += chunk.toString("binary");
      });

      proxyRes.on("end", () => {
        try {
          const encoding = proxyRes.headers["content-encoding"];
          let decompressedBody: string;

          if (encoding === "gzip") {
            decompressedBody = zlib.gunzipSync(Buffer.from(body, "binary")).toString();
          } else if (encoding === "deflate") {
            decompressedBody = zlib.inflateSync(Buffer.from(body, "binary")).toString();
          } else {
            decompressedBody = body;
          }

          const contentType = proxyRes.headers["content-type"];
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Invalid content type, expected application/json");
          }

          const response = JSON.parse(decompressedBody);
          (res as NextApiResponse).status(200).json({ message: "Get profile successfully", response });
        } catch (error) {
          console.error("Error:", error);
          (res as NextApiResponse).status(500).json({ message: "Error fetching profile data", error });
        }
        resolve(true);
      });
    };

    proxy.once("proxyRes", handleProxyResponse);
    proxy.web(req, res, {
      target: process.env.API_URL, // Target API
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
