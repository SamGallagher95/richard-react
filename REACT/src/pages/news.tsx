import * as React from "react";

import "./css/news.css";

import { Cms } from "../classes/cms";

interface IState {
  news: any;
  loading: boolean;
}

class Footer extends React.Component<IState> {
  public Cms = new Cms("news");
  public state: IState = {
    loading: true,
    news: null
  };

  constructor(props: any) {
    super(props);
    this.Cms.on("update", (content: Map<string, any>) => {
      const stateKeys = Object.keys(this.state);
      stateKeys.forEach(key => {
        this.setState({
          [key]: content.get(key)
        });
      });
      this.setState({
        loading: false
      });
    });
  }

  public render() {
    return (
      <div
        className={this.state.loading ? "content" : "column-content fade-in"}
      >
        <div className="news-wrapper">
          <h1>News</h1>
          {this.state.news}
        </div>
      </div>
    );
  }
}

export default Footer;
