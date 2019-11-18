import React from 'react';
import { Icon, Button } from 'react-materialize';
import { updateTodoListHandler } from '../../store/database/asynchHandler'
import { connect } from 'react-redux';
import { compose } from 'redux';

class ItemCard extends React.Component {
    todoList = this.props.todoList;

    getCompleted = (item) => {
        if (item.completed) {
            return "Completed";
        }
        else {
            return "Pending";
        }
    }

    deleteItem = (event, item) => {
        event.preventDefault();
        const newItems = this.todoList.items.filter(x => x.id !== item.id);
        const { props } = this;
        this.todoList.items = newItems;
        props.update(this.todoList);
    }

    moveItemDown = (event, item) => {
        event.preventDefault();
        let currentIndex = this.todoList.items.indexOf(item);
        if (currentIndex < this.todoList.items.length - 1) {
            this.todoList.items[currentIndex] = this.todoList.items[currentIndex + 1];
            this.todoList.items[currentIndex + 1] = item;
            const { props } = this;
            props.update(this.todoList);
        }
    }

    moveItemUp = (event, item) => {
        event.preventDefault();
        let currentIndex = this.todoList.items.indexOf(item);
        if (currentIndex > 0) {
            this.todoList.items[currentIndex] = this.todoList.items[currentIndex - 1];
            this.todoList.items[currentIndex - 1] = item;
            const { props } = this;
            props.update(this.todoList);
        }
    }

    disableUp = () => {
        return {
            background: 'gray',
            cursor: 'default',
            bottom: "3.8px",
        }
    }
    enableUp = () => {
        return {
            bottom: "3.8px",
            background: "#fdd835"
        }
    }

    disableDown = () => {
        return {
            background: 'gray',
            cursor: 'default',
            bottom: "3.8px"
        }
    }
    enableDown = () => {
        return {
            bottom: "3.8px",
            background: '#4CAF50'
        }
    }

    render() {
        const item = this.props.item;
        return (
            <div className="card z-depth-0 todo-list-link" style={{backgroundColor: "#F4E0D7"}}>
                <div className="card-content grey-text text-darken-3">
                    <div className="row margin-bottom-0">
                        <div className="col s4">
                            <span className="card-title description-layout">{item.description}</span>
                            <span className="card-title font-10">Assigned to: {item.assigned_to}</span>
                        </div>
                        <div className="col s3">
                            <span className="card-title description-layout">&nbsp;</span>
                            <span className="card-title font-10">&nbsp;{item.due_date}</span>
                        </div>
                        <div className="col s3">
                            <span className="card-title description-layout">&nbsp;</span>
                            <span className={item.completed ? "card-title font-10 green-text" : "card-title font-10 red-text"}>
                                &nbsp;{this.getCompleted(item)}
                            </span>
                        </div>
                        <div className="col s2">
                            <span className="card-title description-layout">&nbsp;</span>
                            <Button floating fab={{ direction: 'left' }} style={{
                                position: "relative", bottom: "0px",
                                padding: "0 0 0 38px", right: "0px", left: "50px"
                            }} className="red" default>
                                <Button floating icon={<Icon>arrow_upward</Icon>} style={this.props.isFirst ? this.disableUp() : this.enableUp()} onClick={(event) => this.moveItemUp(event, item)} small />
                                <Button floating icon={<Icon>arrow_downward</Icon>} style={this.props.isLast ? this.disableDown() : this.enableDown()} onClick={(event) => this.moveItemDown(event, item)} small />
                                <Button floating icon={<Icon>close</Icon>} style={{ bottom: "3.8px" }} onClick={(event) => this.deleteItem(event, item)} className="blue" small />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    update: (todoList) => dispatch(updateTodoListHandler(todoList)),
});

export default compose(
    connect(null, mapDispatchToProps))(ItemCard);