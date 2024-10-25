/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {protocol: 'https',
                hostname: 'https://pokeapi.co'
            }
        ]
    }
};

export default nextConfig;
