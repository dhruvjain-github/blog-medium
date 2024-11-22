import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs, useUser } from "../hooks";

export const Blogs = () => {
    const { loading: blogsLoading, blogs } = useBlogs();
    const { loading: userLoading, user } = useUser();

    if (blogsLoading || userLoading) {
        return (
            <div>
                <Appbar userName={user?.name || "Guest"} />
                <div className="flex justify-center">
                    <div>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar userName={user?.name || "Guest"} />
            <div className="flex justify-center">
                <div>
                    {blogs.map((blog) => (
                        <BlogCard
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={"2nd Feb 2024"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
