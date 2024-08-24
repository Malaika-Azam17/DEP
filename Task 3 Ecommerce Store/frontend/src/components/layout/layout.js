import React from 'react'
import Header from "./Header.js"
import Footer from "./Footer.js"
const layout = ({children}) => {
  return (
    <div>
    <Header>

    </Header>
      <main style={{minHeight:"80vh"}}>
      {children}
      </main>
    <Footer>

    </Footer>
    </div>
  )
}

export default layout
