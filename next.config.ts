import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "placehold.co", "js-post-api.herokuapp.com"], // Thêm domain của Cloudinary
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  }  
};

export default nextConfig;
