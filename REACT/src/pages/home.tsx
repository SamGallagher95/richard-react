import "./css/home.css";

import * as React from "react";

import { Cms } from "../classes/cms";

interface IState {
  content: IHomeContent;
}

interface IHomeContent {
  biography: null | any;
  loading: boolean;
  quotes: null | any;
  awards: null | any;
}

class Home extends React.Component<IState> {
  public Cms = new Cms("home");
  public state: IHomeContent = {
    awards: null,
    biography: null,
    loading: true,
    quotes: null
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
      <div className={this.state.loading ? "content" : "content fade-in"}>
        <div className="center">
          <div className="imgQuotesContainer">
            <img src={require("../assets/imgs/richard_1.JPG")} />
            <div className="quotes">
              <h1 className="title">Quotes</h1>
              {this.state.quotes}
            </div>
          </div>
          <div className="biography">
            <h1 className="title">Biography</h1>
            {this.state.biography}
          </div>
        </div>
        <div className="center column">
          <h1 className="title">Achievements</h1>
          {this.state.awards}
        </div>
      </div>
    );
  }
}

export default Home;
