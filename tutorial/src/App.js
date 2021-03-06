import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state= {
      employees: [],
    }
  }

  componentDidMount() {
    const url = 'http://dummy.restapiexample.com/api/v1/employees';

    fetch(url)
      .then(res => res.json()) 
      .then(res => this.setState( {employees: res.data} ))
  }

  render() {
    const { employees } = this.state;

    return (
      <div className="App">
        <p>Employee list:</p>
        {employees.map((employee) => (
          <p key={employee.employee_id}>{employee.employee_name}</p>
        ))}
      </div>
    );
  }
}
export default App;
