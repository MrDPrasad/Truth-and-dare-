/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/socket",
          destination: "/api/socket",
        },
      ];
    },
  };
  
  export default nextConfig;
  