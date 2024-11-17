import { HEADER_MENU } from '@/data/menus-data';
import Logo from '@/assets/svg/logo.svg';

const Header = () => {
  return (
    <header>
      <nav className="grid grid-cols-3">
        <ul className="flex gap-8 pt-1">
          {HEADER_MENU.map((item, index) => (
            <li key={`${index}-${item}`}>
              <a
                href={item.url}
                className="text-uhGrey hover:text-black transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="/" className="m-auto">
          <img src={Logo} className=" w-32" />
        </a>

        <a
          href="#"
          className="px-6 py-1 h-8 rounded-full bg-uhGreen text-white ml-auto"
        >
          Log In
        </a>
      </nav>
    </header>
  );
};

export default Header;
