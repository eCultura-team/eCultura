import React, { useState, useEffect, useRef } from 'react';
import { Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useStore } from '../../providers/store';
import { MapContainer, MapContent, ButtonMyLocation } from './style';
import loading from '../../assets/loading.gif';
import currentlocation from '../../assets/currentlocation.png';
import theatreAPI from '../../services/RecAPI/theatre';
import museumAPI from '../../services/RecAPI/museum';
import marketAPI from '../../services/RecAPI/market';
import { colors } from '../../tokens';

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
  const initialLocation = {
    latitude: -8.0585076,
    longitude: -34.8793304,
  };
  const { userLocation, setUserLocation } = useStore({
    latitude: -8.0548874,
    longitude: -34.8885838,
  });
  const { museumResults, setMuseumResults } = useStore();
  const { theatreResults, setTheatreResults } = useStore();
  const { marketResults, setMarketResults } = useStore();
  const mapRef = useRef(null);

  const theaterMapMarkers = () =>
    theatreResults.map((theatre) => (
      <Marker
        key={theatre._id}
        pinColor="teal"
        coordinate={{
          latitude: theatre.latitude,
          longitude: theatre.longitude,
        }}
        title={theatre.nome}
      />
    ));

  const marketMapMarkers = () =>
    marketResults.map((market) => (
      <Marker
        key={market._id}
        pinColor="indigo"
        coordinate={{
          latitude: market.latitude,
          longitude: market.longitude,
        }}
        title={market.nome}
      />
    ));

  const museumMapMarkers = () =>
    museumResults.map((museum) => (
      <Marker
        key={museum._id}
        pinColor="green"
        coordinate={{
          latitude: museum.latitude == null ? -8.044618 : museum.latitude,
          longitude: museum.longitude,
        }}
        title={museum.nome}
      />
    ));

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('A permissão de localização foi negada, por favor habilite-a.');
    } else {
      const position = await Location.getCurrentPositionAsync({});
      setUserLocation(position.coords);
      setIsLoading(false);
    }
  };

  const getTheatre = async () => {
    const response = await theatreAPI.get();
    const { records } = response.data.result;
    setTheatreResults(records);
  };

  const getMuseum = async () => {
    const response = await museumAPI.get();
    const { records } = response.data.result;
    setMuseumResults(records);
  };

  const getMarket = async () => {
    const response = await marketAPI.get();
    const { records } = response.data.result;
    setMarketResults(records);
  };

  const getPlaces = () => {
    try {
      if (
        museumResults.length === 0 &&
        theatreResults.length === 0 &&
        marketResults.length === 0
      ) {
        getTheatre();
        getMuseum();
        getMarket();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const centralizeCamera = () => {
    const newCamera = {
      center: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
      zoom: 15,
    };

    mapRef.current.animateCamera(newCamera, { duration: 1000 });
  };

  useEffect(() => {
    getLocation();
    getPlaces();

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
            <>
              <MapView
                ref={mapRef}
                style={mapStyle.map}
                customMapStyle={mapStyle.mapConfig}
                initialRegion={{
                  latitude: initialLocation.latitude,
                  longitude: initialLocation.longitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}
                showsUserLocation
              >
                {theaterMapMarkers()}
                {marketMapMarkers()}
                {museumMapMarkers()}
              </MapView>
              <ButtonMyLocation
                onPress={() => centralizeCamera()}
                underlayColor={colors.darkGreen}
              >
                <Image source={currentlocation} />
              </ButtonMyLocation>
            </>
          )}
        </MapContent>
      </MapContainer>
    </>
  );
};

export default Map;
