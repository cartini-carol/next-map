/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? " https://cartini-carol.github.io/next-map/"
      : "",
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
