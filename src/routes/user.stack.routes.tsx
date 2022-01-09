import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useAuth } from '../hooks/auth'
import { Home } from '../screens/Home'
import { Product } from '../screens/Product'
import { Order } from '../screens/Order'

import { UserTabRoutes } from './user.tab.routes'

const { Navigator, Screen, Group } = createNativeStackNavigator()

const UserStackRoutes = () => {
  const { user } = useAuth()

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user?.isAdmin ? (
        <Group>
          <Screen name="Home" component={Home} />
          <Screen name="Product" component={Product} />
        </Group>
      ) : (
        <Group>
          <Screen name="UserTabRoutes" component={UserTabRoutes} />
          <Screen name="Order" component={Order} />
        </Group>
      )}
    </Navigator>
  )
}

export { UserStackRoutes }
