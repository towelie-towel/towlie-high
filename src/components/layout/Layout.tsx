import Link from "next/link";
import NavBar from "./NavBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <NavBar />
      <div className="drawer-mobile drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content relative flex flex-col">
          <section className="flex h-full w-full flex-col items-center justify-center">
            {children}
          </section>
        </div>
        <div className="drawer-side min-[768px]:visible">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu w-80 bg-base-100 p-4">
            <li>
              <Link href="/products">Productos</Link>
            </li>
            <li>
              <Link href="/orders">Ordenes</Link>
            </li>
            <li>
              <Link href="/test">Pruebas</Link>
            </li>
            <li>
              <Link href="/admin">Admin</Link>
            </li>
            <li>
              <Link href="/admin/products">Admin/Products</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Layout;
