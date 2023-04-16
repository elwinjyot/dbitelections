/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com","imgs.search.brave.com", "ezgsausrazdmuxcqepvl.supabase.co"]
  }
}

module.exports = nextConfig
