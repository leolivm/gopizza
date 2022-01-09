import React from 'react'

import { Container, Title, Notification, Quantity } from './styles'

type Props = {
  title: string
  color: string
  notifications?: string | undefined
}

const BottomMenu: React.FC<Props> = ({ title, color, notifications }) => {
  const noNotifications = notifications === '0'

  return (
    <Container>
      <Title color={color}>{title}</Title>
      {notifications && (
        <Notification noNotifications={noNotifications}>
          <Quantity noNotifications={noNotifications}>{notifications}</Quantity>
        </Notification>
      )}
    </Container>
  )
}

export { BottomMenu }
