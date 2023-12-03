import Header from "./components/Header"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import ProductList from "./components/ProductList"
import React, { useState } from "react"

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false)

  const pageContent: React.ReactNode = viewCart ? <Cart /> : <ProductList />
  
  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart}/>
      {pageContent}
      <Footer viewCart={viewCart}/>
    </>
  )
  return content
}

export default App
