export function RightSidebar({sidebarImage}) {
    return (
        <>
            <aside className="w-72 h-screen bg-[#162635] fixed right-0 top-0 flex flex-col items-center">
                <div
                    className="h-[600px] w-full bg-cover bg-center"
                    style={{backgroundImage: `url(${sidebarImage})`}}
                ></div>
                <div className="flex flex-col items-center text-center mt-4">
                    <h4 className="text-white text-lg font-medium mb-2">Recent Logs</h4>
                    <h5 className="text-gray-400 text-sm font-medium mb-1">
                        It is a long established fact that
                    </h5>
                    <h5 className="text-gray-400 text-sm font-medium mb-5">
                        a reader will be distracted
                    </h5>
                    {[
                        'Field inspection completed. (Date: 2024-12-05)',
                        'Crop analysis started. (Date: 2024-12-06)',
                    ].map((log, index) => (
                        <div key={index} className="mb-3 px-5">
                            <p className="text-white text-sm">{log}</p>
                            <div className="w-64 h-[1px] bg-white my-2"></div>
                        </div>
                    ))}
                </div>
            </aside>
        </>
    );
}