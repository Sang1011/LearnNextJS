import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Chế độ Strict Mode để phát hiện lỗi
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Rewrites cho API routes
        destination: "/api/:path*",
      },
      {
        source: "/:path*", // Rewrites đảm bảo route chính hoạt động
        destination: "/", // Điều hướng tới trang chính
      },
    ];
  },
};

export default nextConfig;
