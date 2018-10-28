import * as React from "react";

import "./css/poems.css";

import { Cms } from "../classes/cms";

interface IState {
  loading: boolean;
  poems: any;
  poemNames: any;
}

class Poems extends React.Component<IState> {
  public Cms = new Cms("poems");
  public state: IState = {
    loading: true,
    poemNames: null,
    poems: null
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
    const poems = this.Cms.getRaw().poems;
    const scrollToPoem = (id: string) => {
      const elm = document.getElementById(id);
      elm ? elm.scrollIntoView() : console.log("doesn't exist");
    };
    return (
      <div
        className={this.state.loading ? "content" : "column-content fade-in"}
      >
        <div className="row">
          <div className="poems-nav">
            <b>Quick Links</b>
            {poems.map((item: any, index: number) => {
              return (
                <a
                  onClick={scrollToPoem.bind(this, item.title)}
                  key={index}
                  href={"#" + item.title}
                >
                  {item.title}
                </a>
              );
            })}
          </div>
          <div className="poems-wrapper">
            <h1>Poems</h1>
            {this.state.poems}
          </div>
        </div>
      </div>
    );
  }
}

export default Poems;
