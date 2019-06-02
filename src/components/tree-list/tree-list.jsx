import React, {Component} from 'react';

class TreeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    createList(root) {
        const {onAddNode, onDeleteNode} = this.props;
        if (root.children.length > 0) {
            return (
                <React.Fragment>
                    <div className="node">
                        {root.title + root.id}
                        <div className="node__buttons">
                            <button
                                className="button button--add"
                                onClick={() => onAddNode(root.id)}
                            >
                                Add
                            </button>
                            {root.root ? '' :
                                <button
                                    className="button button--remove"
                                    onClick={() => onDeleteNode(root.id)}
                                >
                                    Remove
                                </button>
                            }
                        </div>
                    </div>
                    <ul className="list__node">
                        {root.children.map(item => (<li key={item.id}>{this.createList(item)} </li>))}
                    </ul>
                </React.Fragment>
            );
        }
        else {
            return (
                <div className="node">
                    {root.title + root.id}
                    <div className="node__buttons">
                        <button
                            className="button button--add"
                            onClick={() => onAddNode(root.id)}
                        >
                            Add
                        </button>
                        <button
                            className="button button--remove"
                            onClick={() => onDeleteNode(root.id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>);
        }
    }

    render() {
        const {item} = this.props;
        return (
            <ul className="list list__root">
                {this.createList(item)}
            </ul>
        );
    }
}

export default TreeList;
