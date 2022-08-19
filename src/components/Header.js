import React from "react";
import { Link } from "react-router-dom";



function Header() {
    return (
        <nav class="bg-gray-800 py-2 md:py-4">
            <div class="container px-4 mx-auto md:flex md:items-center">

                <div class="flex justify-between items-center">
                    <a href="#" class="font-bold text-xl text-indigo-600"><Link to="/">Weather Tracker</Link></a>
                    <button class="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>

                <div class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                    <span class="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                        <Link to="/">Weather</Link>
                    </span>
                    <span class="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                        <Link to="/todo-app">ToDo List</Link>
                    </span>
                    {/* <span class="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                        <Link to="/satellite">Satellite</Link>
                    </span> */}
                    <span class="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                        <Link to="/news">News</Link>
                    </span>
                </div>
            </div>
        </nav>

    )
}

export default Header
