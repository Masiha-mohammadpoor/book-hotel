import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {useState} from "react";
import { useHotels } from "./HotelsProvider";

const HotelsMap = () => {

    const [mapCenter , setMapCenter] = useState([48.56 , 2.35]);
    const {isLoading , data} = useHotels();

    if(isLoading) {
      return <p className="text-center mt-10">loading...</p>
    }
    return (  
      <div>      
<MapContainer
        style={{ width: "100%", height: "100vh" }}
        zoom={5}
        center={mapCenter}
        scrollWheelZoom={false}
        fadeAnimation={true}
        markerZoomAnimation={true}
      >    <TileLayer
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
  </div>
    );
}
 
export default HotelsMap;