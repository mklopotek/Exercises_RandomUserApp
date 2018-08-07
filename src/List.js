import React, { Component } from 'react';

class List extends Component {

    state = {
        name: '',
        lastName: '',
        age: '',
        list: []
    }

    clickHandler = () => {
        const request = {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                lastName: this.state.lastName,
                age: this.state.age
            })
        }

        fetch('https://magda-app.firebaseio.com/users.json', request)
            .then(response => response.json())
            .then(data => {

                this.setState({
                    name: '',
                    lastName: '',
                    age: ''
                })

            })

    }

    handleChange = (event) => {
        const fieldName = event.target.name

        this.setState({
            [fieldName]: event.target.value
        })

    }


    componentWillMount() {

        fetch('https://magda-app.firebaseio.com/users.json')
            .then(response => response.json())
            .then(data => {

                const firebaseArray = Object.entries(data || [])
                const firebaseData = firebaseArray.map(item => {

                    return {
                        id: item[0],
                        ...item[1]
                    }
                }
                )

                this.setState({ list: firebaseData })

            })
    }

    removeHandler = (id) => {
console.log('Hura id: ', id)

const request = {
    method: 'DELETE'
}

fetch('https://magda-app.firebaseio.com/users/'+ id +'.json', request)
            .then(response => response.json())
            .then(data => console.log(data))
    }

    render() {
        return (
            <div className="App">
                <div>
                </div>
                Name:  <input name='name' placeholder='name' type="text" onChange={this.handleChange} value={this.state.name} />
                Surname: <input name='lastName' placeholder='last name' type="text" onChange={this.handleChange} value={this.state.lastName} />
                Age: <input name='age' placeholder='last name' type="text" onChange={this.handleChange} value={this.state.age} />
                <button onClick={this.clickHandler}>Click me</button>
               
                <div>
                    <ul>
                        {this.state.list.map((item) => (
                            <li key={item.id}>
                                <div>{item.name + ' ' + item.lastName
                                + ' ' + item.age}</div>
                                <button onClick={() => this.removeHandler(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default List