import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  compiler: {
    // any extra compiler configs
  },
};

export default nextConfig;
