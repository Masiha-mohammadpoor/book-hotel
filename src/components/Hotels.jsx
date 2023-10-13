import { useSearchParams , Link} from "react-router-dom";
import useFetch from "../hooks/useFetch";


const Hotels = () => {
    const [searchParams , setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const room = JSON.parse(searchParams.get("options")).room;

    const {isLoading , data} = useFetch("http://localhost:5000/hotels" , `q=${destination || ""}&&accommodates_gte=${room || 1}`);

    if(isLoading) return <p>loading...</p>
    return (
        <section className="flex flex-col">
            {data.map(item => {
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