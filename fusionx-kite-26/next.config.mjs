/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",      // Generates static HTML/CSS/JS — perfect for Netlify
  trailingSlash: true,   // Netlify prefers /about/ over /about
  images: {
    unoptimized: true,   // Required for static export (no Next.js Image Optimization server)
  },
};

export default nextConfig;
