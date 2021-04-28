import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { MapContainer, MapContent } from './style';

const mapStyle = {
  map: {
    width: '100%',
    height: '100%',
  },
  mapConfig: [
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ],
};

const Map = () => {
  const [location, setLocation] = useState({
    latitude: -8.0548874,
    longitude: -34.8885838,
  });

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('A permissão de localização foi negada, por favor habilite-a.');
    } else {
      const position = await Location.getCurrentPositionAsync({});
      setLocation(position.coords);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <MapContainer>
        <MapContent>
          <MapView
            style={mapStyle.map}
            customMapStyle={mapStyle.mapConfig}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
            showsUserLocation
          />
        </MapContent>
      </MapContainer>
    </>
  );
};

export default Map;
