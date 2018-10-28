import * as React from "react";

import "./footer.css";

class Footer extends React.Component {
  public state = {
    height: 0
  };
  constructor(props: any) {
    super(props);
    this.setState({
      height: document.body.scrollHeight
    });
  }

  public render() {
    const style = {
      top: this.state.height + "px"
    };
    return (
      <div className="footer" style={style}>
        <h1>This is the footer</h1>
      </div>
    );
  }
}

export default Footer;
