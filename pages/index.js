import React from "react";
import Card from "./Card";

// import "./index.scss";

class Index extends React.Component {
  // static async getInitialProps() {

  // }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="/ohyeah">
            <img src="./static/logo.png" className="static-logo" alt="logo" />
          </a>
        </header>

        <div className="Grid">
          {/* {this.props.cards.map((card) => (
            <Card key={card.id} />
          ))} */}
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    );
  }
}

export default Index;
