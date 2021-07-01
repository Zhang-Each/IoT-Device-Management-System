import React from 'react';
import LoginForm from "../components/LogIn/LoginForm";
import cover from "../img/3.jpg";
import "./Login.css";

let back = {
    width: "100%",
    height: "720px",
    backgroundImage: `url(${cover})`,
    display: "flex",
}

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={back}>
                <LoginForm history={this.props.history}/>
            </div>

        )
    }
}
export default LoginPage;