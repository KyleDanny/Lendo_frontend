import useStore from '../store'
import Link from 'next/link';

const Navbar = () => {
const cartItems = useStore(state=>state.cart)
  return (
    <nav>
      <div className="logo">
        <p>E-COMMERCE</p>
      </div>
      <div className="nav-links">
        <Link href="/"><a>Home</a></Link>
        <Link href="/products"><a>Products</a></Link>
        <Link href="/cart"><a>Cart: {cartItems.length}</a></Link>
      </div>
    </nav>
  );
}
 
export default Navbar;