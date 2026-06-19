/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // NOTE: deliberately NO `output: "standalone"`.
  // Netlify's @netlify/plugin-nextjs handles the App Router (SSR + ISR +
  // static) natively. `standalone` is only for self-hosted container deploys.
};

module.exports = nextConfig;
