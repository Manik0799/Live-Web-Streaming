import React from "react";
import {connect} from "react-redux";
import { fetchStream } from "../actions";
import flv from "flv.js";

class StreamShow extends React.Component{

    constructor(props){
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount(){
        // Getting the stream from stream id
        this.props.fetchStream(this.props.match.params.id);
        this.buildPlayer();
    }

    componentDidUpdate(){
        this.buildPlayer();
    }

    componentWillUnmount(){
        this.player.destroy();
    }

    buildPlayer(){

        // Checking fot the initial case when the player is first loaded
        if(this.player || !this.props.currentStream){
            return ;
        } 

        this.player= flv.createPlayer({
            type : "flv",
            url : `http://localhost:8000/live/${this.props.match.params.id}.flv` 
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render(){

        if(!this.props.currentStream){
            return <div>Loading ... </div>
        }

        return(
            <div className= "ui container">
                <video ref= {this.videoRef} style= {{width : "100%"}} controls= {true}></video>
                <h2>{this.props.currentStream.title}</h2>
                <br></br>
                <h5>{this.props.currentStream.description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {currentStream : state.streams[ownProps.match.params.id] }
}
export default connect(
    mapStateToProps ,
    { fetchStream }
)(StreamShow);
