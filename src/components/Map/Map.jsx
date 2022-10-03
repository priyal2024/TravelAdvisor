import React from "react";
import GoogleMapReact from "google-map-react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
// import mapStyles from "./mapStyles";

const Map = ({
  coordinates,
  setCoordinates,
  setBounds,
  places,
  setchildClick,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          // styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setchildClick(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lng={Number(place.longitude)}
            lat={Number(place.latitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  className={classes.typography}
                >
                  {place.name}
                </Typography>
                <img
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://images.pexels.com/photos/12281239/pexels-photo-12281239.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt={place.name}
                  className={classes.pointer}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
