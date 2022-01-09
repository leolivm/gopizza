import React from 'react'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import { Container, Button, ButtonClear, Input, InputArea } from './styles'

type Props = TextInputProps & {
  onSearch: () => void
  onClear: () => void
}

const Search: React.FC<Props> = ({ onSearch, onClear, ...rest }) => {
  const { COLORS } = useTheme()

  return (
    <Container>
      <InputArea>
        <Input placeholder="pesquisar..." {...rest} />

        <ButtonClear onPress={onClear}>
          <Feather name="x" size={16} />
        </ButtonClear>
      </InputArea>

      <Button onPress={onSearch}>
        <Feather name="search" size={16} color={COLORS.TITLE} />
      </Button>
    </Container>
  )
}

export { Search }
