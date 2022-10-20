import {ChangeEvent, FC, useEffect, useState} from "react";
import {getCarModelList, getUserOrderList, placeOrder} from "@/api";
import {OrderList} from "@/order.list";

interface CarModel {
    id: string,
    model: string,
    num: number;
}

export interface Order {
    id: string,
    user: string,
    car_model: string,
    create_at: string,
    active: boolean;
}

export interface IOrderListProps {
    orders: Array<Order>
    refresh: Function
}

export const OrderPlacer: FC<any> = () => {

    const [modelList, setModelList] = useState<Array<CarModel>>([]);

    const [modelElements, setModelElements] = useState<Array<JSX.Element>>([]);

    const [selectValue, setSelectValue] = useState<string>('');

    const [remaining, setRemaining] = useState<number>(0);

    const [orders, setOrders] = useState<Order[]>([]);

    const username = window.localStorage.getItem('username') || '';

    useEffect(() => {
        getUserOrderList(username).then(res => {
            setOrders(res);
        })
    }, [username])

    useEffect(() => {
        getCarModelList().then((res: Array<CarModel>) => {
            setModelList(res.sort((a, b) => {
                return a.model.localeCompare(b.model);
            }));
        });
    }, []);

    const refresh = () => {
        getCarModelList().then((res: Array<CarModel>) => {
            setModelList(res.sort((a, b) => {
                return a.model.localeCompare(b.model);
            }));
        });
        getUserOrderList(username).then(res => {
            setOrders(res);
        });
    };

    useEffect(() => {
        const options = modelList.map(model => (<option value={model.id}>{model.model}</option>));
        setModelElements(options);
    }, [modelList]);

    useEffect(() => {
        if (modelList.length && selectValue === '') {
            setSelectValue(modelList[0].id)
        }
    }, [modelList, selectValue])


    useEffect(() => {
        const current = modelList.filter(m => m.id === selectValue)[0];
        current && setRemaining(current.num);
    }, [modelList, selectValue, modelElements])

    const handleSelectChange = (e: ChangeEvent) => {
        // @ts-ignore
        const {value} = e.currentTarget;
        setSelectValue(value);
    }

    const click = () => {
        placeOrder(username, selectValue).then(res => refresh())
    }

    return (
        <div>
            <select value={selectValue} onChange={(e) => handleSelectChange(e)}>
                {modelElements}
            </select>
            <div>remaining: {remaining}</div>
            <button onClick={() => click()}>place order</button>
            <OrderList orders={orders} refresh={refresh}/>
        </div>)
}
