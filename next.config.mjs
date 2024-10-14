/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: [
            'image/webp',
        ],
        remotePatterns: [{
            protocol: "https",
            hostname: "**",
        }],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgo: false,
                    },
                },
            ],
        });

        return config;
    },
};

export default nextConfig;
