import React from 'react'

import { Image, Placeholder, PlaceholderTitle } from './styles'

type Props = {
  uri: string | null
}

const Photo: React.FC<Props> = ({ uri }) => {
  if (uri) {
    return <Image source={{ uri }} />
  }

  return (
    <Placeholder>
      <PlaceholderTitle>Nenhuma foto{'\n'} carregada</PlaceholderTitle>
    </Placeholder>
  )
}

export { Photo }
