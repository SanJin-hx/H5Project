import React, { Component } from 'react';
import './list.css';

class ToDoListRemove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1, 2, 3],
    };
  }

  dataChange = e => {
    let tag = e.target,
      index = tag.getAttribute('index'),
      data = this.props.data;
    data.splice(index, 1);
    this.props.onDataChange(data);
  };
  render() {
    const data = this.props.data;
    return (
      <ul className="list">
        {data.map((val, key) => {
          return (
            <li key={key}>
              {val}
              <button index={key} onClick={this.dataChange}>
                del
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

class ToDoListInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listVal: '',
    };
  }
  handleChange = e => {
    this.setState({
      listVal: e.target.value,
    });
  };
  commitData = e => {
    let input = this.refs.input,
      data = this.props.data;

    data.push(input.value);
    this.props.onDataChange(data);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.listVal}
          onChange={this.handleChange}
          ref="input"
        />
        <button onClick={this.commitData}>commit</button>
      </div>
    );
  }
}
class ToDoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }
  handleChange = data => {
    this.setState({
      value: data,
    });
  };
  render() {
    return (
      <div>
        <ToDoListInput
          data={this.state.value}
          onDataChange={this.handleChange}
        />
        <ToDoListRemove
          data={this.state.value}
          onDataChange={this.handleChange}
        />
      </div>
    );
  }
}

class ToDoList extends Component {
  render() {
    return <ToDoListComponent />;
  }
}

export default ToDoList;
