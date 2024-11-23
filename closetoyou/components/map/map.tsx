import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';

export const HereMap = ({ apikey }:any) => {
  const urlTemplate = `https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=${apikey}`;

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <UrlTile urlTemplate={urlTemplate} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default HereMap;
