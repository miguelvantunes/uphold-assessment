import { FOOTER_MENU } from '@/data/menus-data';
import SmallLogo from '@/assets/svg/small-logo.svg';
import AppStore from '@/assets/svg/appstore.svg';
import PlayStore from '@/assets/svg/playstore.svg';
import QrCode from '@/assets/svg/qr-code.svg';

const Footer = () => {
  return (
    <footer className=" border-t py-[70px] mt-10 max-w-[1110px] mx-auto w-full">
      <div className="grid grid-cols-[1fr_4fr_1fr]">
        <div>
          <img src={SmallLogo} className=" w-22" />
        </div>

        <nav className="grid grid-cols-4 gap-[30px]">
          {FOOTER_MENU.map((item, index) => (
            <div key={`${item}-${index}`}>
              <span className="font-semibold">{item.category}</span>

              <ul className="mt-7 flex flex-col gap-1">
                {item.links.map((link, index) => (
                  <li key={`${link}-${index}`}>
                    <a
                      href={link.url}
                      className="text-uhGrey hover:text-black transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col items-end">
          <div className="flex gap-9">
            <a href="#">
              <img src={AppStore} className=" w-5" />
            </a>

            <a href="#">
              <img src={PlayStore} className=" w-5" />
            </a>
          </div>

          <select className="mt-6 border p-1 text-xs w-[90px] h-7 rounded-lg">
            <option value="english">English</option>
            <option value="portuguese">Portuguese</option>
          </select>
        </div>
      </div>

      <div className="text-[10px] text-uhGrey mt-[70px] max-w-[1110px] mx-auto w-full flex justify-between">
        <div>
          <p>
            Uphold Europe Limited, Reg No. 09281410, Registered Office:
            Interchange Triangle, Chalk Farm Road, London, England, NW1 8AB
          </p>

          <div className="flex gap-10 mt-2">
            <p>© Uphold, Inc. 2018. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="border-b border-uhGreen border-opacity-25">
                Agreements
              </a>
              <a href="#" className="border-b border-uhGreen border-opacity-25">
                Privacy & Data
              </a>
              <a href="#" className="border-b border-uhGreen border-opacity-25">
                Policy Cookie Policy
              </a>
            </div>
          </div>
        </div>

        <img src={QrCode} className=" w-22" />
      </div>
    </footer>
  );
};

export default Footer;
