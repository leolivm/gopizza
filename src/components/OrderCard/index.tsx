import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import {
  Container,
  Image,
  Name,
  Description,
  StatusContainer,
  StatusLabel,
  StatusTypesProps,
} from './styles'

export type OrderProps = {
  id: string
  pizza: string
  image: string
  status: StatusTypesProps
  table_number: string
  quantity: string
}

type Props = TouchableOpacityProps & {
  index: number
  data: OrderProps
}

const OrderCard: React.FC<Props> = ({ index, data, ...rest }) => (
  <Container index={index} {...rest}>
    <Image source={{ uri: data.image }} />

    <Name>{data.pizza}</Name>

    <Description>
      Mesa {data.table_number} ● Qnt: {data.quantity}
    </Description>

    <StatusContainer status={data.status}>
      <StatusLabel status={data.status}>
        {data.status === 'preparing'
          ? 'Preparando'
          : data.status === 'delivered'
          ? 'Entregue'
          : 'Pronta'}
      </StatusLabel>
    </StatusContainer>
  </Container>
)

export { OrderCard }
