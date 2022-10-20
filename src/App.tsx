import {Component} from 'react';
import {Login} from './login';
import {Register} from './register';
import {OrderPlacer} from "@/order.place";

interface IAppProps {
    showRegister: boolean
    login: boolean
}

export interface IHasLoginProps {
    hasLogin: Function
}

class App extends Component<any, IAppProps> {

    constructor(p: IAppProps) {
        super(p);
        this.state = p
    }

    componentDidMount() {
    }

    flipShowRegister() {
        this.setState({
            ...this.state,
            showRegister: !this.state.showRegister
        })
    }

    hasLogin() {
        this.setState({
            ...this.state,
            login: true
        })
    }

    refreshList() {

    }

    render() {
        // @ts-ignore
        return (<div>
            <div>
                CAR RENTAL
            </div>
            {!this.state.login && (<button onClick={() => this.flipShowRegister()}>
                {this.state.showRegister ? `Back to login` : `Don't have an account? Register now!`}
            </button>)}
            {!this.state.login && (this.state.showRegister ? (
                <Register hasLogin={() => this.hasLogin()}/>
            ) : (<Login hasLogin={() => this.hasLogin()}/>))}
            {this.state.login && (
                <OrderPlacer/>
            )}
        </div>);
    }
}

export default App;
