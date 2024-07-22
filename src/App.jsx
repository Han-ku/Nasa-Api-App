import APOD from "./components/APOD"
import NeoWs from "./components/NeoWs"
import EPIC from "./components/EPIC"

function App() {

  return (
    <>
      <section className="section_APOD">
        <APOD />
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
