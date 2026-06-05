import Home from "@/views/Home";
import { getBlogs } from "@/lib/blog";

export default async function HomePage() {
  const { blogs } = await getBlogs({ limit: 3 }).catch(() => ({ blogs: [] }));
  return <Home latestPosts={blogs} />;
}
