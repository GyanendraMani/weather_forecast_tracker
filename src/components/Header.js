import React from "react";
import { Link } from "react-router-dom";



function Header() {
    return (
        <ul className="flex ml-auto w-full font-bold">
            <li className="text-xs text-gray-800 ml-auto mr-6 border-b-2 hover:border-green-400 cursor-pointer">
                <Link to="/weather">Weather</Link></li>
            {/* <li className="text-xs text-gray-800 mr-6 alert-notice cursor-pointer border-b-2 hover:border-green-400">
                <Link to="/weather">Alerts</Link> </li> */}
            <li className="text-xs text-gray-800 mr-6 cursor-pointer border-b-2 hover:border-green-400">
                <Link to="/map">Map</Link></li>
            <li className="text-xs text-gray-800 mr-6 cursor-pointer border-b-2 hover:border-green-400">
                <Link to="/satellite">Satellite</Link></li>
            {/* <li className="text-xs text-gray-800 cursor-pointer border-b-2 hover:border-green-400">
                <Link to="/weather">News</Link></li> */}
        </ul>
    )
}

export default Header
