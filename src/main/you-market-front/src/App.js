import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Productos from './Productos';
 
class App extends Component {
 
    state = {};
 
//    componentDidMount() {
//        setInterval(this.hello, 250);
//    }
// 
//    hello = () => {
//        fetch('/producto/list')
//            .then(response => response.text())
//            .then(message => {
//                this.setState({message: message});
//            });
//    };
 
    render() {
        return (
          <Productos/>
        );
    }
}
 
export default App;