import Content, { ContentSeo } from "./pages/Content";
import Product, { ProductSeo } from "./pages/Product";

export const routes = [
  {
    exact: true,
    path: '/',
    content: Content,
    seo: ContentSeo
  },
  {
    exact: true,
    path: '/product/:productId',
    content: Product,
    seo: ProductSeo
  },
]