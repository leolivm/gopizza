import React, { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import firestore from '@react-native-firebase/firestore'

import { OrderCard, OrderProps } from '../../components/OrderCard'
import { ItemSeparator } from '../../components/ItemSeparator'

import { useAuth } from '../../hooks/auth'

import { Container, Header, Title } from './styles'

const Orders: React.FC = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<OrderProps[]>([])

  const handlePizzaDelivered = (id: string) => {
    Alert.alert('Pedido', 'Confirmar que a pizza foi entregue?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          firestore().collection('orders').doc(id).update({
            status: 'delivered',
          })
        },
      },
    ])
  }

  useEffect(() => {
    const subscribe = firestore()
      .collection('orders')
      .where('waiter_id', '==', user?.id)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as OrderProps[]

        setOrders(data)
      })

    return () => subscribe()
  }, [user?.id])

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            data={item}
            disabled={item.status === 'delivered'}
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 125, paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  )
}

export { Orders }
