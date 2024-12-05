
import { Link, NavLink } from "react-router-dom"

const navItems = [
  { path: '/', label: 'Furniture'},
  { path: '/shop', label: 'Shop'},
  { path: '/about', label: 'About Us'},
  { path: '/contact', label: 'Contact'},
  { path: '/', label: 'Furniture'},
   

]

const NavItems = () =>{
  return(
      <ul className="flex flex-col md:flex-row items-center md:space-x-8">
        {
          navItems.map((item, index) => (
            <li>
              <NavLink to={item.path}>{item.label}</NavLink>
            </li>
          
          ))
        }
      </ul>
  )
}

function Navber() {
  return (
    <>
      <header>
         <nav className="mx-w-screen-2xl container flex justify-between items-center py-6 px-4">
         {/* logo */}
            <Link to="/" className="font-bold">Logomkk</Link>

         {/* menu */}
         <div>
            <NavItems/>
         </div>

         {/* cart icon */}
         <div>Cart</div>

         </nav>
      </header>
    </>
  )
}

export default Navber