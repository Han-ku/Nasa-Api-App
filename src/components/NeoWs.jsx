import {useState, useEffect, useCallback} from "react"
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const NeoWs = () => {

    const [neoData, setNeoData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchNeoData = useCallback(async () => {
        setLoading(true);
        const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
        const today = new Date().toISOString().split('T')[0]
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_KEY}`

        try {
            const res = await fetch(url)
            const data = await res.json()
            const neoObjects = data.near_earth_objects?.[today]

            if (neoObjects && neoObjects.length > 0) {
                setNeoData(neoObjects);
            } else {
                setNeoData([]);
            }
        } catch(err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [])


    useEffect(() => {
        fetchNeoData()
    }, [fetchNeoData])

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 2) % neoData.length)
      }

    if(loading) {
        return (
            <div className="loadingState">
                <i className="fa-solid fa-gear"></i>
            </div>
        )
    } 
        
    if(error) return <div>Error: {error.message}</div>

    const displayedNeos = neoData.slice(currentIndex, currentIndex + 2)

    return (
        <> 
            <div className="neoWs_title title">
                <h1>NeoWs (Near Earth Object Web Service) Project</h1>
                <h2>In case you are wondering if there are asteroids near Earth right now</h2>
                <p>Date: {new Date().toISOString().split('T')[0]}</p>
                <p>Element Count: {neoData.length}</p>
            </div>
            <div className="neoWs_cards_container">
                {displayedNeos.map((neo) => (
                    <div className="neoWs_card" key={neo.neo_reference_id}>
                        <h3>Name: {neo.name}</h3>
                        <p>Close Approach Date: <span>{neo.close_approach_data[0]?.close_approach_date}</span></p>
                        <p>Speed (km/h): <span>{neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour}</span></p>
                        <p>
                            Estimated Diameter (km):{" "}
                            <span>{neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3)} -{" "}</span>
                            <span>{neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)}</span>
                        </p>
                        <p>Potentially Hazardous: <span id={`hazardous-${neo.neo_reference_id}`} 
                            data-tooltip-content={neo.is_potentially_hazardous_asteroid ? 
                                `This asteroid is potentially hazardous with a less than 1% chance of close approach to Earth.` 
                                : "This asteroid is not potentially hazardous."}>
                            {neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}</span>
                        </p>
                        <Tooltip anchorId={`hazardous-${neo.neo_reference_id}`} place="bottom" effect="solid" />
                    </div>
                ))}
            </div>
            
            <button className="neoWs_button" onClick={handleNext}>Refresh data</button>
        </>
    )
}

export default NeoWs