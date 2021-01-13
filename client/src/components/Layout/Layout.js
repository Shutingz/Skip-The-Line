import React from 'react';
import Auxiliary from '../../high-order-component/Auxiliary';
import Header from './Header/Header';
import './Layout.css';

const layout = (props) => (
    <Auxiliary>
        <Header/>
        <main className='layout-main'>
            {props.children}
        </main>
    </Auxiliary>
);

export default layout;
