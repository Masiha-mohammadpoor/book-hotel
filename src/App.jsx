import AppLayout from "./components/AppLayout";
import Header from "./components/Header";
import Hotels from "./components/Hotels";
import LocationList from "./components/LocationList";
import { Toaster } from 'react-hot-toast'
import { Routes , Route } from "react-router-dom";
import HotelsProvider from "./components/HotelsProvider";
import SingleHotel from "./components/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout";
import BookmarkProvider from "./components/BookmarkProvider"
import Bookmark from "./components/Bookmark";


const App = () => {
  return (
    <>
    <BookmarkProvider>
      <HotelsProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<LocationList/>}/>
        <Route path="hotels" element={<AppLayout/>}>
          <Route index element={<Hotels/>}/>
          <Route path=":id" element={<SingleHotel/>}/>
        </Route>
        <Route path="/bookmark" element={<BookmarkLayout/>}>
          <Route index element={<Bookmark/>}/>
          <Route path=":id" element={<div>single bookmark</div>}/>
          <Route path="add" element={<div>add bookmark</div>}/>
        </Route>
      </Routes>
      </HotelsProvider>
      </BookmarkProvider>
      <Toaster/>
      </>
  )
}

export default App;

