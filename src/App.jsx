import { useEffect, useState } from "react"
import TitleAPOD from "./components/TitleAPOD"
import APOD from "./components/APOD"
import SideBarAPOD from "./components/SideBarAPOD"
import NeoWs from "./components/NeoWs"
import EPIC from "./components/EPIC"

function App() {
  const [data, setData] = useState(null)
  // const [loading, setLoading] = useState(false)
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

      if(localData) {
        try{
          const apiData = JSON.parse(localData)
          setData(apiData)
          console.log("Fetched from cache today")
          return;
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
      } catch(err) {
         console.log(err.message)
      }
    }
    fetchAPIData()
  }, [])

  return (
    <>
      <section className="section_APOD">
        {data && (
          <TitleAPOD data={data} handleToggleModal={handleToggleModal} />
        )}
        { data ? (<APOD data={data}/>) : (
          <div className="loadingState">
            <i className="fa-solid fa-gear"></i>
          </div>
        )}
        {showModal && (
            <SideBarAPOD data={data} handleToggleModal={handleToggleModal}/>
        )}
      </section>
      <section className="section_NeoWs">
        <NeoWs/>
      </section>
      <section className="section_EPIC">
        <EPIC />
      </section>
    </>
  )
}

export default App
