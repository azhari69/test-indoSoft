import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component{

  constructor(props){
    super(props)
    this.state ={
      items:[]
    }

  }

  componentDidMount(){
     fetch("https://api.github.com/users?since=5000")
    .then(response => response.json())
    .then(data => this.setState({items: data}));
  }

  hapus(itemId){
     const newList = this.state.items.filter(item => item.id !== itemId);
    this.setState({items: newList});
    
  }

  refresh()
  {
    const  newList = this.state.items;
    newList.splice(0, 5);
    this.setState({items: newList});

  }

  render(){
    const { items } = this.state

    return(
      <div>
      <Fragment>
       <h1>Who to follow</h1> 
       <button onClick={()=>this.refresh()}> refresh</button>

      </Fragment>

      <ul>

        {items.slice(0, 5).map((item, index) => 
          <li key={index}> <img src={item.avatar_url} width="50" height="50"/> <a href={item.html_url}> {item.login}</a> <button onClick={()=>this.hapus(item.id)} > hpus</button></li>
          )}
      </ul>
     
      </div>
    );
  }
}

export default App;