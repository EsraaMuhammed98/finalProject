import React, { useContext } from 'react';
import styles from './CashOrder.module.css';
import { cartContext } from '../../Context/CartContext';
import { useQuery } from 'react-query';

export default function CashOrder() {
  let {cashOnDelivery} = useContext(cartContext)

  async function cashPayment(){
    let response = await cashOnDelivery()
  }
  let {data} = useQuery('cash',cashPayment())
  return <>
    <h1>CashOrder</h1>
  </>
}
