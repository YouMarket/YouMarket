import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
 
class App extends Component {
 
    state = {};
 
    componentDidMount() {
        setInterval(this.hello, 250);
    }
 
    hello = () => {
        fetch('/producto/list')
            .then(response => response.text())
            .then(message => {
                this.setState({message: message});
            });
    };
 
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Prueba</h1>
                    
                </header>
                {this.state.message}
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}
 
export default App;