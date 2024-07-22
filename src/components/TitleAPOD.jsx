import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

/* eslint-disable react/prop-types */
export default function TitleAPOD(props) {
  const { handleToggleModal, data } = props;

  return (
    <div className="apod_title_container">
      <div className="bgGradient"></div>
      <div className='title'>
        <h1>APOD (Astronomy Picture of the Day) Project</h1>
        <h2>{data?.title}</h2>
      </div>
      <button id="infoBtn" data-tooltip-content="View additional information" onClick={handleToggleModal}>
        <i className="fa-solid fa-circle-info"></i>
      </button>
      <Tooltip anchorId="infoBtn" place="top" effect="solid" />
    </div>
  );
}