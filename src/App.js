import React, {Component} from 'react';
import './App.css';
import TreeList from "./components/tree-list/tree-list.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: [
        {
          id: 1,
          root: true,
          title: 'node-',
          children: [
            {
              id: 2,
              title: 'node-',
              children: [
                {
                  id: 4,
                  title: 'node-',
                  children: []
                }
              ]
            },
            {
              id: 3,
              title: 'node-',
              children: [
                {
                  id: 5,
                  title: 'node-',
                  children: [
                    {
                      id: 6,
                      title: 'node-',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        },
      ]
    };

    this.traverseDF = this.traverseDF.bind(this);
    this.addNode = this.addNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.getNewId = this.getNewId.bind(this);
  }

  traverseDF(callback) {
    const copiedModel = [...this.state.model];
    copiedModel.map(item =>
        (function recurse(currentNode) {
          // шаг 2
          for (let i = 0; i < currentNode.children.length; i++) {
            // шаг 3
            recurse(currentNode.children[i]);
          }

          // шаг 4
          callback(currentNode);

          // шаг 1
        })(item));
    return copiedModel;
    // это рекурсивная и мгновенно вызываемая функция
  };

  getNewId() {
    const nodes = [];

    this.traverseDF(function(node) {
      nodes.push(node.id);
    });

    return Math.max(...nodes) + 1;
  }

  addNode(id) {
    const newId = this.getNewId();
    const newNode = {
      id: newId,
      title: 'node-',
      children: []
    };

    const newModel = this.traverseDF(function(node) {
      if(id === node.id) {
          node.children.push(newNode);
      }
    });

    this.setState({
      model: newModel
    })
  }

  deleteNode(id) {
    const newModel = this.traverseDF(function(node) {
      if(node.children.length > 0) {
        for(let i = 0; i < node.children.length; i++) {
          if (id === node.children[i].id) {
            node.children.splice(i, 1);
          }
        }
      }
    });

    this.setState({
      model: newModel
    })
  }

  render() {
    const {model} = this.state;

    return (
        <React.Fragment>
          {model.map((item, i) => (
              <TreeList
                  key={i}
                  item={item}
                  onAddNode={this.addNode}
                  onDeleteNode={this.deleteNode}
              />
              )
          )}
        </React.Fragment>
    )
  }
}

export default App;
