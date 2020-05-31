import React from "react";
import { Field, reduxForm } from "redux-form";


class StreamForm extends React.Component{

    renderErrors(meta){

        if(meta.touched && meta.error){
            return(
                <div className="ui error message">
                    <div className= "ui header">{meta.error}</div>
                </div>
            );
        }
    }

    renderInput =({input, label, meta}) =>{

        // To turn the input as well to be red when there is an error
        const className = `field ${meta.error && meta.touched ? "error" : ""}`;

        return (
            <div className= {className}>
                <label>{label}</label>
                <input  {...input} autoComplete= "off" />
                {this.renderErrors(meta)}
            </div>
        )
    }

    onSubmit = (formValues) =>{

        // onSubmit fxn is being passed as a prop by the parent component
        this.props.onSubmit(formValues);

    }

    render(){

        // handleSubmit is a built in function of redux-form
        return(
            <div className= "ui container">
                <form className= "ui form error" onSubmit = {this.props.handleSubmit(this.onSubmit)}>
                    <Field name= "title" component= {this.renderInput} label= "Stream Title"/>
                    <Field name= "description" component= {this.renderInput} label= "Description"/>
                    <button className= "ui button primary">Submit</button>
                </form>
            </div>
        );
    }
}

// This fxn validates our form, don't forget to wire it up with the redux form down
const validate= (formValues) =>{
    const errors= {};

    if(!formValues.title){
        errors.title= "You must enter a title";
    } 
    if(!formValues.description){
        errors.description= "You must enter a description";
    }

    return errors;

}


export default reduxForm({
    form : "streamForm",
    validate : validate
})(StreamForm);
