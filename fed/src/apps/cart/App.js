import React from 'react';
import axios from 'axios';
import './App.css';
import Items from './Items';

const button = {
  cursor: 'pointer',
  padding: '15px',
  backgroundColor: '#ccc',
  fontSize: '14px'
};

const topPadding20 = {
  paddingTop: '20px'
};

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      appData: null,
      items: null
    };
    this.getData = this.getData.bind(this);
  }

  getData = () => {
    axios.get('/v2/service').then(resp => {
      this.setState({
        items: resp.data.mockData.mockItems
      });
      this.state.items = resp.data.mockData.mockItems;
    });
  }

  render() {

    return (
      <div className="App">
      <header className="App-header">
      <p>
      Welcome Home,
      This is Sample React App using Spring Boot
      </p>
      <a
        className="App-link"
        onClick={this.getData}
        style={button}
      >
        Get Data
      </a>
      </header>
      {this.state.items &&
        <React.Fragment>
          <div style={topPadding20}>
            <hr />
            <fieldset>
              <legend>ITEMS</legend>
              <Items items = {this.state.items} />
            </fieldset>
          </div>
        </React.Fragment>
      }
      </div>
    );
  }

}