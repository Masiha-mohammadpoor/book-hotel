import { useState } from "react";

const useGeoLocation = () => {
    const [location , setLocation] = useState({});
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState(null);

    const getLocation = () => {
        setIsLoading(true)
        if(!navigator.geolocation){
            return setError("your browser dose not support geoLocation!!!")
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({
                    lat : pos.coords.latitude,
                    lng : pos.coords.longitude
                })
                setIsLoading(false)
            },
            (err) => {
                setError(err.message)
                setIsLoading(false)
            }
        )
    }

    return {
        isLoading,
        location,
        error,
        getLocation
    }
}
 
export default useGeoLocation;