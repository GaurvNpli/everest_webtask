import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import Home from './screens/Home'
import Calendar from './screens/Calendar'
import Calculator from './screens/Calculator'
import ServerTime from './screens/ServerTime'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName

            if (route.name === 'Home') iconName = 'home-outline'
            else if (route.name === 'Calendar') iconName = 'calendar-outline'
            else if (route.name === 'Calculator') iconName = 'calculator-outline'
            else if (route.name === 'Server Time') iconName = 'time-outline'

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e2e8f0',
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarActiveTintColor: '#0f172a',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          }
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="Calculator" component={Calculator} />
        <Tab.Screen name="Server Time" component={ServerTime} />
      </Tab.Navigator>
    </NavigationContainer>
  )
} 
 
