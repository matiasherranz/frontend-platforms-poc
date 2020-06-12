import { ReactElement } from 'react'
import Header from 'react-common/dist/es5/components/Header'

export default function Layout(): ReactElement {
  return (
    <Header
      getLogoUrl={() => ''}
      getLoginUrl={() => ''}
      getJoinUrl={() => ''}
      getShopUrl={() => ''}
      getCartUrl={() => ''}
    />
  )
}
