import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"
import NeoWs from "./components/NeoWs"

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
        { data ? (<Main data={data}/>) : (
          <div className="loadingState">
            <i className="fa-solid fa-gear"></i>
          </div>
        )}
        {showModal && (
            <SideBar data={data} handleToggleModal={handleToggleModal}/>
        )}
        {data && (
          <Footer data={data} handleToggleModal={handleToggleModal} />
        )}
      </section>
      <section className="section_NeoWs">
        <NeoWs/>
      </section>
    </>
  )
}

export default App
