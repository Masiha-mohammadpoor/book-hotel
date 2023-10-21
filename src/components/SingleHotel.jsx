import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHotels } from "./HotelsProvider";

const SingleHotel = () => {
    const {id} = useParams();
    const {currentHotel , getData , isLoadingCurrentHotel} = useHotels();

    useEffect(() => {
        getData(id)
    } , [id])

    if(isLoadingCurrentHotel || !currentHotel){
        return <p>loading ...</p>
    }
    return (
        <div>
            <p>{currentHotel.name}</p>
            <p>{currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}</p>
            <img className="rounded-md w-96 h-72 mt-6 object-cover" src={currentHotel.picture_url.url} alt={currentHotel.name} />
        </div>
    );
}
 
export default SingleHotel;