import React, {FC, useEffect, useState} from "react";
import {IOrderListProps} from "@/order.place";
import {cancelOrder} from "@/api";

export const OrderList: FC<any> = (props: IOrderListProps) => {
    const {orders, refresh} = props;

    const [orderList, setOrderList] = useState<JSX.Element[]>([]);

    const click = (orderId: string) => {
        cancelOrder(orderId).then(res => refresh())
    }

    useEffect(() => {
        setOrderList(orders.map(order => (<tr>
            <td>{order.id}</td>
            <td>{order.user}</td>
            <td>{order.car_model}</td>
            <td>{order.create_at}</td>
            <td>{`${order.active}`}</td>
            {order.active && <td>
                <button onClick={() => click(order.id)}>cancel</button>
            </td>}
        </tr>)));
    }, [props]);

    return (<div>my orders
        <table>
            <tr>
                <td>orderID</td>
                <td>user</td>
                <td>model</td>
                <td>date</td>
                <td>active</td>
            </tr>
            {orderList}
        </table>
    </div>)
}
