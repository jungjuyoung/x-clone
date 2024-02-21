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
            destination: 'http://localhost:9090/upload/:slug',
          },
        ]
      },
}

module.exports = nextConfig
