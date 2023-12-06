"use client";
import Link from "next/link";
import { useCart } from "~/context/ShoppingCart";
import { useTheme } from "~/hooks/useTheme";

const NavBar: React.FC = () => {
  const { colorTheme, toogleColorTheme } = useTheme();

  const { cart } = useCart();

  return (
    <nav className="navbar sticky top-0 z-30 bg-base-100 bg-opacity-90 text-base-content shadow-md backdrop-blur">
      <label
        htmlFor="my-drawer-3"
        className="btn btn-square btn-ghost min-[1024px]:hidden"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          display="inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
      <div className="flex-1">
        <Link href="./" className="btn btn-ghost text-xl normal-case">
          Loft35
        </Link>
      </div>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          checked={colorTheme === "light"}
          onChange={() => {
            toogleColorTheme();
          }}
        />

        <svg
          className="swap-on"
          fill="currentColor"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        <svg
          className="swap-off"
          fill="currentColor"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-circle btn-ghost">
            <div className="indicator">
              <svg
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="badge indicator-item badge-sm">
                {cart.items.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">
                {cart.items.reduce((a, b) => a + b.quantity, 0)} Productos
              </span>
              <span className="text-info">Total: ${cart.total}</span>
              <div className="card-actions">
                <label
                  id="open-cart-modal"
                  htmlFor="cart-modal"
                  className="btn btn-primary btn-block"
                >
                  Ver Carrito
                </label>
              </div>
            </div>
          </div>
        </div>
        {true ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
              <div className="w-10 rounded-full">
                {/* <Image
                  src={'/placeholder.png'}
                  priority
                  loader={({ src }) => {
                    return src
                  }}
                  unoptimized
                  alt="avatar"
                  width={40}
                  height={40}
                /> */}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu-compact menu dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <Link href={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <label htmlFor="setting-modal">Settings</label>
              </li>
              <li>
                <a onClick={() => {}}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="btn btn-info"
            onClick={() => {
              window.scrollTo(0, 0);
              return;
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
