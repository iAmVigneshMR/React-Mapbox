import React, { Component } from 'react';
// import { SearchConsumer } from '../App.js';
// import Icon from '../library/icons/Icon';

var map = ''
var dataLayer = ''
// const shapeFile = ""
export default class GoogleMapsShapFile extends Component {
    constructor(props) {
        super(props)
        this.onScriptLoad = this.onScriptLoad.bind(this)
    }
    onScriptLoad() {
        // CREATE YOUR GOOGLE MAPS
        map = new window.google.maps.Map(
            document.getElementById('map'),
            {
                // ADD OPTIONS LIKE STYLE, CENTER, GESTUREHANDLING, ...
                center: { lat: 50.5, lng: 4 },
                zoom: 8,
                gestureHandling: 'greedy',
                disableDefaultUI: true,
            });
    }
    dataHandler = (getJson) => {
        // FIRST I REMOVE THE CURRENT LAYER (IF THERE IS ONE)
        for (var i = 0; i < dataLayer.length; i++) {
            map.data.remove(dataLayer[i])
        }
        // THEN I FETCH MY JSON FILE, IN HERE I'M USING A PROP BECAUSE 
        // I WANT TO USE THIS DATAHANDLER MULTIPLE TIMES & DYNAMICALLY 
        // I CAN NOW DO SOMETHING LIKE THIS: 
        // onClick(this.dataHandler(www.anotherlinktojsonfile.com/yourjsonfile.json))
        // ON EACH BUTTON AND CHOOSE WHICH JSON FILE NEEDS TO BE FETCHED IN MY DATAHANDLER.
        fetch(getJson)
            .then(response => response.json())
            .then(featureCollection => {
                dataLayer = map.data.addGeoJson(featureCollection)
                // ADD SOME NEW STYLE IF YOU WANT TO
                map.data.setStyle({ strokeWeight: 0.5, fillOpacity: 0 });
            }
            );
        map.data.addListener('mouseover', (event) => {
            map.data.revertStyle();
            // ADD A STYLE WHEN YOU HOVER OVER A SPECIFIC POLYGON
            map.data.overrideStyle(event.feature, { strokeWeight: 1, fillOpacity: 0.1 });
            // IN CONSOLE LOG, YOU CAN SEE ALL THE DATA YOU CAN RETURN
            console.log(event.feature)
        });
        map.data.addListener('mouseout', (event) => {
            // REVERT THE STYLE TO HOW IT WAS WHEN YOU HOVER OUT
            map.data.revertStyle();
        });
    }
    componentDidMount() {
        // LOADING THE GOOGLE MAPS ITSELF
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAzo9Xzk5QwuAixqF8Kxdxp1zgMfL2DtKA&v=3.exp&libraries=geometry,drawing,places";
            // s.src = "https://maps.googleapis.com/maps/api/js?key=MYKEY&v=3.exp&libraries=geometry,drawing,places";
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            // Below is important. 
            //We cannot access google.maps until it's finished loading
            s.addEventListener('load', e => {
                this.onScriptLoad()
                // this.dataHandler("https://static.infragistics.com/xplatform/shapes/WorldCableRoutes.dbf")
                // this.dataHandler("/usstates.shp")
                // this.dataHandler('https://linktoyourjson.com/yourjsonfile.json')

            })
        } else {
            this.onScriptLoad()
        }
    }
    render() {
        return (
            <div id='mapContainer'>
                <div style={{ width: '100%', height: '100%' }} id='map' />
            </div>
        );
    }
};
