import { useState, useEffect, useCallback } from "react";
import EpicSlider from './EpicSlider';
import RandomFact from "./RandomFact";

export default function EPIC() {
    const [epicData, setEpicData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchEpicData = useCallback(async () => {
        setLoading(true)
        setError(null)
        const NASA_KEY = import.meta.env.VITE_NASA_API_KEY

        for (let i = 0; i < 5; i++) {
            const date = new Date()
            date.setDate(date.getDate() - i)
            const formattedDate = date.toISOString().split('T')[0]
            const url = `https://api.nasa.gov/EPIC/api/natural/date/${formattedDate}?api_key=${NASA_KEY}`

            try {
                const res = await fetch(url)
                const data = await res.json()

                if (data.length > 0) {
                    setEpicData(data);
                    setLoading(false);
                    return;
                }
            } catch (err) {
                setError(err.message)
            }
        }

        setLoading(false)
        setError('No images available for the past 5 days')
    }, [])



    useEffect(() => {
        fetchEpicData()
    }, [fetchEpicData])

    if (loading) {
        return <div>Loading..</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <>
            <div className="epic_title">
                <h2>EPIC(Earth Polychromatic Imaging Camera) Images</h2>
                <h1 id="title-facts">And a few more useless facts</h1>
            </div>
                
            <div className="epic_container">
                <div className="epic_info">
                    <RandomFact/>
                </div>
                <EpicSlider images={epicData} />
            </div>
        </>
    )
}