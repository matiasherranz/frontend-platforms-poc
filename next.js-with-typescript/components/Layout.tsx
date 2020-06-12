import { ReactElement, ReactNode } from 'react'
import Grid from 'react-common/dist/es5/components/Grid'
import Header from 'react-common/dist/es5/components/Header'
import Footer from 'react-common/dist/es5/components/Footer'

type PropTypes = {
  children: ReactNode
}

const headerBaseProps = {
  getLogoUrl: () => '/logo',
  getLoginUrl: () => '/login',
  getJoinUrl: () => '/join',
  getShopUrl: () => '/shop',
  getCartUrl: () => '/cart',
  getPointsUrl: () => '/points',
  getAccountUrl: () => '/account',
  getGlambagUrl: () => '/glambag',
  getSubscribeUrl: () => '/subscribe',
  getReactivateUrl: () => '/reactivate',
  cartItemsCount: 0,
}

export default function Layout({ children }: PropTypes): ReactElement {
  return (
    <div className="ux bootstrap-grid text-center">
      <Grid>
        <Header {...headerBaseProps} />
        {children}
        <Footer useWhiteBackground />
      </Grid>
    </div>
  )
}
