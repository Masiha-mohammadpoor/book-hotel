import {useContext , createContext , useState} from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";



const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks"


const BookmarkProvider = ({children}) => {
    const [currentBookmark , setCurrentBookmark] = useState(null);
    const [isLoadingCurrentBookmark , setIsLoadingCurrentBookmark] = useState(false);

    const {isLoading , data} = useFetch(BASE_URL);


    const getData = async (id) => {
        setIsLoadingCurrentBookmark(true);
        try{
            const {data} = await axios.get(`${BASE_URL}/${id}`);
            setCurrentBookmark(data);
            setIsLoadingCurrentBookmark(false);
        }catch(err){
            toast.error(err.message);
            setIsLoadingCurrentBookmark(false)
        }
    }


    return (
        <BookmarkContext.Provider value={{isLoading , data , currentBookmark , getData , isLoadingCurrentBookmark}}>
            {children}
        </BookmarkContext.Provider>
    );
}
 
export default BookmarkProvider;

export const useBookmark = () => useContext(BookmarkContext);