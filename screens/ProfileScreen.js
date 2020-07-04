import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';

import { MonoText } from '../components/StyledText';


class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', fName: '', lName: '', bathUsername: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          style={{height: 40}}
          placeholder="First Name"
          onChangeText={(fName) => this.setState({fName})}
          value={this.state.fName}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Last Name"
          onChangeText={(lName) => this.setState({lName})}
          value={this.state.lName}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Bath Username"
          onChangeText={(bathUsername) => this.setState({bathUsername})}
          value={this.state.bathUsername}
        />
        <Button
          onPress={() => {
            signup(this.state.username, this.state.fName, this.state.lName, this.state.bathUsername);
          }}
          title="Sign up"
          />
      </View>
    );
  }
}

function signup (username, fName, lName, bathUsername) {
  fetch('http://138.38.168.182:3000/users/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: username,
    fName: fName,
    lName: lName,
    bathUsername: bathUsername
  }),
});
}

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Input />
    </View>
  );
}
