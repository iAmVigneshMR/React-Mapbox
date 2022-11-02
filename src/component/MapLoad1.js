//normal example

import React from 'react'
import { useRef, useState } from 'react';
import MapGL, { FullscreenControl, Layer, Marker, NavigationControl, Popup, Source } from "react-map-gl";

const MapLoad1 = () => { 
    // let lat = 54.10751886243414, lon = -4.661185805725468;
    let lat = 12.970730, lon = 77.587831;
    var radius = 5;
    var center = [lon, lat];
    var options = { steps: 50, units: "kilometers", properties: { foo: "bar" } };
    // var circle = turf.circle(center, radius, options);

    const mapRef = useRef(null);
    const mapboxApiAccessToken = 'pk.eyJ1Ijoic2hlbmJvMTgiLCJhIjoiY2pncHFiczlxMDI1dTMzbnlyM2huM2RlZCJ9.wQqICm-SqQi40dy2NtCYQg';
    const differentStyles = [
        "mapbox://styles/mapbox/streets-v11",
        "mapbox://styles/mapbox/outdoors-v11",
        "mapbox://styles/mapbox/light-v10",
        "mapbox://styles/mapbox/dark-v10",
        "mapbox://styles/mapbox/satellite-v9",
        "mapbox://styles/mapbox/satellite-streets-v11",
        "mapbox://styles/mapbox/navigation-day-v1",
        "mapbox://styles/mapbox/navigation-night-v1"
    ]
    const [viewport, setViewport] = useState({
        width: "100%",
        height: 650,
        latitude: lat,
        longitude: lon,
        zoom: 5,
        pitch: 0,
        bearing: 0
    });

    return (
        <div className="App">
            <MapGL
                ref={mapRef}
                {...viewport}
                // transitionDuration={300}
                mapboxApiAccessToken={mapboxApiAccessToken}
                mapStyle={differentStyles[2]}
                onClick={(e, v) =>
                    console.log(
                        e.features.forEach((feature) => {
                            console.log(feature.layer.id.split("-")[1], e.lngLat);
                        })
                    )
                }
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
            >
                <NavigationControl showCompass={false} />
            </MapGL>
        </div>
    );

}

export default MapLoad1