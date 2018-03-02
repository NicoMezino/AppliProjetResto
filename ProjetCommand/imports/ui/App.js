import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {
	 constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
    };
  }

	handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

     Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }


  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1 className="titrePrincipal">Liste des restaurants</h1>
          <br></br>
		  <AccountsUIWrapper />

            <h2>choisissez votre Restaurant</h2>
        </header>
      <div className="div-resto">

          <a href = "/Pizzeria"><img src="/images/pizzeria.jpg" className="image"/></a>

          <a href = "/Boulangerie"><img src="/images/boulangerie.jpg" className="image"/></a>

          <a href = "/Tacos"><img src="/images/tacos.jpg" className="image"/></a>

          <a href = "/MacDo"><img src="/images/macdo.jpg" className="image"/></a>
          </div>
      </div>

    );
  }
}

export default withTracker(() => {
	Meteor.subscribe('tasks');
	
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
	incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
	currentUser: Meteor.user(),
  };
})(App);