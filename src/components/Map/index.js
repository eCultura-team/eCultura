import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { MapContainer, MapContent } from './style';
import loading from '../../assets/loading.gif';

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
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
    setInterval(() => {
      getLocation();
    }, 4000);
  }, []);

  return (
    <>
      <MapContainer>
        <MapContent>
          {isLoading ? (
            <Image source={loading} />
          ) : (
            <MapView
              style={mapStyle.map}
              customMapStyle={mapStyle.mapConfig}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }}
              showsUserLocation
            />
          )}
        </MapContent>
      </MapContainer>
    </>
  );
};

export default Map;
