import NewChat from "./NewChat"

function SideBar() {
    return (
        <div className="p-2 flex-col h-screen">
            <div className="flex-1">
                <div>
                    {/* New Chat */}
                    <NewChat />

                    <div>
                        {/* model select */}
                    </div>

                    {/* map through chatRows */}

                </div>
            </div>
        </div>
    )
}

export default SideBar