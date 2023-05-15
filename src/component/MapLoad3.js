// using with shapefile 

import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import axios from 'axios';
import MapGL, { FullscreenControl, Layer, Marker, NavigationControl, Popup, Source } from "react-map-gl";

const MapLoad3 = () => {
    let lon = -122.447303, lat = 37.753574;
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
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setTimeout(() => {

            DriveTime()
        }, 5000);
    }, [viewport])


    const DriveTime = (() => {
        // console.log(mapRef)
        const mapDrive = mapRef.mapboxgl({
            container: "mapWrapper",
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [-73.985664, 40.748514],
            zoom: 12
        });
        mapDrive.addControl(
            mapRef.MapboxDirections({
                accessToken: mapboxApiAccessToken
            }),
            'top-left'
        );
    })

    useEffect(() => {
        // console.log(e)
        const delayDebounceFn = setTimeout(() => {
            let search_text = searchTerm.trim().toLowerCase();
            let mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(search_text)}.json?country=us&access_token=${mapboxApiAccessToken}`;
            axios.get(mapboxUrl)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }, 3000)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])


    return (
        <div className="App">
            <input type='text' onChange={(e) => setSearchTerm(e.target.value)} />
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
                <div id="mapWrapper"></div>
                <NavigationControl showCompass={false} />
                <Source
                    id='terrain-data'
                    type='vector'
                    url='mapbox://mapbox.mapbox-terrain-v2'
                >
                    <Layer
                        id='terrain-data'
                        type='line'
                        source='mapbox-terrain'
                        source-layer='contour'
                        layout={{
                            'line-join': 'round',
                            'line-cap': 'round'
                        }}
                        paint={{
                            'line-color': '#ff69b4',
                            'line-width': 1
                        }}
                    />
                </Source>
            </MapGL>
        </div>
    );

}

export default MapLoad3