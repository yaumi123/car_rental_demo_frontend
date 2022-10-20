import axios, {Method} from "axios";
import {Order} from "@/order.place";

const baseUrl = "http://localhost:8080"

interface Resp {
    code: number,
    message: string,
    data: any;
}

const request = (api: string, method: Method, params?: any, data?: any) => {
    return new Promise<any>(resolve => {
        axios({
            url: baseUrl + api,
            method: method,
            params: params,
            data: data
        }).then((res) => {
            const response: Resp = res.data;
            if (response.code !== 200) {
                alert(response.message);
            } else {
                resolve(response.data);
            }
        });
    })
}

export const login = (username: string, password: string) => {
    return request("/user/login", "POST", {}, {username, password});
}

export const register = (username: string, nickname: string, password: string) => {
    return request("/user/register", "POST", {}, {username, nickname, password});
}

export const getCarModelList = () => {
    return request("/order/models", "GET", {});
}

export const getUserOrderList = (username: string): Promise<Order[]> => {
    return request("/order/user", "GET", {token: username});
}

export const placeOrder = (username: string, modelId: string) => {
    return request("/order/place", "POST", {token: username, modelId}, {});
}

export const cancelOrder = (orderId: string) => {
    return request("/order/cancel", "GET", {order: orderId}, {});
}
