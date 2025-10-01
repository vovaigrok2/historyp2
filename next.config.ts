import type { NextConfig } from "next";

import next_pwa from "next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

const withPWA = next_pwa({
    dest: 'public', // сюда генерится service worker
    register: true,
    skipWaiting: true
})

module.exports = withPWA({
    reactStrictMode: true
})