import { MapContainer, Marker, Popup, TileLayer , useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {useState , useEffect} from "react";
import { useHotels } from "./HotelsProvider";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";

const HotelsMap = () => {

    const [mapCenter , setMapCenter] = useState([48.56 , 2.35]);
    const [searchParams , setSearchParams] = useSearchParams();
    const {isLoading , data} = useHotels();
    const {isLoading : loadingGeoLocation , location , error , getLocation} = useGeoLocation();


    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    useEffect(() => {
      if(lat && lng) setMapCenter([lat , lng]);
  
    } , [lat , lng])

    useEffect(() => {
      if(location?.lat && location?.lng){
        setMapCenter([location?.lat, location?.lng])
      }
    } , [location])
    

    if(isLoading) {
      return <p className="text-center mt-10">loading...</p>
    }
    return (  
      <div className="relative">    
    <MapContainer
        style={{ width: "100%", height: "100vh" , zIndex : 30}}
        zoom={13}
        center={mapCenter}
        scrollWheelZoom={false}
        fadeAnimation={true}
        markerZoomAnimation={true}
      >  
      <ChangeCenter position={mapCenter}/>
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> 
  {
    data.map(item => {
      return  <Marker key={item.id} position={[item.latitude , item.longitude]}>
      <Popup>
        {item.host_location}
      </Popup>
    </Marker>

    })
  }
  </MapContainer>
  <button onClick={getLocation} className="absolute bottom-0 left-0 z-50 text-white bg-violet-600 rounded-md m-3 px-1">
    {loadingGeoLocation ? "loading" : "use your location"}
  </button>
  </div>
    );
}
 
export default HotelsMap;


const ChangeCenter = ({position , maploc}) => {
  const map = useMap();
  map.setView(position);
  return null;
}