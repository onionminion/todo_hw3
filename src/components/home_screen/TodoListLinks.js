import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import firebase from 'firebase/app';
import { updateTodoListHandler } from '../../store/database/asynchHandler'
import { firestoreConnect } from 'react-redux-firebase';

class TodoListLinks extends React.Component {
    getMaxPriority = () => {
        if (this.props.todoLists[0]) {
            if (this.props.todoLists.length === 1) 
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
    handleSort = (todoList) => {   
        const { props } = this;
        todoList.priority = this.getMaxPriority() + 1;
        props.update(todoList);
    }

    render() {
        if(!this.props.todoLists)
	        return <React.Fragment />
        const todoLists = this.props.todoLists;
        console.log(todoLists);

        return (
            <div className="todo-lists section">
                {todoLists && todoLists.sort((a, b) => a.priority < b.priority).map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id} onClick={() => this.handleSort(todoList)}>
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    };
};
const mapDispatchToProps = dispatch => ({
    update: (todoList) => dispatch(updateTodoListHandler(todoList))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists'}
    ])
)(TodoListLinks);