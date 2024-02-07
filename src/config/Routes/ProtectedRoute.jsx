import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Blogs, Home, RiwayatKonsultasi, Account} from '../../screens';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
export default function ProtectedRoute({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Riwayat') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Blog') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }
          return <Icon name={iconName} size={30} color={color} />;
        },

        tabBarStyle: {
          height: 70,
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#60a5fa',
        tabBarLabelStyle: {
          display: 'none',
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Riwayat" component={RiwayatKonsultasi} />
      <Tab.Screen name="Blog" component={Blogs} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
