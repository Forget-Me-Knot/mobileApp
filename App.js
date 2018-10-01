import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import Navbar from "./screens/Navbar";
import { SafeAreaView } from "react-navigation";
import AppNavigator from "./navigation/AppNavigator";
//import MainTab from "./navigation/Router";
import NavbarStack from "./navigation/Router";

import { Navigator, NativeModules } from "react-native";
// import AppNav from "./navigation/AppNavigator";
// import AppNav from "./navigation/Router";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          {/* <Navbar navigation={Router} /> */}
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}

            <Navbar />
            <AppNavigator />
          </View>
        </SafeAreaView>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,

        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        Roboto: require("./assets/fonts/Roboto-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
