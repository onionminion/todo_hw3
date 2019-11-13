import React from 'react';
import { Icon, Button } from 'react-materialize';

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
                            <Button floating fab={{direction: 'left'}} style={{position: "relative", bottom: "0px",
                            padding: "0 0 0 38px", right: "0px", left: "50px"}} className="red" medium>
                                <Button floating icon={<Icon>arrow_upward</Icon>} style={{bottom: "3.8px"}} className="yellow darken-1" small/>
                                <Button floating icon={<Icon>arrow_downward</Icon>} style={{bottom: "3.8px"}} className="green" small/>
                                <Button floating icon={<Icon>close</Icon>} style={{bottom: "3.8px"}} className="blue" small/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;