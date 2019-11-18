import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import { DatePicker, Button } from 'react-materialize';
import { firestoreConnect } from 'react-redux-firebase';
import { updateTodoListHandler } from '../../store/database/asynchHandler'

class ItemScreen extends Component {
    newItem = {
        description: "Unknown",
        assigned_to: "Unknown",
        due_date: null,
        completed: false,
        id: this.props.itemId,
        key: this.props.itemId
    }
    addNewItem = () => {
        var { props } = this;
        var todoList = props.todoList;
        todoList.items.push(this.newItem);
        props.update(todoList);
    }
    setDescription = (description) => {
        this.newItem.description = description;
    }
    setAssignedTo = (assigned_to) => {
        this.newItem.assigned_to = assigned_to;
    }
    setDueDate = (event) => {
        this.newItem.due_date = event.target.value.toJSON().replace("T05:00:00.000Z", "");
    }
    setItemCompleted = (checked) => {
        this.newItem.completed = checked;
    }    
    render() {
        console.log("Add screen");
        const todoList = this.props.todoList;
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        if (!todoList)
            return <React.Fragment />;
        return (
            <div className="container white width-80">
                <div className="row header-style">
                    <div className="col s11 grey-text text-darken-3 font-17">Item</div>
                </div>
                <div className="input-field padding-17">
                    <label htmlFor="description" className="active padding-17">Description</label>
                    <input className="active" type="text" name="name" id="name" onChange={(event)=>this.setDescription(event.target.value)} defaultValue={this.newItem.description} />
                </div>
                <div className="input-field padding-17">
                    <label htmlFor="assigned_to" className="active padding-17">Assinged To</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={(event)=>this.setAssignedTo(event.target.value)} defaultValue={this.newItem.assigned_to} />
                </div>
                <div className="input-field padding-17">
                    <label htmlFor="due_date" className="active padding-17">Due Date</label>
                    <DatePicker
                        id="dueDate"
                        value={this.newItem.due_date}
                        onChange={(newDueDate) => {
                            this.setDueDate({
                                target: {
                                    id: "dueDate",
                                    value: newDueDate,
                                }
                            })
                        }} />
                </div>
                <div className="input-field padding-17">
                    <label htmlFor="completed" className="active padding-17">Completed</label>
                    <form className="checkbox no-padding-margin" action="#">
                        <label>
                            <input type="checkbox" className="filled-in" defaultChecked={this.newItem.completed} onChange={(event)=>this.setItemCompleted(event.target.checked)}/>
                            <span></span>
                        </label>
                    </form>
                </div>
                <div>
                    <Link to={'/todoList/' + todoList.id}>
                        <Button style={{backgroundColor: "#AE585E"}} onClick={()=>this.addNewItem()}>Submit</Button>
                        <span>&nbsp;</span>
                        <Button style={{backgroundColor: "#AE585E"}}>Cancel</Button>
                    </Link>
                </div>
            </div >
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const itemId = ownProps.match.params.itemId;
    const todoLists = state.firestore.ordered.todoLists;
    let todoList = null;
    if (todoLists) {
        for (let i in todoLists) {
            if (todoLists[i].id === id)
                todoList = todoLists[i];
        }
    }
    if (todoList)
        todoList.id = id;
    return {
        itemId,
        todoList,
        auth: state.firebase.auth,
    };
};
const mapDispatchToProps = dispatch => ({
    update: (todoList) => dispatch(updateTodoListHandler(todoList)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' }
    ])
)(ItemScreen);