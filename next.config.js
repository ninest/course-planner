/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["s3.us-west-2.amazonaws.com"],
    remotePatterns: [
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com", port: "", pathname: "secure.notion-static.com" },
    ],
  },
};

module.exports = nextConfig;
