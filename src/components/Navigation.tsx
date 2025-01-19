import {Link} from "react-router";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export function Navigation({ setSearchLabel, setImage }) {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);
    const navigate = useNavigate();

    const handleLinkClick = (path, label, image) => {
        setActivePath(path);
        setSearchLabel(label);
        setImage(image);
    };

    function logout() {
        navigate('/');
    }

    return (
        <>
            <aside className="w-64 h-screen bg-white text-[#004463] fixed left-0 top-0 flex flex-col items-center justify-center">
                <div className="font-bold my-14">
                    <img src="/assets/Logo.png" alt="Logo"/>
                </div>
                <nav className="flex flex-col items-cemter w-full px-4">
                    <ul className="list-none w-full flex flex-col items-start px-10 space-y-4">
                        {[
                            { id: 'dashboard-btn', path: '/dashboard', icon: '/assets/Dashboard.png', label: 'Dashboard', image: '/assets/Dashboard-Side.png' },
                            { id: 'crop-btn', path: '/crop', icon: '/assets/Crop.png', label: 'Crop', image: '/assets/Crop-img.png' },
                            { id: 'fields-btn', path: '/fields', icon: '/assets/Field.png', label: 'Fields', image: '/assets/Field-img.png' },
                            { id: 'staff-btn', path: '/staff', icon: '/assets/Staff.png', label: 'Staff', image: '/assets/Staff-img.png' },
                            { id: 'vehicles-btn', path: '/vehicles', icon: '/assets/Vehicle.png', label: 'Vehicles', image: '/assets/Vehicle-img.png' },
                            { id: 'equipment-btn', path: '/equipment', icon: '/assets/Equipment.png', label: 'Equipment', image: '/assets/Equipment-img.png' },
                            { id: 'logs-btn', path: '/logs', icon: '/assets/Logs.png', label: 'Logs', image: '/assets/Logs-img.png' },
                        ].map((item) => (
                            <li
                                key={item.id}
                                id={item.id}
                                className={`flex items-center gap-4 px-2 py-3 text-left cursor-pointer transition ${
                                    activePath === item.path
                                        ? "bg-[#ECF1F1] border-l-4 border-cyan-500 text-cyan-800 w-full rounded-lg h-11"
                                        : "hover:text-[#162635]"
                                }`}
                                onClick={() => handleLinkClick(item.path, item.label, item.image)}
                            >
                                <Link to={item.path} className="flex items-center gap-4 w-full">
                                    <img src={item.icon} alt={item.label} className="w-5" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-24">
                        <button
                            id="logout"
                            className="flex items-center gap-4 px-10 py-2 text-[#004463] hover:text-[#162635] transition" onClick={logout}
                        >
                            <img src="/assets/Logout.png" alt="Logout" className="w-6 h-6"/>
                            <span>Logout</span>
                        </button>
                    </div>
                </nav>
                <div className="mt-6 p-4">
                    <img src="/assets/Coner-img.png" alt="Corner" className="w-44"/>
                </div>
            </aside>
        </>
    )
}