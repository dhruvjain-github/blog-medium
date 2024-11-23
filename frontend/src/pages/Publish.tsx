import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { useUser } from "../hooks";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const { user } = useUser();

    const handlePublish = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                    title,
                    content: description,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            navigate(`/blogs`); // Redirect to the blogs page after publishing
        } catch (error) {
            console.error("Failed to publish the blog:", error);
        }
    };

    return (
        <div>
            <Appbar userName={user?.name || "Guest"} />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        type="text"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                        placeholder="Title"
                    />
                    <TextEditor onChange={(e) => setDescription(e.target.value)} value={description} />
                    <button
                        onClick={handlePublish}
                        type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange, value }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void; value: string }) {
    return (
        <div className="mt-2">
            <textarea
                onChange={onChange}
                value={value}
                rows={8}
                className="focus:outline-none block w-full px-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg"
                placeholder="Write an article..."
                required
            />
        </div>
    );
}
