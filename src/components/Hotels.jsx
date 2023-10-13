import {Link} from "react-router-dom";
import { useHotels } from "./HotelsProvider";



const Hotels = () => {

    const {isLoading , hotels} = useHotels();

    if(isLoading) return <p>loading...</p>
    return (
        <section className="flex flex-col">
            {hotels.map(item => {
                return <Link to={`hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                    <div className="flex mb-3">
                        <div className="mr-2">
                            <img className="rounded-md w-20 h-20 object-cover" src={item.picture_url.url} alt={item.name} />
                        </div>
                        <div className="py-2 flex flex-col justify-between">
                            <p className="text-sm font-bold">{item.smart_location}</p>
                            <p className="text-xs text-gray-500">{item.name}</p>
                            <p><span className="font-bold">€&nbsp;{item.price}&nbsp;</span> <span className="text-sm text-gray-500">night</span></p>
                        </div>
                    </div>
                </Link>
            })}
        </section>
    );
}
 
export default Hotels;