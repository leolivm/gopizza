import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'styled-components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import firestore from '@react-native-firebase/firestore'

import { Home } from '../screens/Home'
import { Orders } from '../screens/Orders'
import { BottomMenu } from '../components/BottomMenu'

const { Navigator, Screen } = createBottomTabNavigator()

const UserTabRoutes: React.FC = () => {
  const [notifications, setNotifications] = useState('0')
  const { COLORS } = useTheme()

  useEffect(() => {
    const subscribe = firestore()
      .collection('orders')
      .where('status', '==', 'ready')
      .onSnapshot((querySnapshot) =>
        setNotifications(String(querySnapshot.docs.length))
      )

    return () => subscribe()
  }, [])

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.SECONDARY_900,
        tabBarInactiveTintColor: COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Cardápio" color={color} />
          ),
        }}
      />
      <Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu
              title="Pedidos"
              color={color}
              notifications={notifications}
            />
          ),
        }}
      />
    </Navigator>
  )
}

export { UserTabRoutes }
