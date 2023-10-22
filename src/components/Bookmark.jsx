import { useBookmark } from "./BookmarkProvider";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";


const Bookmark = () => {
    const {isLoading , data} = useBookmark();
    

    if(isLoading) return <p className="text-center">loading...</p>
    return (  
        <>
        <h1 className="text-xl font-bold">Bookmark List</h1>
        <div className="mt-3">
            {data.map(item => {
                return <Link key={item.id} to={`/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                <div className="flex bg-slate-200 mb-2 p-2 justify-start items-center rounded-md w-80">
                    <ReactCountryFlag svg countryCode={item.countryCode} style={{fontSize:"40px" , marginRight : "20px"}}/>
                    <div>
                        <p>{item.country}</p>
                        <p className="text-gray-600 text-sm">{item.cityName}</p>
                    </div>
                </div>
                </Link> 
            })}
        </div>
        </>
    );
}
 
export default Bookmark;