export default function SideBar(props) {

    const {handleToggleModal} = props

    return (
        <div className="sidebar">
            <div onClick={handleToggleModal} className="bgOverlay"></div>
            <div className="sidebarContents">
                <h2>The Brutal Martian Landscape</h2>
                <div>
                    <p>Description</p>
                    <p>dcfgnhvfdhvj dshbvdfv hbdhvjfbdhdj fvbbdjshcfb hvdfbhjdfvcbhj dfvcbnhjdsf kjsdkjnmdzc bhjvfdhgyfred</p>
                </div>
                <button onClick={handleToggleModal}>
                    <i className="fa-solid fa-arrow-right-long"></i>
                </button>
            </div>
         
        </div>
    )
}