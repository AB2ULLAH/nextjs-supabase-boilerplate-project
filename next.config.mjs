/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {  // Fixed key from 'image' to 'images'
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com",
                protocol: "https",
            },
            {
                hostname: "lh3.googleusercontent.com", // You can add other hosts here if needed
                protocol: "https",
            },
        ],
    },
};

export default nextConfig;
