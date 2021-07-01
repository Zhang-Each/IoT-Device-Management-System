import React from 'react';
import Register from "../components/LogIn/Register";
import cover from "../img/4.jpg"

let back = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${cover})`,
    display: "flex",
}

class RegisterPage extends React.Component {
    render() {
        return (
            <div style={back}>
                <Register history={this.props.history}/>
            </div>
        )
    }
}

export default RegisterPage;