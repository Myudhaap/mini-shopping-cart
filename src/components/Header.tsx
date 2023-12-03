import React from "react"
import Nav from "./Nav"
import useCart from "../hooks/useCart"

type PropsType = {
  viewCart: boolean,
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({viewCart, setViewCart}: PropsType) => {
  const {totalItems, totalPrice} = useCart()

  const content = (
    <header className="header bg-slate-500 px-4 py-2">
      <div className="header__title-bar flex justify-between text-white text-base">
        <h1 className="text-3xl font-bold">Acme Co.</h1>
        <div className="header__price-box">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart}/>
    </header>
  )

  return content
}

export default Header