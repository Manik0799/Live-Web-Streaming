import React from "react";
import { Router , Route } from "react-router-dom"

import StreamList from "../streams/streamList";
import StreamCreate from "../streams/streamCreate";
import StreamEdit from "../streams/streamEdit";
import StreamDelete from "../streams/streamDelete";
import StreamShow from "../streams/streamShow";

import Header from "./header";
import history from "../history";



function App(){
    return(

        <Router history= {history}>
            <div>
                <Header />
                <br></br>
                <Route path= "/" exact component={StreamList}></Route>
                <Route path= "/streams/show/:id" exact component={StreamShow}></Route>
                <Route path= "/streams/new" exact component={StreamCreate}></Route>
                <Route path= "/streams/edit/:id" exact component={StreamEdit}></Route>
                <Route path= "/streams/delete/:id" exact component={StreamDelete}></Route>
            </div>
        </Router>

    );
}

export default App;