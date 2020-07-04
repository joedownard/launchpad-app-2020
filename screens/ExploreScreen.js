import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, ActivityIndicator } from 'react-native';

import { MonoText } from '../components/StyledText';

class Listing extends React.Component {
  render () {
    return (
        <View style={styles.listing}>
          <Image
            style={styles.listingImage}
            source={{uri: this.props.photo}}
          />
          <View style={{margin: 5, flexDirection: 'column', width: 0, flexGrow: 1, flex: 1,}}>
            <Text style={{fontSize: 24, flexWrap: 'wrap', flex: 1}}>{this.props.title}</Text>
            <Text style={{fontSize: 16, flexWrap: 'wrap', flex: 1}}>{this.props.content}</Text>
            <Text style={{fontSize: 16, flexWrap: 'wrap', flex: 1}}>{this.props.location}</Text>
            <Text style={{fontSize: 16, flexWrap: 'wrap', flex: 1}}>{this.props.contact}</Text>
            <Text style={{fontStyle: 'italic'}}><FetchUsername userID={this.props.userID} /></Text>
          </View>
        </View>
    );
  }
}

class FetchUsername extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  componentDidMount(){
    return fetch('http://138.38.168.182:3000/users/' + this.props.userID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson[0]);
        this.setState({
          isLoading: false,
          fName: responseJson[0].fName,
          lName: responseJson[0].lName,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render(){
    return(
      <Text style={{fontStyle: 'italic'}}>Posted by {this.state.fName} {this.state.lName}</Text>
    );
  }
}

class FetchListings extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  componentDidMount(){
    return fetch('http://138.38.168.182:3000/posts/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Listing title={item.title} content={item.description} contact={item.contactDetails} location={item.location} photo={item.photo} userID={item.userID}/>}
          keyExtractor={({postID}, index) => postID}
        />
      </View>
    );
  }
}

export default function ExploreScreen() {
  return (
    <ScrollView>
      <FetchListings />
    </ScrollView>

  );
}


const styles = StyleSheet.create({
  listing: {
    flex: 1,
    justifyContent: 'flex-start',
    borderRadius: 6,
    alignItems: 'flex-start',
    backgroundColor: 'rgb(186, 221, 232)',
    fontWeight: 'bold',
    margin: 10,
    flexDirection: 'row'
  },
  listingImage: {
    height: 100,
    width: 100,
    margin: 10,

  }
})
