import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { LiaUserEditSolid } from "react-icons/lia";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom"
import { withTranslation } from "react-i18next";
import { IoListOutline, IoHomeOutline } from "react-icons/io5";
import { PiNetworkLight } from "react-icons/pi";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { FaLeanpub } from "react-icons/fa6";
import { TbChartBarPopular } from "react-icons/tb";
import { GrIndicator } from "react-icons/gr";
import { RiSurveyLine } from "react-icons/ri";
import { MdOutlineFeedback } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { HiOutlineUsers } from "react-icons/hi";
import { SiLevelsdotfyi } from "react-icons/si";
import { GoTrophy } from "react-icons/go";
import { MdMood } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { PiMedalMilitaryLight } from "react-icons/pi";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdCardGiftcard } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HiMiniWindow } from "react-icons/hi2";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiBookmarks } from "react-icons/bi";
import { GiToken } from "react-icons/gi";




const SidebarContent = ({ t }) => {
  const location = useLocation();
  const ref = useRef();
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const user = useSelector(state => state?.Login.user)
  const path = location.pathname;
  const permissions = JSON.parse(localStorage.getItem('permissions'));
  

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag
        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.length && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };


  function tToggle2() {
    var body = document.body;
    if (window.screen.width <= 992) {
      body.classList.toggle("sidebar-enable");
    }
  }

  const activeMenu = useCallback(() => {
    const pathName = location.pathname;
    const fullPath = pathName;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (fullPath === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  // Get available paths from permissions
  const availablePaths = permissions?.map(permission => permission.page_url);

  // Handle menu item click
  const handleMenuItemClick = (itemPath) => {
    setSelectedMenuItem(itemPath);  // Set the active menu item
  };

  const getActiveItemStyle = (itemPath) => {
    return selectedMenuItem === itemPath ? { backgroundColor: "#f0f0f0" } : {};
  };

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {availablePaths?.includes('/dashboard')&&(
              <li>
                <Link to="/dashboard" className="waves-effect" onClick={() => { handleMenuItemClick("/dashboard"); tToggle2(); }}>
                  <IoHomeOutline size={20} className="me-2 mb-1" />
                  <span className="">{t("Dashboard")}</span>
                </Link>
              </li>
            )}
            
            {availablePaths?.includes('/users') && <li>
              <Link to="/users" className="waves-effect" onClick={() => { handleMenuItemClick("/users"); tToggle2(); }}>
                <CiUser size={22} className="me-2 mb-1" />
                <span>{t("Users")}</span>
              </Link>
            </li>}
            {availablePaths?.includes('/categories') && <li>
              <Link to="/categories" className="waves-effect" onClick={() => { handleMenuItemClick("/categories"); tToggle2(); }}>
              <BiCategory  size={22} className="me-2 mb-1" />
                <span>{t("Categories")}</span>
              </Link>
            </li>}
            {availablePaths?.includes('/plans') && <li>
              <Link to="/plans" className="waves-effect" onClick={() => { handleMenuItemClick("/plans"); tToggle2(); }}>
              <MdOutlineLocalOffer  size={22} className="me-2 mb-1" />
                <span>{t("Plans")}</span>
              </Link>
            </li>}
            {availablePaths?.includes('/redeemPlans') && <li>
              <Link to="/redeemPlans" className="waves-effect" onClick={() => { handleMenuItemClick("/redeemPlans"); tToggle2(); }}>
              <MdCardGiftcard  size={22} className="me-2 mb-1" />
                <span>{t("Redeem Plans")}</span>
              </Link>
            </li>}
            {availablePaths?.includes('/levels') && <li>
              <Link to="/levels" className="waves-effect" onClick={() => { handleMenuItemClick("/levels"); tToggle2(); }}>
              <BsGraphUpArrow  size={22} className="me-2 mb-1" />
                <span>{t("Levels")}</span>
              </Link>
            </li>}
            {availablePaths?.includes('/moods') && <li>
              <Link to="/moods" className="waves-effect" onClick={() => { handleMenuItemClick("/moods"); tToggle2(); }}>
                <MdMood size={22} className="me-2 mb-1" />
                <span>{t("Moods")}</span>
              </Link>
            </li>}
            
            {availablePaths?.includes('/user-tokens') && <li>
              <Link to="/user-tokens" className="waves-effect" onClick={() => { handleMenuItemClick("/user-tokens"); tToggle2(); }}>
                <GiToken size={22} className="me-2 mb-1" />
                <span>{t("User tokes")}</span>
              </Link>
            </li>}

            {availablePaths?.includes('/subscriptions') && <li>
              <Link to="/subscriptions" className="waves-effect" onClick={() => { handleMenuItemClick("/subscriptions"); tToggle2(); }}>
                <RiMoneyDollarCircleLine size={22} className="me-2 mb-1" />
                <span>{t("Subscriptions")}</span>
              </Link>
            </li>}

            {availablePaths?.includes('/redeemSubscriptions') && <li>
              <Link to="/redeemSubscriptions" className="waves-effect" onClick={() => { handleMenuItemClick("/redeemSubscriptions"); tToggle2(); }}>
                <MdOutlineSubscriptions size={22} className="me-2 mb-1" />
                <span>{t("Redeem Subscriptions")}</span>
              </Link>
            </li>}

            {availablePaths?.includes('/affirmations') && <li>
              <Link to="/affirmations" className="waves-effect" onClick={() => { handleMenuItemClick("/affirmations"); tToggle2(); }}>
                <HiMiniWindow size={22} className="me-2 mb-1" />
                <span>{t("Affirmations")}</span>
              </Link>
            </li>}

            {availablePaths?.includes('/rewards') && <li>
              <Link to="/rewards" className="waves-effect" onClick={() => { handleMenuItemClick("/rewards"); tToggle2(); }}>
              <PiMedalMilitaryLight  size={20} className="me-2 mb-1" />
                <span>{t("Rewards")}</span>
              </Link>
            </li>}

            {availablePaths?.includes('/customers') && <li>
              <Link to="/customers" className="waves-effect" onClick={() => { handleMenuItemClick("/customers"); tToggle2(); }}>
                <HiOutlineUsers size={20} className="me-2 mb-1" />
                <span>{t("Customers")}</span>
              </Link>
            </li>}

            {availablePaths?.includes('/rituals') && <li>
              <Link to="/rituals" className="waves-effect" onClick={() => { handleMenuItemClick("/rituals"); tToggle2(); }}>
                <BiBookmarks size={20} className="me-2 mb-1" />
                <span>{t("Rituals")}</span>
              </Link>
            </li>}

            {availablePaths?.includes('/paymentlogs') && <li>
              <Link to="/paymentlogs" className="waves-effect" onClick={() => { handleMenuItemClick("/paymentlogs"); tToggle2(); }}>
                <RiSecurePaymentFill size={20} className="me-2 mb-1" />
                <span>{t("Payment Logs")}</span>
              </Link>
            </li>}

            {availablePaths?.includes('/roles')  && <li>
              <Link to="/roles" className="waves-effect" onClick={() => { handleMenuItemClick("/roles"); tToggle2(); }}>
                <LiaUserEditSolid size={22} className="me-2" />
                <span>{t("Roles")}</span>
              </Link>
            </li>}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  permissions: PropTypes.array,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
