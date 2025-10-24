import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";

import { connect, useDispatch, useSelector } from "react-redux";
import { Form, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Input, Button } from "reactstrap";

import { Link } from "react-router-dom";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logodarkImg from "../../assets/images/logo-dark.png";
import logosmImg from "../../assets/images/logo-sm.png";
// import logolightImg from "../../assets/images/logo-light.png";


//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
  getNotifications,
} from "../../store/actions";
import Cookies from 'js-cookie';

const Header = props => {
  const [search, setsearch] = useState(false);
  const [singlebtn, setSinglebtn] = useState(false);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  function toggleFullscreen() {
    const doc = window.document;
    const docEl = doc.documentElement;
  
    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullscreen ||
      docEl.msRequestFullscreen;
  
    const cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;
  
    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen?.call(docEl);
    } else {
      cancelFullScreen?.call(doc);
    }
  }
  

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 992) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  const dispatch = useDispatch()
  const notifications = useSelector(state=>state?.Notification?.notifications)
  const id = 2

  // useEffect(()=>{
  //   dispatch(getNotifications(id))
  // },[])

  const permissions2 =  [];

 return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box" style={{padding: '0px'}}>
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logosmImg} alt=""  width="40px"/>
                </span>
                <span className="logo-lg">
                  <img src={logodarkImg} alt=""   width="140px" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logosmImg} alt="" height="34" width="70px"/>
                </span>
                {/* <span className="logo-lg">
                  <img src={logolightImg} alt="" height="18" />
                </span> */}
              </Link>
            </div>
            <button type="button" className="btn btn-sm  text-dark px-4 font-size-24 header-item waves-effect"
              id="vertical-menu-btn"
              onClick={() => {
                tToggle();
              }}
              data-target="#topnav-menu-content"
            >
              <i className="mdi mdi-menu fs-4"></i>
            </button>
          </div>

          <div className="d-flex">

            <LanguageDropdown />

            <div className="dropdown d-none d-lg-inline-block">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon waves-effect"
                data-toggle="fullscreen"
              >
                <i className="mdi mdi-fullscreen"></i>
              </button>
            </div>
                <NotificationDropdown notifications={[]}/>
            <ProfileMenu />

            {/* <div
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar);
              }}
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="mdi mdi-cog-outline"></i>
              </button>
            </div> */}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
