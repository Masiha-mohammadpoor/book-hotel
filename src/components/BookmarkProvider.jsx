import {useContext , createContext , useReducer , useEffect} from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";



const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";

const initialState = {
    currentBookmark : null,
    isLoading : false,
    bookmarks : null
}

const bookmarkReducer = (state , action) => {
    switch(action.type) {
        case "loading":
            return {
                ...state,
                isLoading : true
            }
        case "bookmarks/loaded":
            return {
                ...state,
                bookmarks : action.payload,
                isLoading : false
            }
        case "bookmark/loaded":
            return {
                ...state ,
                currentBookmark : action.payload,
                isLoading : false
            }
        case "bookmark/created": 
            // state.bookmarks = [...state.bookmarks , action.payload]
            return {
                ...state,
                isLoading : false,
                currentBookmark : action.payload,
                bookmarks : [...state.bookmarks , action.payload]
            }
        case "bookmark/deleted": {
            const id = action.payload;
            const filteredBookmarks = state.bookmarks.filter(item => item.id !== id);
            return {
                ...state,
                bookmarks : filteredBookmarks
            }
        }
        case "rejected":
        default : throw new Error("unknown action!!!")
    }
}


const BookmarkProvider = ({children}) => {
    // const [currentBookmark , setCurrentBookmark] = useState(null);
    // const [isLoading , setIsLoading] = useState(false);
    // const [bookmarks , setBookmarks] = useState(null);

    const [{currentBookmark , isLoading , bookmarks} , dispatch] = useReducer(bookmarkReducer , initialState);

    useEffect(() => {
        const getAllData = async () => {
            dispatch({type : "loading"});
            try{
                const {data} = await axios.get(BASE_URL);
                dispatch({type : "bookmarks/loaded" , payload : data})
            }catch(err){
                toast.error(err.message);
            }
        }
        getAllData();
    }, [])


    const getData = async (id) => {
        dispatch({type : "loading"})
        try{
            const {data} = await axios.get(`${BASE_URL}/${id}`);
            dispatch({type : "bookmark/loaded" , payload : data})
        }catch(err){
            toast.error(err.message);
        }
    }

    const deleteData = async (id) => {
        try{
            const {data} = await axios.delete(`${BASE_URL}/${id}`);
            dispatch({type:"bookmark/deleted" , payload : id})
        }catch(err){
            toast.error(err.message);
        }
    }

    const postData = async (newObject) => {
        dispatch({type : "loading"})
        try{
            const {data} = await axios.post(BASE_URL , newObject);
            dispatch({type : "bookmark/created" , payload : data})
        }catch(err){
            toast.error(err.message);
        }
    }



    return (
        <BookmarkContext.Provider value={{isLoading , bookmarks , currentBookmark , getData , postData , deleteData}}>
            {children}
        </BookmarkContext.Provider>
    );
}
 
export default BookmarkProvider;

export const useBookmark = () => useContext(BookmarkContext);