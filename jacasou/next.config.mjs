/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['jalice-wedding-images.s3.amazonaws.com'],
    unoptimized: true,
  },
  output: 'export',
};
  

export default nextConfig;
