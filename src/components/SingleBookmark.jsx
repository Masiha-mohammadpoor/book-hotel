import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBookmark } from "./BookmarkProvider";
import ReactCountryFlag from "react-country-flag";

const SingleBookmark = () => {
    const { id } = useParams();
    const { currentBookmark, getData, isLoadingCurrentBookmark } = useBookmark();


    useEffect(() => {
        getData(id)
    }, [id])

    if (isLoadingCurrentBookmark || !currentBookmark) {
        return <p>loading ...</p>
    }

    return (
        <>
            <button></button>
            <div className="bg-slate-200 flex justify-start items-center w-80 rounded-md p-2">
                <ReactCountryFlag svg countryCode={currentBookmark.countryCode} style={{fontSize : "60px"}}/>
                <div className="ml-4">
                <p>{currentBookmark.country}</p>
                <p className="text-gray-600 text-sm">{currentBookmark.cityName}</p>
                </div>
            </div>
        </>
    );
}

export default SingleBookmark;