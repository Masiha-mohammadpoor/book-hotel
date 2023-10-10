import Header from "./components/Header";
import LocationList from "./components/LocationList";
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Header/>
      <Toaster/>
      <LocationList/>
    </>
  )
}

export default App;

