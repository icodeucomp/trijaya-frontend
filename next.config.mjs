import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icodeu-storage.s3.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
