import { Outlet } from "react-router-dom";
import HotelsMap from "./HotelsMap";
import { useHotels } from "./HotelsProvider";


const AppLayout = () => {

    const {data} = useHotels();

    return ( 
        <section className="mt-5 grid grid-cols-12 justify-between">
            <article className="col-span-12 md:col-span-6 order-last md:order-first"><Outlet/></article>
            <article className="h-screen col-span-12 md:col-span-6 order-first md:order-last overflow-hidden overflow-y-scoll">
                <HotelsMap markerLocations={data}/>
            </article>
        </section>
    );
}
 
export default AppLayout;