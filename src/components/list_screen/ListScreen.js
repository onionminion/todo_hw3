import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import ListModal from './ListModal.js';
import { Icon, Button } from 'react-materialize';
import { firestoreConnect } from 'react-redux-firebase';
import { updateTodoListHandler } from '../../store/database/asynchHandler';
import uuid from 'uuid';

class ListScreen extends Component {
    state = {
        name: this.props.todoList ? this.props.todoList.name : "",
        owner: this.props.todoList ? this.props.todoList.owner : "",
        items: this.props.todoList ? this.props.todoList.items : [],
        id: this.props.todoList ? this.props.todoList.id : "",
        priority: this.props.todoList ? this.props.todoList.priority : 0
    }

    handleChange = (e) => {
        const { target } = e;
        this.setState({ priority: this.props.todoList.priority });
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }), () => this.handleUpdate());
    }

    handleUpdate = () => {
        var { props, state } = this;
        var todoList = { ...state };
        props.update(todoList);
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (!todoList)
            return <React.Fragment />

        return (
            <div className="container white width-80">
                <div className="row header-style">
                    <ListModal className="col s1 margin" todoList={todoList} />
                    <div className="col s11 grey-text text-darken-3 font-17">Todo List</div>
                </div>
                <div className="input-field padding-17">
                    <label htmlFor="name" className="active padding-17">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} defaultValue={todoList.name} />
                </div>
                <div className="input-field padding-17">
                    <label htmlFor="owner" className="active padding-17">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} defaultValue={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
                <div className="add center">
                    <Link to={'/todoList/' + todoList.id + '/new/' + uuid.v4()}>
                        <Button floating icon={<Icon>add</Icon>} style={{backgroundColor: "black", borderRadius: '15%'}}large />
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
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
    ]),
)(ListScreen);