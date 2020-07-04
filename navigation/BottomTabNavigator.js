import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import MapScreen from '../screens/MapScreen';
import ExploreScreen from '../screens/ExploreScreen';
import AddScreen from '../screens/AddScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Foodle';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: 'Foodle' });
  navigation.setOptions({ headerTitleStyle: {
    color: 'green',
    font: 'Roboto',
    fontSize: 20
  }});
  navigation.setOptions({ headerStyle: {
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    header: null
  }});

  return (
    <BottomTab.Navigator  style={{flex: 1, backgroundColor: 'rgb(186, 221, 232)'}}>
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-globe" />,
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
          headerTitleStyle: {
            textAlign: 'right',
          },
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={AddScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add-circle" />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-chatboxes" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Explore':
      return 'Explore';
    case 'Add':
      return 'Add a listing';
    case 'Map':
      return 'Scrap Map';
    case 'Profile':
      return 'Profile';
    case 'Messages':
      return 'DMs';
  }
}
