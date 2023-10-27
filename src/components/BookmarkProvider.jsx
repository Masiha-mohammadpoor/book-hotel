import {useContext , createContext , useState , useEffect} from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";



const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks"


const BookmarkProvider = ({children}) => {
    const [currentBookmark , setCurrentBookmark] = useState(null);
    const [isLoading , setIsLoading] = useState(false);
    const [bookmarks , setBookmarks] = useState(null);

    useEffect(() => {
        const getAllData = async () => {
            setIsLoading(true);
            try{
                const {data} = await axios.get(BASE_URL);
                setBookmarks(data);
            }catch(err){
                toast.error(err.message);
            }finally {
                setIsLoading(false)
            }
        }
        getAllData();
    }, [])


    const getData = async (id) => {
        setIsLoading(true);
        try{
            const {data} = await axios.get(`${BASE_URL}/${id}`);
            setCurrentBookmark(data);
        }catch(err){
            toast.error(err.message);
        }finally {
            setIsLoading(false)
        }
    }

    const postData = async (newObject) => {
        setIsLoading(true);
        try{
            const {data} = await axios.post(BASE_URL , newObject);
            setCurrentBookmark(data);
            setBookmarks(prev => [...prev , data])
        }catch(err){
            toast.error(err.message);
        }finally {
            setIsLoading(false)
        }
    }



    return (
        <BookmarkContext.Provider value={{isLoading , bookmarks , currentBookmark , getData , postData }}>
            {children}
        </BookmarkContext.Provider>
    );
}
 
export default BookmarkProvider;

export const useBookmark = () => useContext(BookmarkContext);