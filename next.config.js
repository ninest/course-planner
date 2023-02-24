/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    urlImports: ["https://raw.githubusercontent.com/ninest/nu-courses/"],
  },
};

module.exports = nextConfig;
