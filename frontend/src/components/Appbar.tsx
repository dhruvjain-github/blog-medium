import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

interface AppbarProps {
    userName: string; // The logged-in user's name
}

export const Appbar = ({ userName }: AppbarProps) => {
    return (
        <div className="border-b flex justify-between px-10 py-4">
            <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer text-lg font-bold">
                Medium
            </Link>
            <div className="flex items-center">
                <Link to={`/publish`}>
                    <button
                        type="button"
                        className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                    >
                        New
                    </button>
                </Link>
                {/* <Avatar size="big" name={userName} /> */}
            </div>
        </div>
    );
};
