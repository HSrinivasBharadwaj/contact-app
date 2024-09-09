
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Country } from '../types/types';

L.Icon.Default.mergeOptions({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const getMapsData = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>("https://disease.sh/v3/covid-19/countries")
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    }
    else {
      throw new Error("Un unexpected error occured")
    }
  }
}

const Map:React.FC = () => {
  const {data,isLoading,error} = useQuery<Country[]>({
    queryKey: ["Maps Data"],
    queryFn: getMapsData
  })
  if (isLoading) {
    return <p className="text-2xl font-bold">Loading...</p>;
  }
  if (error) {
    return (
      <div className="text-center text-red-500">
        Error fetching data: {error.message}
      </div>
    );
  }

  console.log("data",data)
  return (
    <div>
      <h2 className="text-xl font-bold">Country wise Covid 19 cases</h2>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {data && data.map((country) => (
          <Marker
            key={country.countryInfo._id}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <strong>{country.country}</strong><br />
              Active Cases: {country.active}<br />
              Recovered Cases: {country.recovered}<br />
              Deaths: {country.deaths}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map




