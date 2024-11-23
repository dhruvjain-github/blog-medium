import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog, useUser } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { user } = useUser(); // Removed `userLoading`
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });

    if (loading) {
        return (
            <div>
                <Appbar userName={user?.name || "Guest"} />
                <div className="h-screen flex flex-col justify-center">
                    <Spinner />
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div>
                <Appbar userName={user?.name || "Guest"} />
                <div className="h-screen flex items-center justify-center">
                    <p>Blog not found</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar userName={user?.name || "Guest"} />
            <FullBlog blog={blog} />
        </div>
    );
};
