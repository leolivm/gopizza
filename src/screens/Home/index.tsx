import React, { useState, useCallback } from 'react'
import { Alert, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'
import firestore from '@react-native-firebase/firestore'

import { useAuth } from '../../hooks/auth'
import { Search } from '../../components/Search'
import { ProductCard, ProductProps } from '../../components/ProductCard'

import happyEmoji from '../../assets/happy.png'

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  Title,
  NewProductButton,
} from './styles'

const Home: React.FC = () => {
  const [pizzas, setPizzas] = useState<ProductProps[]>([])
  const [search, setSearch] = useState('')
  const { COLORS } = useTheme()
  const navigation = useNavigation()
  const { signOut, user } = useAuth()

  const fetchPizzas = async (value: string) => {
    const formattedValue = value.toLocaleLowerCase().trim()
    firestore()
      .collection('pizzas')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as ProductProps[]

        setPizzas(data)
      })
      .catch(() =>
        Alert.alert('Consulta', 'Não foi possível realizar a consulta.')
      )
  }

  const handleSearch = () => {
    fetchPizzas(search)
  }

  const handleSearchClear = () => {
    setSearch('')
    fetchPizzas('')
  }

  const handleOpen = (id: string) => {
    const route = user?.isAdmin ? 'Product' : 'Order'
    navigation.navigate(route, { id })
  }

  const handleAdd = () => {
    navigation.navigate('Product', {})
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas('')
    }, [])
  )

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <TouchableOpacity onPress={signOut}>
          <MaterialIcons name="logout" size={24} color={COLORS.TITLE} />
        </TouchableOpacity>
      </Header>

      <Search
        value={search}
        onChangeText={setSearch}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />

      {user?.isAdmin && (
        <NewProductButton
          title="Cadastrar Pizza"
          type="secondary"
          onPress={() => handleAdd()}
        />
      )}
    </Container>
  )
}

export { Home }
