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
          title: 'root-1',
          children: [
            {
              id: 2,
              title: 'element-1',
              children: []
            }
          ]
        },
      ]
    }
  }

  render() {
    const {model} = this.state;

    return (
        <React.Fragment>
          {model.map((item, i) => (
              <TreeList
                  key={i}
                  item={item}
              />
              )
          )}
        </React.Fragment>
    )
  }
}

export default App;
