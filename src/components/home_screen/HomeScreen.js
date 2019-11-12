import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { createTodoListHandler } from '../../store/database/asynchHandler'
import { updateTodoListHandler } from '../../store/database/asynchHandler'

class HomeScreen extends Component {
    getMaxPriority = () => {
        if (this.props.todoLists[0]) {
            if (this.props.todoLists.length == 1) 
                return 1;
            else {
                return this.props.todoLists.reduce(function(l1, l2) {
                    return (l1.priority > l2.priority) ? l1 : l2
                }).priority;
            }  
        }
        else 
            return 0;
    }
    handleNewList = () => {       
        const { props } = this;
        const todoList = { 
            name: "Unknown",
            owner: "Unknwon",
            items: [],
            priority: this.getMaxPriority() + 1
        }
        props.create(todoList);
    }

    handleSort = (todoList) => {   
        const { props } = this;
        todoList.priority = this.getMaxPriority() + 1;
        props.update(todoList);
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks handleSort={this.handleSort}/>
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        todoLists: state.firestore.ordered.todoLists
    };
};

const mapDispatchToProps = dispatch => ({
    create: (todoList) => dispatch(createTodoListHandler(todoList)),
    update: (todoList) => dispatch(updateTodoListHandler(todoList))
});  

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists'}
    ])
)(HomeScreen);