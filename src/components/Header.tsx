import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export function Header({ searchLabel }) {

    const [currentDateTime, setCurrentDateTime] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDateTime = now.toLocaleString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
            setCurrentDateTime(formattedDateTime);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleProfileClick = () => {
        navigate('/profile'); // Navigate to the profile route
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 flex justify-between items-center bg-[transparent] p-10">
                <div className="relative w-[275px] ml-[260px]">
                    <input
                        type="text"
                        placeholder={`Search ${searchLabel.toLowerCase()} here...`}
                        className="w-full py-2 pl-14 pr-4r rounded-full bg-white shadow focus:outline-none"
                    />

                    <span className="absolute left-4 top-2/4 transform -translate-y-1/2 text-gray-500">
                    <img src="/assets/Search.png" alt="Search Icon" className="w-5 h-5 ml-2 "/>
                </span>
                </div>

                <div className="flex items-center gap-4 mr-[280px]">
                    <span className="text-gray-500 text-sm">{currentDateTime}</span>
                    <div className="w-8 h-8 rounded-full bg-teal-500 overflow-hidden cursor-pointer" onClick={handleProfileClick}>
                        <img
                            src="/assets/profilPic.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

        </>
    );
}