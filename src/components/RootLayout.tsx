import {Outlet} from "react-router";
import {Navigation} from "./Navigation.tsx";
import {RightSidebar} from "./RightSidebar.tsx";
import {Header} from "./Header.tsx";
import {useState} from "react";

export function RootLayout() {

    const [searchLabel, setSearchLabel] = useState("Crop");
    const [sidebarImage, setImage] = useState("/assets/Dashboard-Side.png");

    return(
        <>
            <div className="flex">
                <Navigation setSearchLabel={setSearchLabel} setImage={setImage} />

                <div className="flex-grow mx-64 ml-64 mr-72 bg-[#F1F7F7] p-10 min-h-[970px]">
                    <Header searchLabel={searchLabel}/>
                    <main>
                        <Outlet/>
                    </main>
                </div>

                <RightSidebar sidebarImage={sidebarImage}/>
            </div>
        </>
    );
}