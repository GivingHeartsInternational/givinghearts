/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        loader: "default",
        domains: [
            "localhost",
            "giv-back.herokuapp.com",
            "livedemo00.template-help.com",
            "images.squarespace-cdn.com",
        ],
        //domains: ["*"],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    //avoiding CORS error, more here: https://vercel.com/support/articles/how-to-enable-cors
    async headers() {
        return [{
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" },
                { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }]
    },
}

module.exports = nextConfig