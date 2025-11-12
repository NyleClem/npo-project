import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
    const navitems = [
        { name: "Dashboard", path: "/" },
        { name: "Upload Data", path: "/upload" },
        { name: "View Data", path: "/view" },
    ];

    return (
        <nav aria-label="Main navigation" className="bg-gray-900 text-gray-100 px-6 py-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div>
                    <Link to="/" className="text-2xl font-bold">NFL Personnel Optimizer</Link>
                </div>

                <ul className="flex items-center space-x-6">
                    {navitems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? "font-semibold text-blue-400 border-b-2 border-blue-400 pb-1 transition duration-150"
                                        : "hover:text-blue-400 transition duration-150"
                                }
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}