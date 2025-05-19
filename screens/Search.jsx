import {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import {REACT_APP_ACCUWEATHER_API_KEY} from '@env';

const Search = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState([]);

  async function fetchCities() {
    console.log('search value: ', search);
    try {
      const results = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${REACT_APP_ACCUWEATHER_API_KEY}&q=${search}`,
      );
      const data = await results.json();
      if (data != null) setCities(data.slice(0, 10));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  return (
    <View style={{padding: 10}}>
      <TextInput
        label="Area"
        value={search}
        onChangeText={text => {
          setSearch(text);
          fetchCities();
        }}
      />
      <Button
        icon="weather-cloudy"
        style={{
          marginVertical: 20,
          backgroundColor: 'skyblue',
          justifyContent: 'center',
        }}
        onPress={fetchCities}>
        <Text>Search</Text>
      </Button>
      {cities.length && (
        <FlatList
          data={cities}
          renderItem={({item}) => (
            <Card
              style={{margin: 10, padding: 10}}
              onPress={() => {
                console.log(item);
                navigation.navigate('home', {
                  city: item.LocalizedName,
                  key: item.Key,
                });
              }}>
              <Text>
                {item.LocalizedName}, {item.Country.LocalizedName}
              </Text>
            </Card>
          )}
          keyExtractor={item => item.Key}
        />
      )}
    </View>
  );
};

export default Search;
