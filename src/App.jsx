import AppLayout from "./components/AppLayout";
import Header from "./components/Header";
import Hotels from "./components/Hotels";
import LocationList from "./components/LocationList";
import { Toaster } from 'react-hot-toast'
import { Routes , Route } from "react-router-dom";



const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<LocationList/>}/>
        <Route path="/hotels" element={<AppLayout/>}>
          <Route index element={<Hotels/>}/>
          <Route path=":id" element={<div>single</div>}/>
        </Route>
      </Routes>
      <Toaster/>

    </>
  )
}

export default App;

