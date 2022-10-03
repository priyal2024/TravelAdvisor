import { useEffect, useState } from "react";
import { Header, List, Map } from "./components/index";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { getPlacesData } from "./api/index";

function App() {
  const [placesData, setPlacesData] = useState([]);
  const [coords, setCoordinates] = useState();
  const [bounds, setBounds] = useState(null);
  const [childClick, setchildClick] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState("");
  const [type, setType] = useState("restaurants");
  const [filteredPlaces, setFilteredPlaces] = useState([]);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({
        lat: latitude, lng: longitude
      });
    });
  }, []);

  useEffect(() => {
    const filteredPlace = placesData?.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlace);
  }, [rating, placesData]);


  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlacesData(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      }).catch((error) => {
        <Alert severity="error">{error.data}!</Alert>
      });
    }
  }, [type, bounds]);



  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length ? filteredPlaces : placesData} childClick={childClick} isLoading={isLoading} rating={rating} setRating={setRating} type={type} setType={setType} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coords} places={filteredPlaces.length ? filteredPlaces : placesData} setchildClick={setchildClick} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
