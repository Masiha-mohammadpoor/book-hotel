import { MdLocationOn, MdOutlineCalendarMonth, MdOutlineSearch } from "react-icons/md";
import {FaPlus , FaMinus} from "react-icons/fa";
import { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import {format} from "date-fns";
import { useNavigate , createSearchParams} from "react-router-dom";


const Header = () => {


    const [isOpenOption , setIsOpenOption] = useState(false);
    const [isOpenDate , setIsOpenDate] = useState(false);
    const [destination , setDestination] = useState("");
    const [date , setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }])
    const [options , setOptions] = useState({
        adult : 1,
        children : 0,
        room : 1
    })

    const navigate = useNavigate();

    const handleOptions = (type , operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [type] : operation === "inc" ? options[type] + 1 : options[type] - 1
            }
        })
    }


    const handleSearch = () => {
        const encodedParams = createSearchParams({
            date : JSON.stringify(date),
            destination,
            options : JSON.stringify(options)
        })

        navigate({
            pathname : "/hotels",
            search : encodedParams.toString()
        })
    }


    return (
        <header className="p-2 rounded-md ring-1 ring-gray-300 grid grid-cols-12">
            <div className="flex flex-col md:flex-row justify-start items-start md:justify-around mb-4 md:mb-2 mt-2 col-span-12 md:col-span-6">
                <div className="flex items-center mb-3 md:mb-0">
                    <MdLocationOn color="#ff0000" size="20"/>
                    <input value={destination} onChange={e => setDestination(e.target.value)} type="text" placeholder="where to go ?" className="w-36 md:w-56 pl-2"/>
                </div>
                <div className="flex items-center relative">
                    <div onClick={() => setIsOpenDate(prev => !prev)}  className="cursor-pointer flex text-sm">
                    <MdOutlineCalendarMonth color="#700be3" size="20"/>
                    <p>{`${format(date[0].startDate , "MM/dd/yyyy")} to ${format(date[0].endDate , "MM/dd/yyyy")}`}</p>
                    </div>
                    <div className={`${isOpenDate ? "block" : "hidden"} absolute top-7 -left-12`}>
                    <DateRange
                        ranges={date}
                        onChange={(item) => setDate([item.selection])}
                        minDate={new Date()}
                        moveRangeOnFirstSelection={true}
                        className="bg-slate-300 rounded-b-md scale-75"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between md:justify-around items-center col-span-12 md:col-span-6">
                <div>
                    <div className="relative">
                    <p className="text-xs font-bold cursor-pointer" onClick={() => setIsOpenOption(prev => !prev)}> {options.adult} adult &bull; {options.children} children &bull; {options.room} room</p>
                        <div className={`${isOpenOption ? "block" : "hidden"} absolute bg-slate-300 -right-16 md:right-24 top-6 w-52 p-2 rounded-md`}>
                            <ReserveOption handleOptions={handleOptions} type="adult" options={options} minLimit={1}/>
                            <ReserveOption handleOptions={handleOptions} type="children"  options={options} minLimit={0}/>
                            <ReserveOption handleOptions={handleOptions} type="room"  options={options} minLimit={1}/>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <button onClick={handleSearch} className="p-2 text-center rounded-md bg-violet-600 text-white text-lg"><MdOutlineSearch /></button>
                </div>
            </div>
        </header>
    );
}

export default Header;



const ReserveOption = ({type, options , minLimit , handleOptions}) => {
    return (
        <div className="w-full flex justify-between mt-2">
            <p>{type}</p>
            <div className="w-24 flex justify-between items-center">
                <button onClick={() => handleOptions(type , "dec")} className="p-2 rounded-md bg-slate-400" disabled={options[type] <= minLimit}><FaMinus/></button>
                <span>{options[type]}</span>
                <button onClick={() => handleOptions(type , "inc")} className="p-2 rounded-md bg-slate-400"><FaPlus/></button>
            </div>
        </div>
    );
}
