import { Navlink } from "react-router-dom";

export default function Navbar() {
    const navitems = [
        { name: "Dashboard", path: "/" },
        { name: "Upload Data", path: "/upload" },
        { name: "View Data", path: "/view" },
    ];

    return (
        <nav className="bg-gray-900 text-gray-100 px-6 py-4 shadow-md">
            <div className="max-w-7x1 mx-auto flex justify-between items-center">
                <div className="text-2x1 font-bold">
                    NFL Personnel Optimizer
                </div>

                <div className="space-x-6">
                    {navitems.map((item) => (
                        <Navlink
                            key={item.path}
                            to={item.path}
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "font-semibold text-blue-400 border-b-2 border-blue-400 pb-1 transition"
                                    : "hover:text-blue-400 transition"
                                   
                            }
                        >
                            {item.name}
                        </Navlink>
                    ))}
                </div>
            </div>
        </nav>                        
    );
}