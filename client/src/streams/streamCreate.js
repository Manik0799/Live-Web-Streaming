import React from "react";
import {connect} from "react-redux";
import { createStream } from "../actions";
import StreamForm from "./streamForm";

class StreamCreate extends React.Component{

    onSubmit = (formValues) =>{
        // Creating a new stream in our API with the form data submitted by the user.
        this.props.createStream(formValues);
    }

    render(){

        return(
            <div className= "ui container">
                <h3>Create a Stream</h3>
                <StreamForm onSubmit= {this.onSubmit} />
            </div>
        );
    }
}


export default connect(
    null,
    {createStream}
)(StreamCreate)