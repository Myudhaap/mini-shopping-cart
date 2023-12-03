import useCart from "../hooks/useCart"
import useProduct from "../hooks/useProducts"
import { type UseProductsContextType } from "../context/ProductsProvider"
import { ReactElement } from "react"
import Product from "./Product"

const ProductList = () => {

  const {dispatch, REDUCER_ACTIONS, cart} = useCart()
  const {products} = useProduct()

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

  if(products?.length){
    pageContent = products.map(product => {
      const inCart: boolean = cart.some(item => item.sku === product.sku)

      return(
        <Product 
        key={product.sku} 
        product={product}
        dispatch={dispatch}
        REDUCER_ACTIONS={REDUCER_ACTIONS}
        inCart={inCart}/>
      )
    })
  }

  const content = (
    <main className="main main--products flex-grow px-4 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {pageContent}
    </main>
  )

  return content
}

export default ProductList