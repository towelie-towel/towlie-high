import Link from "next/link";
import NavBar from "./NavBar";
import BuyingProcess from "../cart/BuyingProcess";
import SettingsOptions from "../settings/Settings";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <BuyingProcess />
      <SettingsOptions />
      <div className="drawer-mobile drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content relative flex flex-col">
          <NavBar />
          {children}
        </div>
        <div className="drawer-side z-20">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu min-h-full w-80 bg-base-300 p-4">
            <li>
              <Link href="/products">Productos</Link>
            </li>
            <li>
              <Link href="/orders">Ordenes</Link>
            </li>
            <li>
              <Link href="/test">Inventando</Link>
            </li>
            <li>
              <Link href="/admin/">Administrar Productos</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Layout;
