import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blogs",
        destination: "/#writing",
        permanent: true,
      },
      {
        source: "/work/ads-codex",
        destination: "/work/draper",
        permanent: true,
      },
      {
        source: "/work/opensource-codex",
        destination: "/work/codex-desktop-unpacked",
        permanent: true,
      },
      {
        source: "/work/virtuchat",
        destination: "/work/persona-chat",
        permanent: true,
      },
      {
        source: "/work/tiktok-trend-analyser",
        destination: "/work/tiktok-semantics",
        permanent: true,
      },
      {
        source: "/work/make-videos-like-3b1b",
        destination: "/work/text-to-manim",
        permanent: true,
      },
      {
        source: "/work/tinygrad",
        destination: "/work/autograd-engine",
        permanent: true,
      },
      {
        source: "/work/dragarys",
        destination: "/work/self-correcting-rag",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
