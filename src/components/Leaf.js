import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import classes from './leaf.module.css'
//import Shapefile from './Shapefile'
//import Choropleth from 'react-leaflet-choropleth'
import Choro from "./Choro"
import { Image, Navbar } from 'react-bootstrap';
import Control from 'react-leaflet-control';
import Pop from "./smallComponents/Pop";
//import Location from './Location';
import MainMenu from './smallComponents/Accordion'
import Navigator from './smallComponents/Navigator';

//IMAGES
import loc from "../assets/target.png"
import info from "../assets/information.png"


//var L = require('leaflet')
//require('leaflet-choropleth')


const summary = `TaxiPal is built to help drivers understand what hotspots of activity exist at different hours of the day using industry trip data. The map below will display hot spots outlined in blue. The redder the spot the more active that area is. Zoom in to view the exact streets and check spots you might want to cruise in.`;

class Leaf extends Component {


  testingSmthSec = (x) => {
    this.props.testingSmth(x)
    console.log(x)

  }

  testingTimer = (x) => {
    this.props.testingTimerZero(x)
    console.log(x)
  }



  render() {

    return (
      <div>
        <div className='fixed-top' >
          <Navigator />
        </div>
        <div className='fixed-top' style={{ width: '90%' }}>
          <MainMenu 
            testingSmthSec={this.testingSmthSec} 
            testingTimer={this.testingTimer} 
            sliceGeo={this.props.sliceGeo}
            checked={this.props.checked}
            showAccordian={this.props.showAccordian}
          />
        </div>



        <Pop
          title={"Information"}
          summary={summary}
          showModal={this.props.showModal}
          toggleModal={this.props.toggleModal}
        />

        <Map
          ref={this.props.setRef}
          center={[this.props.viewPort.latitude, this.props.viewPort.longitude]}
          zoom={this.props.viewPort.zoom}
          className={classes.map}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/**GET CURRENT LOCATION */}
          <Control position='bottomright' >
            <button
              className={classes.loc}
            >
              <Image

                src={loc}
                width="40"
                height="40"
                onClick={this.props.getCurrentLocation}
              />
            </button>
          </Control>

          {/**TOGGLE TOP 5 CLOSEST SITES */}
          <Control position="bottomright" >
            <button
              className={classes.spots}
              onClick={() => this.setState({ bounds: [51.3, 0.7] })}
            >
              <Image
                src={info}
                width="40"
                height="40"
                onClick={this.props.toggleModal}
              />
            </button>
          </Control>

          <Choro
            geojson={this.props.geojson}
          />
        </Map>
      </div>
    );
  }
}

export default Leaf;

