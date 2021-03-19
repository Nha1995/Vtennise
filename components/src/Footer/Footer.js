import React from "react";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-block">
        <div class="footerInfo__socials">
          <img
            class="footerInfo__instagram"
            src="https://github.com/Nha1995/FirstProject/blob/main/images/f8b26d445cf63caffdec840f5dfad292.png?raw=true"
            alt="instagram"
          />
          <img
            class="footerInfo__facebook"
            src="https://github.com/Nha1995/FirstProject/blob/main/images/d363aa5f4abe8880b78ac6ecf0ff80a7.png?raw=true"
            alt="facebook"
          />
          <img
            class="footerInfo__vkontakte"
            src="https://github.com/Nha1995/FirstProject/blob/main/images/020e2d814b18d209336d43f5c9a43eb6.png?raw=true"
            alt="vkontakte"
          />
          <img
            class="footerInfo__whatsapp"
            src="https://github.com/Nha1995/FirstProject/blob/main/images/98c10c5ec34a5045da9700d9950ff931.png?raw=true"
            alt="whatsapp"
          />
          <p class="footerInfo__synchronization">© Синхронизация, 2021</p>
        </div>
        
        <div class="footerContacts">
           <div class="footerContacts__phone">
                <img class="footerContacts__phoneLogo" src="https://github.com/Nha1995/FirstProject/blob/main/images/85407bc469b4f068625c58f15cf6d4df.png?raw=true" alt="phone-icon" />
                <p class="footerContacts__phoneNumber">+7 (920)899-99-88</p> 
           </div>
           <div class="footerContacts__mail">        
                <img class="footerContacts__mailLogo" src="https://github.com/Nha1995/FirstProject/blob/main/images/0492aee1203ccf2b2ec5d152c81c59d8.png?raw=true" alt="mail-icon" />                   
                <p class="footerContacts__mailAddress">hello@intennis.ru</p>                
           </div> 
           <p class="footerContacts__synchronization">© Синхронизация, 2020</p>
           </div>
      </div>
    );
  }
}

export default Footer;
