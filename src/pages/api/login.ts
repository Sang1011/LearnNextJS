import { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};
const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "method not supported" });
  }

  return new Promise((resolve) => {
    req.headers.cookie = "";

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", function (chunk) {
        body += chunk;
      });
      proxyRes.on("end", function () {
        try {
          console.log(body);
          const isSuccess =
            proxyRes.statusCode &&
            proxyRes.statusCode >= 200 &&
            proxyRes.statusCode < 300;
          if (!isSuccess) {
            const errorResponse = JSON.parse(body);

            if (proxyRes.statusCode === 401 || proxyRes.statusCode === 400) {
              (res as NextApiResponse)
            .status(200)
            .json({ message: "Invalid username or password" });
              (res as NextApiResponse).status(400).json(errorResponse);
              return resolve(true);
            }

            // Các lỗi khác
            (res as NextApiResponse)
              .status(proxyRes.statusCode || 500)
              .json(errorResponse);
            return resolve(true);
          }
          const { accessToken, expiredAt } = JSON.parse(body);
          console.log({ accessToken, expiredAt });

          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== "development",
          });
          cookies.set("access_token", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(expiredAt),
          });
          (res as NextApiResponse)
            .status(200)
            .json({ message: "login successfully" });
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "something went wrong" });
        }
        resolve(true);
      });
    };

    proxy.once("proxyRes", handleLoginResponse);
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      // selfHandleResponse: false
      selfHandleResponse: true,
      // bật lên vì muốn tự handle thay vì để server
    });
  });

  // res.status(200).json({name: "PATH - match all"})
}
