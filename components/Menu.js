import Link from 'next/link'

const Menu = ({myLikes}) => {
  return(
    <nav className="flexbox margin-top margin-bottom">
      <Link href="/"><a title="Back to home">Activie</a></Link>
      <ul className="flexbox link-collection margin-none padding-none">
        <li><Link href="/profile"><a title="Navigate to profiles">Profile</a></Link></li>
        <li><Link href="/likes"><a title="Navigate to likes">Likes</a></Link></li>
        <li><Link href="/faq"><a title="Navigate to faq">FAQ</a></Link></li>
      </ul>
    </nav>
  )
}
export default Menu
