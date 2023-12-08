import Link from "next/link";
import NavBar from "./NavBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-col">
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
          <div className="h-full w-3/4 bg-base-300">
            <div className="h-1/4 bg-base-100"></div>
            <ul className="menu p-4">
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
    </div>
  );
};

export default Layout;
