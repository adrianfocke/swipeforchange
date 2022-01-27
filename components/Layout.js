import Menu from './Menu'

const Layout = ({ children, likes }) => {
  return(
    <div id="container">
      <Menu />
      { children }
    </div>
  )
}
export default Layout;
