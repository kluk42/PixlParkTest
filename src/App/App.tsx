import { useEffect, useState } from 'react';
import './App.css';

import Api from '../utils/Api/Api';
import Order from '../components/Order/Order';

import { OrderType } from '../components/Order/types';

const App = () => {
    const [orders, setOrders] = useState<OrderType[] | null>(null);
    useEffect(() => {
        if (orders === null) {
            const api = new Api();
            const onStart = async () => {
                await api.init();
                const orders = await api.getOrders(7);
                if (orders) {
                    setOrders(() => orders);
                }
            }
            onStart();
        }
    }, [orders]);
    return (
        <div className="App">
            {
                Array.isArray(orders) && orders.map(order =>{
                    return (
                        <Order
                            key={order.Id}
                            title={order.Title}
                            dateCreated={order.DateCreated}
                            phone={order.Shipping.Phone}
                            price={order.TotalPrice}
                            discount={order.DiscountTitle}
                            address={order.DeliveryAddress.AddressLine1 + ' ' + order.DeliveryAddress.City}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
