import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { LanguageContext } from '../context/LanguageContext.jsx';
import Title from './Title';

const CartTotal = () => {
  const { formatPrice, delivery_fee, getCartAmount } = useContext(ShopContext);
  const { t } = useContext(LanguageContext);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark p-4 rounded-md shadow-md border border-accent dark:border-primary">
      <div className="text-2xl text-heading dark:text-textDark">
        <Title text1={t('cart')} text2={t('total')} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p className="text-subtext dark:text-primary">{t('subtotal')}</p>
          <p>{formatPrice(subtotal)}</p>
        </div>
        <hr className="border-accent dark:border-primary" />
        <div className="flex justify-between">
          <p className="text-subtext dark:text-primary">{t('shipping_fee')}</p>
          <p>{formatPrice(delivery_fee)}</p>
        </div>
        <hr className="border-accent dark:border-primary" />
        <div className="flex justify-between font-semibold">
          <b className="text-heading dark:text-textDark">{t('total')}</b>
          <b className="text-heading dark:text-textDark">{formatPrice(total)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
