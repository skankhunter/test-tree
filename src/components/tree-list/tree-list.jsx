import React, {Component} from 'react';

class TreeList extends Component {
    createList(root) {
        if (root.children) {
            return (
                <div>
                    <strong>{root.title}</strong>
                    <ul>
                        {root.children.map(item => (<li key={item.id}>{this.createList(item)} </li>))}
                    </ul>
                </div>
            );
        }
        else {
            return <p> {root.title} </p>;
        }
    }

    render() {
        const {item} = this.props;
        return (
            <React.Fragment>
                {this.createList(item)}
            </React.Fragment>
        );
    }
}

export default TreeList;
