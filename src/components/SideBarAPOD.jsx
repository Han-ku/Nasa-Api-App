import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
/* eslint-disable react/prop-types */
export default function SideBarAPOD(props) {

    const {handleToggleModal, data} = props

    return (
        <div className="sidebar">
            <div onClick={handleToggleModal} className="bgOverlay"></div>
            <div className="sidebarContents">
                <h2>{data?.title}</h2>
                <div className="descriptionContainer">
                    <p className="descriptionTitle">{data?.date}</p>
                    <p>{data?.explanation}</p>
                </div>
                <button id="arrowBtn" data-tooltip-content="Close additional information" onClick={handleToggleModal}>
                    <i className="fa-solid fa-arrow-right-long"></i>
                </button>
                <Tooltip anchorId="arrowBtn" place="top" effect="solid" />
            </div>
         
        </div>
    )
}