import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';

class ItemsList extends React.Component {
	state = {
		todoList: this.props.todoList,
	}
	statusClicked = false;
    taskClicked = false;
    dueDateClicked = false;
    sortByTask  = () => {
		this.taskClicked = !this.taskClicked;
		if (this.taskClicked)
			this.state.todoList.items.sort((item1, item2) => {
				if (item1.description < item2.description)
					return -1;
				else if (item1.description > item2.description)
					return 1;
				else
					return 0;
			});
		else
			this.state.todoList.items.sort((item1, item2) => {
				if (item1.description < item2.description)
					return 1;
				else if (item1.description > item2.description)
					return -1;
				else
					return 0;
            });
        this.forceUpdate();
    }
    
    sortByDueDate = () => {
        this.dueDateClicked = !this.dueDateClicked;
		if (this.dueDateClicked)
            this.state.todoList.items.sort((item1, item2) => {
				if (item1.due_date < item2.due_date)
					return -1;
				else if (item1.due_date > item2.due_date)
					return 1;
				else
					return 0;
			});
		else
			this.state.todoList.items.sort((item1, item2) => {
				if (item1.due_date < item2.due_date)
					return 1;
				else if (item1.due_date > item2.due_date)
					return -1;
				else
					return 0;
            });
        this.forceUpdate();
	}

	sortByStatus = () => {
		this.statusClicked = !this.statusClicked;
		if (this.statusClicked)
			this.state.todoList.items.sort((item1, item2) => {
				if (item1.completed < item2.completed)
					return -1;
				else if (item1.completed > item2.completed)
					return 1;
				else
					return 0;
			});
		else
			this.state.todoList.items.sort((item1, item2) => {
				if (item1.completed < item2.completed)
					return 1;
				else if (item1.completed > item2.completed)
					return -1;
				else
					return 0;
			});
		this.forceUpdate();
	}

    render() {
		const todoList = this.state.todoList;
		const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <div className="row font-17">
                    <div className="col s4 padding-24 clickable" onClick={() => this.sortByTask()}>Task</div>
                    <div className="col s3 clickable" onClick={() => this.sortByDueDate()}>&nbsp;Due Date</div>
                    <div className="col s3 clickable" onClick={() => this.sortByStatus()}>Status</div>
                </div>
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <ItemCard todoList={todoList} item={item}/>
                    );})
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists'},
    ]),
)(ItemsList);