import React from 'react';

const LocationSearchPanel = (props) => {
    const location = [
        "B24, Birthlands School Vaishali Nagar, Jaipur",
        "DAV Centenary Public School, Jaipur",
        "DPS, Jaipur",
        "St. Xavier's School, Jaipur"
    ];

    return (
        <div>
            {/* This is just a sample data */}
            {
                location.map((elem, index) => (
                    <div
                        key={index} // Add a unique key to each element
                        onClick={() => {
                            props.setVehiclePanel(true); // Correctly access props
                            props.setPanelOpen(false);  // Correctly access props
                        }}
                        className="flex gap-4 border-2 p-3 rounded-xl border-gray-100 active:border-black items-center my-2 justify-start"
                    >
                        <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <h4 className="font-medium">{elem}</h4>
                    </div>
                ))
            }
        </div>
    );
};

export default LocationSearchPanel;
