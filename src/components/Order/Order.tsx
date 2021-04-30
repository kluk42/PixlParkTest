import {Props} from './types';
import './Order.scss';

const Order: Props = ({title, address, phone, discount, price, dateCreated}) => {
    const mlSeconds = dateCreated.match(/\d+/)![0];
    const date = new Date(+mlSeconds);
    const dateToRender = date.toLocaleDateString();
    return (
        <div className="Order">
            <p className="Order__title">{title}</p>
            <div className="Order__field">
                <p className="Order__fieldHeader">Дата</p>
                <p className="Order__fieldContent">{dateToRender}</p>
            </div>
            <div className="Order__field">
                <p className="Order__fieldHeader">Адрес</p>
                <p className="Order__fieldContent">{address}</p>
            </div>
            <div className="Order__field">
                <p className="Order__fieldHeader">Телефон</p>
                <p className="Order__fieldContent">{phone}</p>
            </div>
            <div className="Order__field">
                <p className="Order__fieldHeader">Скидка</p>
                <p className="Order__fieldContent">{discount}</p>
            </div>
            <div className="Order__field">
                <p className="Order__fieldHeader">Цена</p>
                <p className="Order__fieldContent">{price}</p>
            </div>
        </div>
    )
}

export default Order;
