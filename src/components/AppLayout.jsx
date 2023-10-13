import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return ( 
        <section className="mt-5 grid grid-cols-12 justify-between">
            <article className="col-span-12 md:col-span-6 order-last md:order-first"><Outlet/></article>
            <article className="col-span-12 md:col-span-6 bg-blue-200 order-first md:order-last">map</article>
        </section>
    );
}
 
export default AppLayout;