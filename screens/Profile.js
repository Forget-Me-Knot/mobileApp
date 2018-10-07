import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import firebase from '../firebase';
import { Card, Button, ListItem, List } from 'react-native-elements';

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//   },
// });

export default class Profile extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.getProjects = this.getProjects.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  async componentDidMount() {
    const self = this;
    const userId = firebase.auth().currentUser.uid;
    let user;
    await firebase
      .database()
      .ref('/users/' + userId)
      .once('value')
      .then(function(snapshot) {
        user = snapshot.val() && snapshot.val();
        self.setState({ user });
      });
    this.getProjects();
  }

  getProjects() {
    const self = this;
    let allProjects = [];
    const email = this.state.user.email;
    var ref = firebase.database().ref('projects');
    ref.on('value', function(snapshot) {
      let projects = snapshot.val();
      for (let key in projects) {
        if (projects[key].members) {
          const members = projects[key].members;
          const name = projects[key].name;
          const color = projects[key].color;
          if (members.includes(email)) {
            allProjects.push({ name, key, color, members });
          }
        }
        self.setState({
          projects: allProjects,
        });
      }
    });
  }

  deleteProject(key) {
    return firebase
      .database()
      .ref('projects')
      .child(key)
      .remove();
  }

  render() {
    const projects = this.state.projects;
    const user = this.state.user;
    const nav = this.props.navigation;
    return (
      <ScrollView>
        <Card>
          <Text>PROFILE:</Text>
          {user ? (
            <Card>
              <Text>NAME:</Text>
              <Text>{user.displayName}</Text>
              <Text>EMAIL:</Text>
              <Text>{user.email}</Text>
            </Card>
          ) : null}
          {projects ? (
            <List>
              {projects.map(project => (
                <ListItem
                  key={project.key}
                  title={project.name}
                  rightIcon={{ name: 'delete', style: { marginRight: 10 } }}
                  leftIcon={{ name: 'lens', color: '#' + project.color }}
                  onPressRightIcon={() => this.deleteProject(project.key)}
                  style={{
                    marginLeft: 0,
                    paddingLeft: 10,
                  }}
                  container={{
                    flex: 1,
                  }}
                >
                  <Text>{project.name}</Text>
                </ListItem>
              ))}
            </List>
          ) : null}
          <Button
            title="CREATE PROJECT"
            buttonStyle={{
              width: '100%',
              height: 45,
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={() => nav.navigate('Create')}
          />
        </Card>
      </ScrollView>
    );
  }
}