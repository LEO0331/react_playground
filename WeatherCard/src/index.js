import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplays from './SeasonDisplays';
import Spinner from './Spinner';

class App extends Component{
  constructor(props){ //state = {lat: null, errMessage: ''}
    super(props);
    this.state = { //default
      lat: null,
      errMessage: ''
    }; 
  }

  componentDidMount(){ //data loading
    window.navigator.geolocation.getCurrentPosition( //https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
      position => {
        let crd = position.coords;
        this.setState({
          lat: crd.latitude
        });
      }, //callback function; will call render() second time
      err => { //err => console.warn(`ERROR(${err.code}): ${err.message}`);
        this.setState({
          errMessage: err.message
        });
      } 
    );
  }
  renderContent(){ //avoid conditionals in Render
    if(this.state.lat && !this.state.errMessage){
      return <SeasonDisplays lat={this.state.lat}/>
    } 
    if(!this.state.lat && this.state.errMessage){
      return <div>Error: {this.state.errMessage}</div>;
    }  
    return <Spinner message="Please accept location request" />;
  }

  render() {
    return ( //Semantic UI dont have build in class for border
      <div className="border-1">
        {this.renderContent()}
      </div>
    );
  };
};

ReactDOM.render(
  <App />, document.getElementById('root')
);
