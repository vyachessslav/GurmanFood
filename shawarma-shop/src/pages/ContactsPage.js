import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ContactsPage = () => {
    return (
        <div className="bg-light">
            <div className="py-5">
                <div className="container py-5 bg-white shadow-sm card-height">
                    <h5>
                        <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                        Контакты
                    </h5>
                    <br />
                    <p>
                        <b>Телефон:</b> 8 800 555 35 35<br />
                        <b>E-mail:</b> v.c.charkin@gmail.com
                    </p>
                    <br />
                    <h6>Рабочие часы</h6>
                    <p>
                        Ресторан открыт с 08:00 до 22:00 без перерывов и выходных. <br />
                        Онлайн-заказы принимаются круглосуточно.
                    </p>
                    <br />
                    <h6>Доставка</h6>
                    <p>Доставка заказов осуществляется через курьерскую службу.</p>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;