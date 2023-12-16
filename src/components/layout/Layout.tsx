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
          <ul className="menu min-h-full w-80 gap-2 bg-base-300 p-4">
            <li className="justify-betweent flex flex-row items-center">
              <div className="flex flex-1 hover:bg-transparent active:bg-transparent">
                <h1 className="flex-1 text-xl font-bold">
                  Cuba Store
                </h1>
              </div>
              <label
                htmlFor="my-drawer-3"
                className="drawer-overlay items-center justify-center lg:hidden"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  stroke="currentColor"
                  className="items-center justify-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </label>
            </li>
            <li>
              <Link className="font-medium text-sm" href="/home">Inicio</Link>
            </li>
            <li>
              <Link className="font-medium text-sm" href="/products">Productos</Link>
            </li>
            <li>
              <Link className="font-medium text-sm" href="/orders">Ordenes</Link>
            </li>
            <li>
              <Link className="font-medium text-sm" href="/test">Inventando</Link>
            </li>
            <li>
              <Link className="font-medium text-sm" href="/admin/">Administrar Productos</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Layout;
