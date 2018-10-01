import React, { Component } from "react";
var firebase = require("firebase");
import {View, Keyboard} from "react-native";
import { Button, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import { Divider } from "react-native-material-ui";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }
  static navigationOptions = {
    header: null
	};

  handleSubmit() {
    const email = this.state.email;
    const pass = this.state.pass;
    if (email && pass){
			firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .catch(function(error) {
        console.error(error);
      });
		}
		this.setState = {email: "", pass: ""}
		Keyboard.dismiss()
  }

  loginSubmit() {
    const email = this.state.email;
		const pass = this.state.pass;
		if (email && pass) {
			firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .catch(function(error) {
        console.error(error);
      });
		}
		this.setState = {email: "", pass: ""}
		Keyboard.dismiss()
  }

  render() {
    return (
      <View>
					<FormLabel>E-mail</FormLabel>
					<FormInput onChangeText={email => this.setState({email})} />

					<FormLabel>Password</FormLabel>
					<FormInput onChangeText={pass => this.setState({pass})} secureTextEntry />

					<Button
						title="SIGNUP" onPress={() => this.handleSubmit()}
					/>
					<Divider />
					<FormLabel>E-mail</FormLabel>
					<FormInput onChangeText={email => this.setState({email})} />

					<FormLabel>Password</FormLabel>
					<FormInput onChangeText={pass => this.setState({pass})} secureTextEntry />

					<Button
						title="LOGIN"
						//   onPress={() => console.log("this stuff", this.state)}
						onPress={() => this.loginSubmit}
					/>
      </View>
    );
  }
}

export default Login;
