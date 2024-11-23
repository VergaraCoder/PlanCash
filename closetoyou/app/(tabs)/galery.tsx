import { useState, useEffect } from "react";
import {
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Platform,
  Pressable,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Link } from "expo-router";

export default function App() {
  const [albums, setAlbums] = useState<any>(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    if (permissionResponse?.status!== "granted") {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }


  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={getAlbums} title="Photos" />
      <ScrollView>
        {albums &&albums.map((album:any) => <AlbumEntry album={album} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

function AlbumEntry({ album }:any) {
  const [assets, setAssets] = useState<any>([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });      
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  return (
    <View key={album.id} style={styles.albumContainer}>
      <Text>
        {album.title} - {album.assetCount ?? "no"} assets
      </Text>
      <View style={styles.albumAssetsContainer}>
        {assets &&
          assets.map((asset:any) => (            
            <Link href={`/(tabs)/newContact?uri=${asset.uri}`}>
                <Image source={{ uri: asset.uri }} width={70} height={70} />
            </Link>
          ))}
      </View>
    </View>
  );


  function PhotoSelect(picture:any){

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    ...Platform.select({
      android: {
        paddingTop: 40,
      },
    }),
  },
  albumContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 4,
  },
  albumAssetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
