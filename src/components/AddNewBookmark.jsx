import { useNavigate } from "react-router-dom";
import useUrlLocation from "../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";
import toast from "react-hot-toast";
import { useBookmark } from "./BookmarkProvider";


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const AddNewBookmark = () => {

    const { lat, lng } = useUrlLocation();
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState("");
    const [geocodingError, setGeocodingError] = useState("");
    const navigate = useNavigate();
    const {postData} = useBookmark()

    const backButtonHandler = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (!lat || !lng) return;

        const getData = async () => {
            setIsLoadingGeocoding(true);
            setGeocodingError(null);
            try {
                const { data } = await axios.get(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                console.log(data)

                if (!data.countryCode) throw new Error("this location is not a city !!!");
                setCity(data.city || data.locality || "");
                setCountry(data.countryName);
                setCountryCode(data.countryCode)
            } catch (err) {
                setGeocodingError(err.message);
            } finally {
                setIsLoadingGeocoding(false);
            }
        }
        getData()
    }, [lat, lng])

    const submitHandler = async (e) => {
        e.preventDefault();
        if(!country || !city) toast.error("please enter city and country name!!!");

        const newBookmark = {
            cityName: city,
            country,
            countryCode: countryCode,
            latitude: lat,
            longitude: lng,
            host_location: `${city} - ${country}`
        }

        await postData(newBookmark);
        navigate("/bookmark");
    }

    if(isLoadingGeocoding) return <p>loading...</p>
    if(geocodingError) return <p>{geocodingError}</p>
    return (
        <div>
            <h2 className="text-xl font-bold mb-8">Add new Bookmark</h2>
            <form className="flex flex-col">
                <label htmlFor="city" className="pl-1 mb-2">city Name :</label>
                <input value={city} onChange={e => setCity(e.target.value)} type="text" id="city" className="bg-slate-200 w-96 p-2 rounded-lg mb-5" />
                <label htmlFor="country" className="pl-1 mb-2">country :</label>
                <div className="flex justify-between items-center bg-slate-200 w-96 p-2 rounded-lg mb-5">
                    <input value={country} onChange={e => setCountry(e.target.value)} type="text" id="country" className="w-80 bg-transparent" />
                    <ReactCountryFlag svg countryCode={countryCode} style={{fontSize:"20px"}}/>
                </div>
                <div className="w-80 flex justify-between items-center mt-6">
                    <button className="p-2 rounded-md bg-slate-500 text-white" onClick={() => navigate("/bookmark")}>&larr; Back</button>
                    <button className="p-2 rounded-md bg-blue-500 text-white" onClick={submitHandler}>Add Bookmark</button>
                </div>
            </form>
        </div>
    );
}

export default AddNewBookmark;