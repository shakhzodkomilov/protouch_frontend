import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
let apiUrlObj: URL | undefined;
try {
  apiUrlObj = apiUrl ? new URL(apiUrl) : undefined;
} catch {
  apiUrlObj = undefined;
}

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
      {
        protocol: "https",
        hostname: "api.protouch.uz",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "46.62.220.230",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "46.62.220.230",
        port: "9000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "46.62.220.230",
        port: "9000",
        pathname: "/media/**",
      },
      ...(apiUrlObj
        ? [
            {
              protocol: apiUrlObj.protocol.replace(":", "") as "http" | "https",
              hostname: apiUrlObj.hostname,
              port: apiUrlObj.port || undefined,
              pathname: "/media/**",
            },
          ]
        : []),
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
