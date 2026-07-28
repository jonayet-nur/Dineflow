import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // বা আপনার ব্যবহৃত অন্য কোনো ইমেজ হোস্টিং
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },
  /* config options here */
  // reactCompiler: true,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'i.ibb.co',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'ibb.co',
  //     },
  //   ],
  // },
};

export default nextConfig;
