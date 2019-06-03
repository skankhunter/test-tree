import React, {Component} from 'react';
import Node from "../node/node";

class TreeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    createList(root) {
        const {onAddNode, onDeleteNode, onChange} = this.props;
        if (root.children.length > 0) {
            return (
                <React.Fragment>
                    <Node
                        item={root}
                        onAddNode={onAddNode}
                        onDeleteNode={onDeleteNode}
                        onChange={onChange}
                    />
                    <ul className="list list__inner">
                        {root.children.map(item => (<React.Fragment key={item.id}>{this.createList(item)} </React.Fragment>))}
                    </ul>
                </React.Fragment>
            );
        }
        else {
            return (
                <Node
                    item={root}
                    onAddNode={onAddNode}
                    onDeleteNode={onDeleteNode}
                    onChange={onChange}
                />
            )
        }
    }

    render() {
        const {
            item,
            onSaveModel,
            onLoadModel,
            onLoadFile,
            onClearStorage
        } = this.props;
        return (
            <React.Fragment>
                <ul className="list">
                    {this.createList(item)}
                </ul>
                <div className="state">
                    <div className="state__buttons">
                        <button className="white-blue" onClick={() => onSaveModel()}>Save to localStorage</button>
                        <button className="white-blue" onClick={() => onLoadModel()}>Load from localStorage</button>
                        <button className="white-blue" onClick={() => onClearStorage()}>Clear localStorage</button>
                    </div>
                    <fieldset className="state__json-loader">
                        <h2>Json File</h2>
                        <input type='file' id='fileInput'/>
                        <input type='button' value='Load' onClick={onLoadFile}/>
                    </fieldset>
                </div>

            </React.Fragment>
        );
    }
}

export default TreeList;
