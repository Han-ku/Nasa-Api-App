import { useEffect, useState } from "react";
import TitleAPOD from "./TitleAPOD";
import SideBarAPOD from "./SideBarAPOD";
import 'react-tooltip/dist/react-tooltip.css';
// import { Tooltip } from 'react-tooltip';

/* eslint-disable react/prop-types */
export default function APOD() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false)

    function handleToggleModal() {
      setShowModal(!showModal)
    }

     useEffect(() => {
        async function fetchAPIData() {
            const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
            const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`

            const today = (new Date()).toDateString()
            const localKey = `NASA-${today}`
            const localData = localStorage.getItem(localKey)

            if (localData) {
                try {
                    const apiData = JSON.parse(localData)
                    setData(apiData)
                    console.log("Fetched from cache today")
                    setLoading(false)
                    return
                } catch (err) {
                    console.error("Failed to parse cache data", err)
                    localStorage.removeItem(localKey)
                }
            }

            localStorage.clear()

            try {
                const res = await fetch(url)
                const apiData = await res.json()
                localStorage.setItem(localKey, JSON.stringify(apiData))
                setData(apiData)
                console.log("Fetched from API today")
            } catch (err) {
                console.log(err.message)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchAPIData()
    }, [])

    if (loading) {
        return (
            <div className="loadingState">
                <i className="fa-solid fa-gear fa-spin"></i>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mediaContainer">
         <TitleAPOD data={data} handleToggleModal={handleToggleModal} />
            {data.media_type === 'video' ? (
                <iframe 
                    src={data?.url} 
                    title={data?.title || 'bg_video'} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="bg_video"
                    allowFullScreen
                    frameBorder="0">
                </iframe>
            ) : (
                <a href={data.url || data.hdurl} target="_blank" rel="noopener noreferrer">
                    <img src={data.url || data.hdurl} alt={data.title || 'bg_img'} className="bg_image" />
                </a>
            )}
            {showModal && <SideBarAPOD data={data} handleToggleModal={handleToggleModal} />}
        </div>
    )
}