import React from "react";
import DetailCard from "./DetailCard";
import SummaryCard from "./SummaryCard";


const Weather = ({ weatherIcon, weatherData, noData, city, REACT_APP_ICON_URL }) => {

    return (
        <div className="flex flex-col my-10">
            {/* card jsx  */}
            {weatherData.length === 0 ?
                <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                    <h1 className="text-gray-300 text-4xl font-bold uppercase">{noData}</h1>
                </div> :
                <>
                    <h1 className="text-5xl text-gray-800 mt-auto mb-4">Today</h1>
                    <DetailCard weather_icon={weatherIcon} data={weatherData} />
                    <h1 className="text-3xl text-gray-600 mb-4 mt-10">More On {city}</h1>
                    <ul className="grid grid-cols-2  gap-2">
                        {weatherData.list.map((days, index) => {
                            if (index > 0) {
                                return (
                                    <SummaryCard key={index} day={days} REACT_APP_ICON_URL={REACT_APP_ICON_URL} />
                                )
                            }
                            return <></>
                        })}
                    </ul>
                </>
            }
        </div>
    )
}

export default Weather