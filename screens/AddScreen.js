import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';

import { MonoText } from '../components/StyledText';
import { Button, TextInput } from 'react-native';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', desc: '', contact: '', location: '', photo: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Title"
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Description"
          onChangeText={(desc) => this.setState({desc})}
          value={this.state.desc}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Contact Details"
          onChangeText={(contact) => this.setState({contact})}
          value={this.state.contact}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Location"
          onChangeText={(location) => this.setState({location})}
          value={this.state.location}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Photo"
          onChangeText={(photo) => this.setState({photo})}
          value={this.state.photo}
        />
        <Button
          onPress={() => {
            addListing(this.state.title, this.state.desc, this.state.contact, this.state.location, this.state.photo);
          }}
          title="Add"
          />
      </View>
    );
  }
}

function addListing (title, desc, contact, location, photo) {
  fetch('http://138.38.168.182:3000/posts/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: title,
    photo: photo,
    description: desc,
    contactDetails: contact,
    userID: 1,
    location: location
  }),
});
}


export default function AddScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Input />
    </View>
  );
}
