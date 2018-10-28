import "./sidebar.css";

import * as React from "react";

import bars from "../assets/imgs/bars.svg";
import NavItem from "./sub-components/navItem";

interface IProps {
  value?: any;
}

interface IState {
  displayMobileNav: boolean;
  location: string;
  navItems: INavItem[];
  screenWidth: number;
}

interface INavItem {
  name: string;
  url: string;
}

class Sidebar extends React.Component<IProps, IState> {
  public readonly state: IState = {
    displayMobileNav: false,
    location: window.location.pathname,
    navItems: [
      { name: "Biography", url: "/" },
      { name: "Discovery of Heaven", url: "/discovery-of-heaven" },
      { name: "Poems", url: "/poems" },
      { name: "Prose", url: "/prose" },
      { name: "Publications", url: "/publications" },
      { name: "News", url: "/news" },
      { name: "Contact", url: "/contact" }
    ],
    screenWidth: document.body.clientWidth
  };

  constructor(props: any) {
    super(props);
    window.addEventListener("resize", e => {
      this.setState({
        screenWidth: document.body.clientWidth
      });
    });
  }

  public updateLocation(
    location: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ): void {
    this.state.location = location;
  }

  public toggleMobileNav(e: React.MouseEvent) {
    if (this.state.displayMobileNav) {
      this.setState({ displayMobileNav: false });
    } else {
      this.setState({ displayMobileNav: true });
    }
  }

  public render() {
    const toggleMobileNav = this.toggleMobileNav.bind(this);
    if (this.state.screenWidth > 760) {
      return (
        <div className="sidebar">
          <div className="wrapper">
            <h1>Richard Hedderman</h1>
            <h2>Poet, Essayist, Author, Educator</h2>
            <div className="divider" />
            <div className="links">
              {this.state.navItems.map(item => {
                return (
                  <NavItem
                    key={item.url}
                    updateFunction={this.updateLocation.bind(this, item.url)}
                    targetName={item.name}
                    targetUrl={item.url}
                    active={this.state.location === item.url ? true : false}
                  />
                );
              })}
            </div>
            <div className="divider" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="sidebar-wrapper">
          <div className="sidebar">
            <img onClick={toggleMobileNav} className="bars" src={bars} />
            <h1>Richard Hedderman</h1>
          </div>
          <div
            className={
              this.state.displayMobileNav ? "nav-items open" : "nav-items"
            }
          >
            {this.state.navItems.map(item => {
              return (
                <NavItem
                  key={item.url}
                  updateFunction={this.updateLocation.bind(this, item.url)}
                  targetName={item.name}
                  targetUrl={item.url}
                  active={this.state.location === item.url ? true : false}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default Sidebar;
