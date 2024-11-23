import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`} className="block">
            <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex items-center space-x-2">
                    <Avatar name={authorName} />
                    <div className="font-extralight text-sm">{authorName}</div>
                    <div className="pl-2">
                        <Circle />
                    </div>
                    <div className="font-thin text-slate-500 text-sm">{publishedDate || 'Update'}</div>
                </div>
                <div className="text-xl font-semibold pt-2">{title}</div>
                <div className="text-md font-thin">{content.slice(0, 100)}...</div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    );
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500" />;
}

export function Avatar({ name, size = "small" }: { name: string | undefined; size?: "small" | "big" }) {
    const displayName = name?.[0] || "?"; // Fallback to "?" if no name is provided
    return (
        <div
            className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
                size === "small" ? "w-6 h-6" : "w-10 h-10"
            }`}
        >
            <span
                className={`${
                    size === "small" ? "text-xs" : "text-md"
                } font-extralight text-gray-600 dark:text-gray-300`}
            >
                {displayName}
            </span>
        </div>
    );
}
