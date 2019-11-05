import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
    ).then(() => {
        console.log("LOGIN_SUCCESS");
        dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
    });
};

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const createTodoListHandler = (todoList) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('todoLists').add({
        name: todoList.name,
        owner: todoList.owner,
        items: todoList.items,
        priority: todoList.priority
    }).then(() => {
        dispatch(actionCreators.createTodoList(todoList));
    }).catch((err) => {
        dispatch(actionCreators.createTodoListError(err));
    });
}

export const updateTodoListHandler = (todoList) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('todoLists').get().then(function (list) {
        list.forEach(function () {
            firestore.collection('todoLists').doc(todoList.id).set({
                name: todoList.name,
                owner: todoList.owner,
                items: todoList.items,
                id: todoList.id,
                priority: todoList.priority
            });
        });
    }).then(() => {
        dispatch(actionCreators.updateTodoListSuccess);
    }).catch((err) => {
        dispatch(actionCreators.updateTodoListError(err));
        console.log(err);
    });
};