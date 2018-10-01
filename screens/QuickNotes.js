import React from "react";
import firebase from '../firebase'
import {StyleSheet, View, TextInput, Button, Keyboard} from "react-native";

export default class QuickNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {note: ""};
    this.handlePress = this.handlePress.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  handlePress() {
		const user = firebase.auth().currentUser
		const noteid = Math.floor(Math.random() * 100000)
		firebase.database().ref('notes/' + noteid).set({
			author: user.uid,
			content: this.state.note
		})
		Keyboard.dismiss()
  }

  render() {
    return (
      <View style={styles.container}>
          <TextInput
            style={{
              width: 300,
              height: 200,
              backgroundColor: "white",
              marginBottom: 20,
              padding: 5
            }}
            onChangeText={text => this.setState({ note: text })}
            value={this.state.note}
            multiline={true}
          />
          <Button
          	title="POST"
            color="#841584"
            onPress={() => this.handlePress()}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    alignItems: "center",
    marginTop: 15
  },
<<<<<<< HEAD
  contentContainer: {
    paddingTop: 30
  },
=======
>>>>>>> 24b81f300641edc4bf293542f62da0751989ab48
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    margin: 20,
    alignContent: "center"
  }
});
