/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
    experimental: {
      outputFileTracingRoot: undefined,
    },
  };
  
  export default nextConfig;
  