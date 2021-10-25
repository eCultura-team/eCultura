/* eslint-disable use-isnan */
/* eslint-disable no-redeclare */
/* eslint-disable no-var */
import React, { useState, useEffect, useRef } from 'react';
import { Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useStore } from '../../providers/store';
import loading from '../../assets/loading.gif';
import currentlocation from '../../assets/currentlocation.png';

import api from '../../services/api';
import { colors } from '../../tokens';

import { MapContainer, MapContent, ButtonMyLocation, Indicator } from './style';

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

const Map = ({ navigation, modalControls }) => {
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

  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  function calcCrow(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  }

  const mapMarkers = () => {
    const places = [...theatreResults.concat(marketResults, museumResults)];

    return (
      <>
        {places.map((data) => (
          <Marker
            key={data?.idLocation}
            pinColor={
              data?.type === 1 ? 'green' : data?.type === 2 ? 'teal' : 'indigo'
            }
            coordinate={{
              latitude: data?.lat,
              longitude: data?.long,
            }}
          >
            <MapView.Callout
              tooltip
              onPress={() => navigation.navigate('Portfolio', { data })}
            >
              <Indicator type={data?.type}>{data?.name}</Indicator>
            </MapView.Callout>
          </Marker>
        ))}
      </>
    );
  };

  const getLocation = () => {
    Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
      .then((data) => {
        setUserLocation(data.coords);
      })
      .catch(() => '');
  };

  const getPermission = () => {
    Location.requestForegroundPermissionsAsync()
      .then((data) => {
        if (data.status !== 'granted') {
          modalControls.setErrorSend(
            'A permissão de localização foi negada, por favor a permita.',
          );
          return modalControls.control.current?.open();
        }

        getLocation();
      })
      .catch(() => {
        modalControls.setErrorSend(
          'Houve um erro inesperado ao tentar pedir permissão de localização, por favor tente novamente depois.',
        );
        modalControls.control.current?.open();
      });

    setIsLoading(false);
  };

  const getAllLocations = () => {
    api
      .get('/getLocations')
      .then(({ data: { locations } }) => {
        setMuseumResults(
          [...locations.filter((item) => item.type === 1)].map((item) => {
            const distance = calcCrow(
              userLocation.latitude,
              userLocation.longitude,
              item.lat,
              item.long,
            ).toFixed(1);

            return {
              ...item,
              distance,
            };
          }),
        );
        setTheatreResults(
          [...locations.filter((item) => item.type === 2)].map((item) => {
            const distance = calcCrow(
              userLocation.latitude,
              userLocation.longitude,
              item.lat,
              item.long,
            ).toFixed(1);

            return {
              ...item,
              distance,
            };
          }),
        );
        setMarketResults(
          [...locations.filter((item) => item.type === 3)].map((item) => {
            const distance = calcCrow(
              userLocation.latitude,
              userLocation.longitude,
              item.lat,
              item.long,
            ).toFixed(1);

            return {
              ...item,
              distance,
            };
          }),
        );
      })
      .catch(() => {
        modalControls.setErrorSend(
          'Erro ao tentar conectar-se ao servidor, tente novamente mais tarde. 😤',
        );
        modalControls.control.current?.open();
      });
  };

  const getPlaces = () => {
    try {
      if (
        museumResults.length === 0 &&
        theatreResults.length === 0 &&
        marketResults.length === 0
      ) {
        getAllLocations();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const centralizeCamera = () => {
    getPermission();
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
    getPermission();
    getPlaces();

    setInterval(() => {
      getLocation();
    }, 1000);
  }, []);

  useEffect(() => {
    getPlaces();
  }, [userLocation]);

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
                showsMyLocationButton={false}
                toolbarEnabled={false}
                showsUserLocation
              >
                {mapMarkers()}
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
