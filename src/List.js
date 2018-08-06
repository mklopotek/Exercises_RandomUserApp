import React, { Component } from 'react';
import database from './firebase';

class List extends Component {

    state = {
        user: null,
        list: []
    }

    clickHandler = () => {
        database.ref('/test')
        .push({user: this.state.user})
    }

    handleChange = (event) => {
        this.setState({
            user: event.target.value
        })
    }

    componentWillMount() {
        database.ref('/test')
            .on('value', (snapshot) => {
                const firebaseData = Object.entries(
                    snapshot.val() || {}
                );

                const data = firebaseData.map(([id, value]) => {
                    value.id = id;
                    return value;
                });
                this.setState({ list: data });
            });
    }

    render() {
        return (
          <div className="App">
            <div>
            </div>
              <input type="text" onChange={this.handleChange} />
              <button onClick={this.clickHandler}>Click me</button>
            <div>
              <ul>
                {this.state.list.map((item) => (
                  <li key={item.id}>{item.user}</li>
                ))}
              </ul>
            </div>
    
          </div>
        );
      }
    }

export default List