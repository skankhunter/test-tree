import React, {Component} from 'react';
import './App.css';
import TreeList from "../tree-list/tree-list.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: [
        {
          id: 1,
          root: true,
          title: `node-1`,
          children: []
        },
      ]
    };

    this.traverseFromDeep = this.traverseFromDeep.bind(this);
    this.addNode = this.addNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.getNewId = this.getNewId.bind(this);
    this.onChangeNodeName = this.onChangeNodeName.bind(this);
    this.saveToStorage = this.saveToStorage.bind(this);
    this.loadStorage = this.loadStorage.bind(this);
    this.loadFile = this.loadFile.bind(this);
    this.clearStorage = this.clearStorage.bind(this)
  }

  traverseFromDeep(callback) {
    const copiedModel = [...this.state.model];
    copiedModel.map(item =>
        (function recurse(currentNode) {
          for (let i = 0; i < currentNode.children.length; i++) {
            recurse(currentNode.children[i]);
          }

          callback(currentNode);
        })(item));
    return copiedModel;
  };

  getNewId() {
    const nodes = [];

    this.traverseFromDeep(function(node) {
      nodes.push(node.id);
    });

    return Math.max(...nodes) + 1;
  }

  addNode(id) {
    const newId = this.getNewId();
    const newNode = {
      id: newId,
      title: `node-${newId}`,
      children: []
    };

    const newModel = this.traverseFromDeep(function(node) {
      if(id === node.id) {
          node.children.push(newNode);
      }
    });

    this.setState({
      model: newModel
    })
  }

  deleteNode(id) {
    const newModel = this.traverseFromDeep(function(node) {
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

  onChangeNodeName(event) {
    const newModel = this.traverseFromDeep(function(node) {
      const id = Number(event.target.id);
      if(id === node.id) {
        node.title = event.target.value
      }
    });

    this.setState({
      model: newModel
    })
  }

  saveToStorage() {
    const {model} = this.state;
    const savedModel = JSON.stringify(model);
    localStorage.setItem('model', savedModel);
  }

  loadStorage() {
    const isModelExist = localStorage.getItem('model');
    if(isModelExist) {
      const savedModel = JSON.parse(localStorage.getItem('model'));
      this.setState({
        model: savedModel
      })
    } else {
      alert('Storage is empty')
    }
  }

  loadFile() {
    let input, file, fr, newModel;
    let self = this;

    input = document.getElementById('fileInput');
    if(input.files.length > 0) {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      newModel = fr.readAsText(file);
    } else {
      alert('Please, load fake.json')
    }
    function receivedText(e) {
      let lines = e.target.result;
      newModel = JSON.parse(lines);
      self.setState({
        model: newModel
      })
    }
  }

  clearStorage() {
    localStorage.removeItem('model');
  }

  render() {
    const {model} = this.state;

    return (
        <div className="model">
          {model.map((item, i) => (
              <TreeList
                  key={i}
                  item={item}
                  onAddNode={this.addNode}
                  onDeleteNode={this.deleteNode}
                  onChange={this.onChangeNodeName}
                  onSaveModel={this.saveToStorage}
                  onLoadModel={this.loadStorage}
                  onLoadFile={this.loadFile}
                  onClearStorage={this.clearStorage}
              />
              )
          )}
        </div>
    )
  }
}

export default App;
