import {useContext , createContext } from "react";
import { useSearchParams , useLocation} from "react-router-dom";
import useFetch from "../hooks/useFetch";

const HotelContext = createContext();


const HotelsProvider = ({children}) => {

    const [searchParams , setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const room = JSON.parse(searchParams.get("options"))?.room;

    const {isLoading , data} = useFetch("http://localhost:5000/hotels" , `q=${destination || ""}&accommodates_gte=${room || 1}`);

    return (
        <HotelContext.Provider value={{isLoading , data}}>
            {children}
        </HotelContext.Provider>
    );
}
 
export default HotelsProvider;

export const useHotels = () => useContext(HotelContext);