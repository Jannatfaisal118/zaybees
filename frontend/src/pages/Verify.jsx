import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { LanguageContext } from '../context/LanguageContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
  const { t } = useContext(LanguageContext)
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
  const [searchParams] = useSearchParams()

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyPayment = async () => {
    try {
      if (!token) return

      const response = await axios.post(
        backendUrl + '/api/order/verifyStripe',
        { success, orderId },
        { headers: { token } }
      )

      if (response.data.success) {
        setCartItems({})
        toast.success(t('paymentVerified'))
        navigate('/orders')
      } else {
        toast.error(t('paymentFailed'))
        navigate('/cart')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
      navigate('/cart')
    }
  }

  useEffect(() => {
    if (token) {
      verifyPayment()
    }
  }, [token])

  return (
    <div className='flex items-center justify-center min-h-[60vh] text-center text-xl text-textLight dark:text-accent'>
      {t('verifyingPayment')}
    </div>
  )
}

export default Verify
