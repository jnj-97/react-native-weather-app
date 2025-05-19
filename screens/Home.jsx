import {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {Icons} from '../weatherConfig';

import {REACT_APP_ACCUWEATHER_API_KEY} from '@env';

export default function Home(props) {
  const [weather, setWeather] = useState({
    dateTime: '',
    Weather: '',
    WeatherIcon: '',
    isDayTime: '',
    Temperature: '',
  });
  let myCity, myKey;
  myCity = console.log(props.route.params);
  const {city = 'Bengaluru', key = '204108'} = props.route.params ?? {};
  myCity = city;
  myKey = key;
  useEffect(() => {
    fetchData();
    if (props.route.params?.city !== 'Bengaluru') {
      fetchData();
    }
  }, [props.route.params?.key]);
  async function fetchData() {
    const results = await fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${myKey}?apikey=${REACT_APP_ACCUWEATHER_API_KEY}`,
    );
    let data = await results.json();
    console.log(data[0]);
    setWeather({
      dateTime: data[0].LocalObservationDateTime.slice(11, 16),
      Weather: data[0].WeatherText,
      WeatherIcon: data[0].WeatherIcon,
      isDayTime: data[0].IsDayTime,
      Temperature: `${data[0].Temperature.Metric.Value} C`,
    });
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: weather.isDayTime ? 'skyblue' : 'black',
      }}>
      <Title
        style={{
          margin: 10,
          padding: 15,
          color: weather.isDayTime ? 'black' : 'skyblue',
        }}>
        {myCity}
      </Title>
      <Text
        style={{
          margin: 10,
          padding: 15,
          color: weather.isDayTime ? 'black' : 'skyblue',
        }}>
        {weather.dateTime}
      </Text>
      <Image
        style={{height: 50, width: 50}}
        source={{uri: Icons[weather.WeatherIcon]}}
      />
      <Text
        style={{
          margin: 10,
          padding: 15,
          color: weather.isDayTime ? 'black' : 'skyblue',
        }}>
        {weather.Temperature}
      </Text>
      <Text
        style={{
          margin: 10,
          padding: 15,
          color: weather.isDayTime ? 'black' : 'skyblue',
        }}>
        {weather.Weather}
      </Text>
    </View>
  );
}
