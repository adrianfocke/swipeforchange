import Menu from './Menu'

const Layout = ({ children, likes }) => {
  return(
    <div id="container">
      <Menu likes={likes} />
      { children }
    </div>
  )
}
export default Layout;
