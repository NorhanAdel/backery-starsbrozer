import React from "react";
import "./Footer.scss";

import { navLink } from "../../Constant/nav";
 import{Link} from "react-router-dom"
const branches = ["القناطر الخيريه شارع سوق التلات امام ماركت حسن عبد الجواد","عزبه مسلم القناطر الخيريه بعد دار المناسبات"];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content container">
        <div className="footer__section">
          <h4>روابط سريعة</h4>
          <ul>
            {navLink.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                 
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__section">
          <h4>خدمة العملاء</h4>
          <ul>
            <li>
              <span>📧</span> bronzerstars111@gmail.com
            </li>
            <li>
              <span>📞</span> الهاتف : 01129996272 /01128626302
            </li>
          </ul>
        </div>

        <div className="footer__section">
          <h4> اللغة</h4>
          <p>العربية </p>

          <h4>فروعنا</h4>
          <ul>
            {branches.map((branch, index) => (
              <li key={index}>{branch}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 جميع الحقوق محفوظة لمخبزنا</p>
      </div>
    </footer>
  );
}

export default Footer;
