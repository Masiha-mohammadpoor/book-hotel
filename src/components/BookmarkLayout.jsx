import { Outlet } from "react-router-dom";
import HotelsMap from "./HotelsMap";
import { useBookmark } from "./BookmarkProvider";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";


const BookmarkLayout = () => {

    const {currentBookmark , isLoadingCurrentBookmark} = useBookmark();
    const [mapLocation , setMapLocation] = useState([{latitude : 48.56 ,longitude :  2.35}]);
    const {id} = useParams();


    useEffect(() => {
        if(currentBookmark && id) {
            setMapLocation([{...currentBookmark}])
        }else{
            setMapLocation([{
                latitude : 48.56,
                longitude : 2.35
            }])

        }
    },[currentBookmark , isLoadingCurrentBookmark , id])


    return (
        <section className="mt-5 grid grid-cols-12 justify-between">
        <article className="col-span-12 md:col-span-6 order-last md:order-first">
            <Outlet/>
        </article>
        <article className="h-screen col-span-12 md:col-span-6 order-first md:order-last overflow-hidden overflow-y-scoll">
            <HotelsMap markerLocations={mapLocation}/>
        </article>
        </section>
    );
}
 
export default BookmarkLayout;