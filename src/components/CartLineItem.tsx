import React, { ChangeEvent, ReactElement, memo } from 'react'
import { type CartItemType } from '../context/CartProvider'
import { type ReducerAction, type ReducerActionType } from '../context/CartProvider'


type PropsType = {
  item: CartItemType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType
}

const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}: PropsType) => {
  
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href

  const lineTotal: number = (item.qty * item.price)

  const highestQty: number = 20 > item.qty ? 20 : item.qty

  const optionValues: number[] = [...Array(highestQty).keys()].map(i => i+1)

  const options: ReactElement[] = optionValues.map(val => {
    return <option key={`opt${val}`} value={val} className='rounded-none'>{val}</option>
  })

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: {...item, qty: Number(e.target.value)}
    })
  }

  const onRemoveCart = () => dispatch({
    type: REDUCER_ACTIONS.REMOVE,
    payload: item,
  })

  const content = (
    <li className='cart__item flex items-center border shadow-md rounded-md p-4 mb-4'>
      <img src={img} alt={item.name}  className='flex-1 h-44 w-44 object-cover me-2 hidden md:block'/>
      <div aria-label='Item Name' className='flex-1 font-semibold text-sm md:text-lg'>{item.name}</div>
      <div aria-label='Price Per Item' className='flex-1 text-green-700 font-semibold'>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price)}</div>

      <label htmlFor="itemQty" className='flex-1 sr-only'>
        Item Quantity
      </label>
      <select
      name="itemQty" 
      id="itemQty" 
      value={item.qty} 
      aria-label='Item Quantity' 
      onChange={onChangeQty}
      className='w-auto rounded-none me-4 bg-white border'>
        {options}
      </select>
      

      <div className='cart__item-subtotal flex-1 font-semibold' aria-label='Line Item Subtotal'>
        {Intl.NumberFormat('en-US', {style: "currency", currency: 'USD'}).format(lineTotal)}
      </div>

      <button className='cart__button flex-1' aria-label='Remove Item From Cart' title='Remove Item From Cart' onClick={onRemoveCart}>
        ❌
      </button>
    </li>
  )

  return content
}

function areItemsEqual({item: prevItem}: PropsType, {item: nextItem}: PropsType){
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
  })
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)

export default MemoizedCartLineItem