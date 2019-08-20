import React from 'react';

export default class Items extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: null,
      users: null
    };
  }

  render() {
    // eslint-disable-next-line react/prop-types
    this.state.items = this.props.items;
    // eslint-disable-next-line react/prop-types
    this.state.users = this.props.users;

    return (
      <React.Fragment>
        {this.state.items && this.state.items.map((item, i) => {
          return (
            <div key={i}>
              <div>
                <img width="100" height="100" role="presentation" src={item.image} />
              </div>
              <div>
                <div>{item.itemId}</div>
                <div>{item.brandName}</div>
                <div>{item.description}</div>
              </div>
              <hr />
            </div>
          );
        })
        }
        {this.state.users && this.state.users.map((user, i) => {
          return (
            <div key={i}>
              <div>
                <div>{user.firstName}</div>
                <div>{user.lastName}</div>
                <div>{user.age}</div>
                <div>{user.email}</div>
              </div>
              <hr />
            </div>
          );
        })
        }
      </React.Fragment>
    );
  }

}