const withImages = require('next-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true
    // webpack: config => {
    //     config.module.rules.push({
    //         test: /\.svg$/,
    //         use: ['@svgr/webpack']
    //     });

    //     return config;
    // }
    // experimental: {
    // swcMinify: true,
    // },
    // images: {
    // disableStaticImages: true
    // dangerouslyAllowSVG: true,

    // }
};

module.exports = nextConfig;

// module.exports = withImages();
