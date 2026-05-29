import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    memoryBasedWorkersCount: true,
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    minimumCacheTTL: 60,
    remotePatterns: [
      // 1. Asosiy domen
      {
        protocol: "https",
        hostname: "api.protouch.uz",
        pathname: "/media/**",
      },
      // 2. Traefik domeni (Wildcard bilan hamma traefik.me subdomainlariga ruxsat)
      {
        protocol: "https",
        hostname: "*.traefik.me",
        pathname: "/media/**",
      },
      // 3. IP manzil va 9000 port (Xatoni aynan shu tuzatadi)
      {
        protocol: "http",
        hostname: "46.62.220.230",
        port: "9000",
        pathname: "/media/**",
      },
      // 4. IP manzil portiz (agar port bo'lmasa)
      {
        protocol: "http",
        hostname: "46.62.220.230",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "cdn.raumkraft.uz",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.cache = {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/:lang/products/product/:id",
        destination: "/:lang/product/:id",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
