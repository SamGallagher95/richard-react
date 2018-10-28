import * as React from "react";

import { Link } from "react-router-dom";

interface IProps {
  targetUrl: string;
  targetName: string;
  updateFunction: any;
  active: boolean;
}

class NavItem extends React.Component<IProps> {
  public render() {
    return (
      <div onClick={this.props.updateFunction}>
        <Link
          className={this.props.active ? "active" : undefined}
          to={this.props.targetUrl}
        >
          {this.props.targetName}
        </Link>
      </div>
    );
  }
}

export default NavItem;
