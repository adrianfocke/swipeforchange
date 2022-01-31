import Menu from './Menu'

const Layout = ({ children }) => {
  return(
    <div id="container">
      <Menu />
      { children }
    </div>
  )
}
export default Layout;
