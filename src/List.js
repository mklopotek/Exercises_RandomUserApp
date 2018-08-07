import React, { Component } from 'react';

class List extends Component {

    state = {
        name: '',
        lastName: '',
        age: '',
        editMode: false,
        editId: '',
        list: [],
        butonName: 'Add user'
    }

    clickHandler = () => {

        if(this.state.editMode){
            const request = {
                method: 'PUT',
                body: JSON.stringify({
                    name: this.state.name,
                    lastName: this.state.lastName,
                    age: this.state.age
                })
            }
    
            fetch(`https://magda-app.firebaseio.com/users/${this.state.editId}.json`, request)
                .then(response => response.json())
                .then(data => {
    
                    this.setState({
                        name: '',
                        lastName: '',
                        age: '',
                        editMode: false,
                        butonName: 'Add user'
                    })
    
                    this.loadData()
    
                })
        }else{
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

                this.loadData()

            })
        }

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

    loadData() {
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

        const request = {
            method: 'DELETE'
        }

        fetch(`https://magda-app.firebaseio.com/users/${id}.json`, request)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.loadData()
            }
            )
    }

    editHandler = (item) => {
        this.setState({
            editMode: true,
            name: item.name,
            lastName: item.lastName,
            age: item.age,
            butonName: 'Edit user',
            editId: item.id
        })
    }

    render() {
        return (
            <div className="App">
                <div>
                </div>
                Name:  <input name='name' placeholder='name' type="text" onChange={this.handleChange} value={this.state.name} />
                Surname: <input name='lastName' placeholder='last name' type="text" onChange={this.handleChange} value={this.state.lastName} />
                Age: <input name='age' placeholder='age' type="text" onChange={this.handleChange} value={this.state.age} />
                <button onClick={this.clickHandler}>{this.state.butonName}</button>

                <div>
                    <ul>
                        {this.state.list.map((item) => (
                            <li key={item.id}>
                                <div>{item.name + ' ' + item.lastName
                                    + ' ' + item.age}</div>
                                <button onClick={() => this.editHandler(item)}>Edit</button>
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