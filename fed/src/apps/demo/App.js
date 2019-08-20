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
      items: null,
      users: null
    };
    this.getData = this.getData.bind(this);
    this.getDataFromDB = this.getDataFromDB.bind(this);
  }

  getData = () => {
    this.state.users = null;
    this.setState({
      users: null
    });
    axios.get('/v2/service').then(resp => {
      this.setState({
        items: resp.data.mockData.mockItems
      });
      this.state.items = resp.data.mockData.mockItems;
    });
  }

  getDataFromDB = () => {
    this.state.items = null;
    this.setState({
      items: null
    });
    axios.get('/v2/users').then(resp => {
      this.setState({
        users: resp.data
      });
      this.state.users = resp.data;
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
      </a>&nbsp;&nbsp;|&nbsp;&nbsp;
      <a
        className="App-link"
        onClick={this.getDataFromDB}
        style={button}
      >
        Get Data From DB
      </a>
      </header>
      {(this.state.items || this.state.users) &&
        <React.Fragment>
          <div style={topPadding20}>
            <hr />
            <fieldset>
              <legend>ITEMS</legend>
              <Items items = {this.state.items} users={this.state.users} />
            </fieldset>
          </div>
        </React.Fragment>
      }
      </div>
    );
  }

}