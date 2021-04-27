import React from 'react';
import MapView from 'react-native-maps';
import { MapContainer, MapContent } from './style';

const mapStyle = {
  map: {
    width: '100%',
    height: '100%',
  },
};

const Map = () => (
  <>
    <MapContainer>
      <MapContent>
        <MapView
          style={mapStyle.map}
          region={{
            latitude: -8.0548874,
            longitude: -34.8885838,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          showsUserLocation
        />
      </MapContent>
    </MapContainer>
  </>
);

export default Map;
