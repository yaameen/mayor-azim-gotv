const { default: withPWAInit } = require('@ducanh2912/next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
            },
        ],
    }
}

module.exports = withPWAInit({
    dest: 'public',
})(nextConfig)
