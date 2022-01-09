import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'

import {
  Container,
  Content,
  Image,
  Details,
  Name,
  Line,
  Description,
  Identification,
} from './styles'

export type ProductProps = {
  id: string
  photo_url: string
  name: string
  description: string
}

type Props = TouchableOpacityProps & {
  data: ProductProps
}

const ProductCard: React.FC<Props> = ({ data, ...rest }) => {
  const { COLORS } = useTheme()

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content>

      <Line />
    </Container>
  )
}

export { ProductCard }
