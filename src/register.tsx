import {ChangeEvent, FC, useState} from "react";
import {register} from "@/api";
import {IHasLoginProps} from "@/App";

interface IRegister {
    username: string,
    nickname: string,
    password: string;
}

export const Register: FC<any> = (props: IHasLoginProps) => {
    const {hasLogin} = props;

    const [state, setState] = useState<IRegister>({
        username: '', nickname: '', password: ''
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

    const onNickname = (e: ChangeEvent) => {
        // @ts-ignore
        const {value} = e.currentTarget;
        setState({
            ...state,
            nickname: value
        })
    }

    const click = () => {
        register(state.username, state.nickname, state.password).then(res => {
            window.localStorage.setItem('username', res.name);
            window.localStorage.setItem('nickname', res.nickname);
            alert(`registered!`);
            hasLogin();
        });
    }

    return (
        <div>
            <div>
                <input onChange={(e) => onUsername(e)} placeholder="username"/>
            </div>
            <div>
                <input onChange={(e) => onNickname(e)} placeholder="nickname"/>
            </div>
            <div>
                <input onChange={(e) => onPsw(e)} placeholder="password" type={`password`}/>
            </div>
            <div>
                <button onClick={() => click()}>register</button>
            </div>
        </div>
    );
}
