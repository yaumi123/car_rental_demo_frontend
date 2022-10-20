import {ChangeEvent, FC, useState} from "react";
import {login} from "@/api";
import {IHasLoginProps} from "@/App";

interface ILoginState {
    username: string,
    password: string;
}

export const Login: FC<any> = (props: IHasLoginProps) => {

    const {hasLogin} = props;

    const [state, setState] = useState<ILoginState>({
        username: '', password: ''
    });
    const onUsername = (e: ChangeEvent) => {
        // @ts-ignore
        const {value} = e.currentTarget;
        setState({
            ...state,
            username: value
        })
    }

    const onPsw = (e: ChangeEvent) => {
        // @ts-ignore
        const {value} = e.currentTarget;
        setState({
            ...state,
            password: value
        })
    }

    const click = () => {
        login(state.username, state.password).then(res => {
            window.localStorage.setItem('username', res.name);
            window.localStorage.setItem('nickname', res.nickname);
            hasLogin();
        });
    }

    return (
        <div>
            <div>
                <input onChange={(e) => onUsername(e)} placeholder="username"/>
            </div>
            <div>
                <input onChange={(e) => onPsw(e)} placeholder="password" type={`password`}/>
            </div>
            <div>
                <button onClick={() => click()}>login</button>
            </div>
        </div>
    );
};
