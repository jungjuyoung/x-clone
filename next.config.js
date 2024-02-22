/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            { protocol: "https", hostname: "**.domain.co(m|\.kr)" },
            { protocol: "http", hostname: "**.domain.co(m|\.kr)" },
        ]
    },
    async rewrites() {
        return [
          {
            source: '/upload/:slug',
            destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`
          },
        ]
      },
}

module.exports = nextConfig
