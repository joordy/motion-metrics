import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MotionMetrics — A simple way to track your workout activity",
    short_name: "MotionMetrics",
    description:
      "A simple way to track your workout activity. Track your workout activity with MotionMetrics. Keep track of your workout activity and see your progress over time.",
    start_url: "/",
    display: "standalone",
    background_color: "#262626",
    theme_color: "FBF8F1",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
