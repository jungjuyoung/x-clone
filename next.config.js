/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            { protocol: "https", hostname: "**.domain.co(m|\.kr)" },
            { protocol: "http", hostname: "**.domain.co(m|\.kr)" },
        ]
    }
}

module.exports = nextConfig
