import React from 'react';

class ItemCard extends React.Component {
    getCompleted = (item) => {
        if (item.completed) {
            return "Completed";
        }
        else {
            return "Pending";
        }
    }

    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <div className="row">
                        <div className="col s4">
                            <span className="card-title font-15">{item.description}</span>
                            <span className="card-title font-10">Assigned to: {item.assigned_to}</span>
                        </div>
                        <div className="col s3">
                            <span className="card-title font-15">&nbsp;</span>
                            <span className="card-title font-10">&nbsp;{item.due_date}</span>
                        </div>
                        <div className="col s3">
                            <span className="card-title font-15">&nbsp;</span>
                            <span className={item.completed ? "card-title font-10 green-text" : "card-title font-10 red-text"}>
                                &nbsp;{this.getCompleted(item)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;