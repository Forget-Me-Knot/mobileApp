import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import { Card, CardMedia } from "react-native-material-ui";
export default class MessageCard extends React.Component {
  render() {
    return (
      <View>
        <Text style={{ fontSize: 40 }}>Hello world!</Text>
        <Card>
          <Image
            source={{
              uri: "https://cdn130.picsart.com/273014372023201.jpg?r1024x1024"
            }}
            style={{ width: 400, height: 400 }}
          />
          {/* <Text style={{ fontSize: 40 }}>Hello world!</Text> */}
        </Card>
      </View>
    );
  }
}
