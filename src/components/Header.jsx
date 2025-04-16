import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [triggerMenu, setTriggerMenu] = useState(false);

  function handleOpenMenu() {
    setTriggerMenu(() => !triggerMenu);
  }

  return (
    <nav>
      <div
        className={`flex gap-6 bg-gray-800 p-4 text-xl items-center ${
          triggerMenu ? "flex flex-col" : ""
        }`}
      >
        <div
          onClick={handleOpenMenu}
          className={`md:hidden cursor-pointer ${
            triggerMenu ? "sm:block" : ""
          }`}
        >
          <img src="assets/image.png" width="24" />
        </div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `cursor-pointer hover:opacity-50  md:block ${
              isActive ? "pointer-events-none opacity-50" : ""
            } ${triggerMenu ? "sm:block" : "hidden"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `cursor-pointer hover:opacity-50  md:block ${
              isActive ? "pointer-events-none opacity-50" : ""
            } ${triggerMenu ? "sm:block" : "hidden"}`
          }
        >
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
