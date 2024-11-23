import { Text, type TextProps, StyleSheet, View , FlatList} from 'react-native';

import { ThemedView } from './ThemedView';


type item={
  id:string,
  value:string
}

const DATA:item[]=[
  {id:"1", value:"person1"},
  {id:"2", value:"person2"},
  {id:"3", value:"person3"},
  {id:"4", value:"person3"},
  {id:"5", value:"person4"},
  {id:"6", value:"person5"},
];



export function Flat(){

  const Item=({item}:any)=>(
    <View>
      <Text style={styles.subtitle}>
        id: {item.id}
        item: {item.value}
      </Text>
    </View>
  );

  return(
      <View style={styles.default}> 
      <FlatList
        data={DATA}
        renderItem={({item})=> <Item item={item} />}
        keyExtractor={item=>item.id}
      />
      </View>

  );
};



const styles = StyleSheet.create({
  default: {
    backgroundColor:"green",
    height:"100%",
    justifyContent:"center",
    alignItems: 'center',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
