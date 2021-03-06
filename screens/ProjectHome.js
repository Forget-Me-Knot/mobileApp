import React, { Component } from 'react';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import firebase from '../firebase';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      project: {},
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const project = navigation.getParam('project');
        const ref = firebase.database().ref();
        ref.on('value', function(snapshot) {
          const users = snapshot.val().users;
          let projectMembers = [];
          for (var key in users) {
            if (project.members.includes(users[key].email)) {
              projectMembers.push(users[key]);
            }
          }
          self.setState({ members: projectMembers, project: project });
        });
      } else {
        console.log('not logged in');
      }
    });
  }

  render() {
    const project = this.state.project;
    const members = this.state.members;
    let icon;
    if (members.length === 1) {
      icon = 'user';
    } else {
      icon = 'users';
    }
    return (
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
        }}
      >
        <Avatar
          size="large"
          alignSelf="center"
          rounded
          icon={{ name: `${icon}`, type: 'font-awesome' }}
          containerStyle={{
            marginRight: 20,
            marginTop: 20,
          }}
          overlayContainerStyle={{
            backgroundColor: `#${project.color}`,
          }}
        />

        <Card title={project.name} style={{ width: '100%' }}>
          <Text h3 style={{ textAlign: 'center' }}>
            Members:
          </Text>
          {members.map(member => (
            <ListItem
              key={member.email}
              title={member.displayName}
              hideChevron
              style={{ width: '100%' }}
            />
          ))}
        </Card>
      </ImageBackground>
    );
  }
}
