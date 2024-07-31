/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol:'https',
                hostname: 'storage.googleapis.com',
                pathname:'/rifando_images/rifas/**'
            }
        ]
    }
};

export default nextConfig;
