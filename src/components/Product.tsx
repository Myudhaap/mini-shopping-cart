import { type ProductType } from "../context/ProductsProvider"
import { type ReducerActionType, type ReducerAction } from "../context/CartProvider"
import React, { ReactElement, memo } from "react"

type PropsType = {
  product: ProductType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType,
  inCart: boolean,
}

const Product = ({product, dispatch, REDUCER_ACTIONS, inCart} : PropsType): ReactElement => {

  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href
  console.log(img)

  const onAddToCart = () => dispatch({type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1}})

  const itemInCart = inCart ? '➡️ Item in Cart: ✅' : null

  const content = 
  <article className="product flex flex-col shadow-md rounded-md border p-4">
    <h3 className="text-lg font-semibold">{product.name}</h3>
    <img src={img} alt={product.name} className="h-64 w-full aspect-square object-cover my-4"/>
    <p className="text-green-700 font-semibold mt-auto">{new Intl.NumberFormat('en-US', {style: 'currency', currency: "USD"}).format(product.price)}{itemInCart}</p>
    <button className="py-2 px-4 bg-slate-700 text-white rounded-sm mt-2 text-sm hover:opacity-75 transition ease-in-out" onClick={onAddToCart}>Add to Cart</button>
  </article>

  return content
}

function areProductsEqual({product: prevProduct, inCart: prevInCart}: PropsType, {product:nextProduct, inCart: nextInCart}: PropsType){
  return (
    Object.keys(prevProduct).every(key => {
      return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType]
    }) && prevInCart === nextInCart
  )
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual)

export default MemoizedProduct