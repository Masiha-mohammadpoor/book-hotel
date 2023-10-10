import useFetch from "../hooks/useFetch";


const LocationList = () => {

    const {data , isLoading} = useFetch("http://localhost:5000/hotels");

    if(isLoading) {
        return <p>Loading ...</p>
    }
    return (
        <section className="grid grid-cols-12 mt-7 justify-center gap-x-4">
            {
                data.map(item => {
                    
                    return <article key={item.id} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xs:col-span-6  mb-5 bg-slate-200 rounded-md">
                        <div className="h-52">
                            <img className="w-full h-full rounded-md object-cover" src={item.picture_url.url} alt={item.name} />
                        </div>
                        <div className="mt-5 p-3">
                            <p className="font-bold">{item.smart_location}</p>
                            <p className="text-sm text-gray-600">{item.name}</p>
                            <p>
                                <span className="font-bold">€&nbsp;{item.price}&nbsp;</span>
                                <span className="text-xs text-gray-500">night</span>
                            </p>
                        </div>
                    </article>
                })
            }
        </section>
    );
}
 
export default LocationList;