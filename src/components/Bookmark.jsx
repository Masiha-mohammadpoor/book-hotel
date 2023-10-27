import { useBookmark } from "./BookmarkProvider";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import {FaTrashAlt} from "react-icons/fa";

const Bookmark = () => {
    const {isLoading , bookmarks , deleteData} = useBookmark();

    const deleteHandler = (e ,id) => {        
        e.preventDefault();
        deleteData(id)
    }

    if(isLoading || !bookmarks) return <p className="text-center">loading...</p>
    return (  
        <>
        <h1 className="text-xl font-bold">Bookmark List</h1>
        <div className="mt-3">
            {bookmarks.map(item => {
                return <Link key={item.id} to={`/bookmark/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                <div className="flex bg-slate-200 mb-2 p-2 justify-between items-center rounded-md w-80">
                    <div className="flex">
                    <ReactCountryFlag svg countryCode={item.countryCode} style={{fontSize:"40px" , marginRight : "20px"}}/>
                    <div>
                        <p>{item.country}</p>
                        <p className="text-gray-600 text-sm">{item.cityName}</p>
                    </div>
                    </div>
                    <button onClick={(e) => deleteHandler(e , item.id)}><FaTrashAlt color="#ff0000"/></button>
                </div>
                </Link> 
            })}
        </div>
        </>
    );
}
 
export default Bookmark;