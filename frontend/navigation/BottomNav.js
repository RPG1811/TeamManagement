import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import general from '../styles/General.js';
import Projects from "./ProjectNav.js";
import Profile from '../screens/Profile.js'

const projectsRout = "Projects";
const profileRout = "Profile";

const Tap = createBottomTabNavigator();

export default function BottomNav() {
    return (
        <Tap.Navigator
        screenOptions={ ({route}) => ({ 
        headerShown: false,
        tabBarStyle: general.bottomNav,
        tabBarActiveTintColor: '#84B026',
        tabBarInactiveTintColor: '#fff',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? "#84B026" : "#fff";
          let rn = route.name;
  
          if (rn == projectsRout) {
            iconName = "md-home";
          } else if (rn == profileRout) {
            iconName = "md-person-circle-outline";
          }
  
          return <Ionicons name={iconName} size={24} color={iconColor}/>
        },
        })}>
        <Tap.Screen name={projectsRout} component={Projects}/>
        <Tap.Screen name={profileRout} component={Profile}/>
      </Tap.Navigator>
    );
}