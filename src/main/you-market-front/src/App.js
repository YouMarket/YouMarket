import React, {Component} from 'react';
import Header from './Header'
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
         <div>
          <Header/>
          <Productos/>
         </div>
        );
    }
}
 
export default App;