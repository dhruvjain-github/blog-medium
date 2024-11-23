import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs, useUser } from "../hooks";

export const Blogs = () => {
    const { loading: blogsLoading, blogs, error } = useBlogs();
    const { loading: userLoading, user } = useUser();

    console.log("User data:", user); // Debug log to check user details

    if (blogsLoading || userLoading) {
        return (
            <div>
                <Appbar userName={user?.name || "Guest"} avatar={user?.avatar} />
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

    if (error) {
        return (
            <div>
                <Appbar userName={user?.name || "Guest"} avatar={user?.avatar} />
                <div className="flex justify-center text-red-500">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar userName={user?.name || "Guest"} avatar={user?.avatar} />
            <div className="flex justify-center">
                <div>
                    {blogs.length === 0 ? (
                        <p>No blogs available</p>
                    ) : (
                        blogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                id={blog.id.toString()} // Ensure id is passed as a string
                                authorName={blog.author?.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={blog.publishedDate || "Unknown"}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
