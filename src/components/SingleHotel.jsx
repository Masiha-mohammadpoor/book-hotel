import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const SingleHotel = () => {
    const {id} = useParams();
    const {isLoading , data} = useFetch(`http://localhost:5000/hotels/${id}`);

    if(isLoading){
        return <p>loading ...</p>
    }
    return (

    );
}
 
export default SingleHotel;