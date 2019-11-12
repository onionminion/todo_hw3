import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { firestoreConnect } from 'react-redux-firebase';

class TodoListLinks extends React.Component {

    render() {
        const todoLists = this.props.todoLists;
        const handleSort = this.props.handleSort;
        console.log(todoLists);
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.sort((a, b) => a.priority < b.priority).map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id} onClick={() => handleSort(todoList)}>
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);