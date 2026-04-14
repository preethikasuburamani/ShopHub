import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './CheckOut.css'

// ─────────────────────────────────────────────────────────
//  Field defined OUTSIDE component — fixes single-char bug
// ─────────────────────────────────────────────────────────
const Field = ({ label, name, placeholder, type = 'text', half = false, value, onChange, error }) => (
  <div className={`co-field ${half ? 'co-half' : 'co-full'}`}>
    <label className="co-label" htmlFor={name}>{label}</label>
    <input
      id={name}
      className={`co-input ${error ? 'co-input-error' : ''}`}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      autoComplete="off"
    />
    {error && <span className="co-error-msg">⚠ {error}</span>}
  </div>
)

const CheckOut = () => {

  const cartProduct = useSelector((state) => state.cart)
  const navigate    = useNavigate()

  const TotalPrice = cartProduct.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping   = TotalPrice > 50 ? 0 : 4.99
  const tax        = +(TotalPrice * 0.2).toFixed(2)
  const grandTotal = +(TotalPrice + shipping + tax).toFixed(2)

  const [step, setStep]     = useState(1)
  const [errors, setErrors] = useState({})
  const [form, setForm]     = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postcode: '',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  })

  const handleChange = (e) => {
    let { name, value } = e.target
    if (name === 'cardNumber') value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
    if (name === 'expiry')     value = value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2')
    if (name === 'cvv')        value = value.replace(/\D/g, '').slice(0, 4)
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateDelivery = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim())  e.lastName  = 'Last name is required'
    if (!form.email.trim())     e.email     = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.address.trim())   e.address   = 'Address is required'
    if (!form.city.trim())      e.city      = 'City is required'
    if (!form.postcode.trim())  e.postcode  = 'Postcode is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validatePayment = () => {
    const e = {}
    if (!form.cardName.trim()) e.cardName = 'Name on card is required'
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number'
    if (!form.expiry || form.expiry.length < 5) e.expiry = 'Expiry date is required'
    if (!form.cvv || form.cvv.length < 3)       e.cvv    = 'CVV is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // Form submit handlers — one per step
  const handleDeliverySubmit = (e) => {
    e.preventDefault()
    if (validateDelivery()) setStep(2)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    if (validatePayment()) setStep(3)
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setStep(4)
  }

  const GoBack = () => setStep(s => s - 1)

  // ── EMPTY CART ──
  if (cartProduct.length === 0) {
    return (
      <div className="emptycart">
        <div className="co-empty-icon"></div>
        <h1 className="message">Your Cart is empty. Please add product to cart</h1>
        <button className="cart-btn" onClick={() => navigate('/')}>Back to Shop</button>
      </div>
    )
  }

  // ── SUCCESS ──
  if (step === 4) {
    return (
      <div className="co-main">
        <div className="co-success">
          <div className="co-success-icon">✓</div>
          <h2 className="co-success-title">Order Placed!</h2>
          <p className="co-success-sub">Thanks, <strong>{form.firstName}</strong>! Your order is confirmed.</p>
          <p className="co-success-email">Confirmation sent to <strong>{form.email}</strong></p>
          <div className="co-success-items">
            {cartProduct.map(product => (
              <div key={product.id} className="co-success-row">
                <img src={product.image} alt={product.title} className="co-success-img" />
                <span className="co-success-name">{product.title}</span>
                <span className="co-success-qty">×{product.quantity}</span>
                <span className="co-success-price">£{(product.price * product.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <p className="co-success-total">Total Paid: <strong>£{grandTotal}</strong></p>
          <button className="cart-btn checkOut" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    )
  }

  // ── ORDER SUMMARY (reused in sidebar) ──
  const OrderSummary = () => (
    <div className="co-summary">
      <h3 className="co-summary-title"> Order Summary</h3>
      {cartProduct.map(product => (
        <div key={product.id} className="co-summary-item">
          <div className="co-summary-img-wrap">
            <img src={product.image} alt={product.title} className="co-summary-img" />
            <span className="co-qty-badge">{product.quantity}</span>
          </div>
          <div className="co-summary-info">
            <p className="co-summary-name">{product.title}</p>
            <p className="co-summary-rating">⭐ {product.rating}</p>
          </div>
          <p className="co-summary-price">£{(product.price * product.quantity).toFixed(2)}</p>
        </div>
      ))}
      <div className="co-divider" />
      <div className="co-row"><span>Subtotal</span><span>£{TotalPrice.toFixed(2)}</span></div>
      <div className="co-row">
        <span>Shipping</span>
        <span className={shipping === 0 ? 'co-free' : ''}>
          {shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}
        </span>
      </div>
      <div className="co-row"><span>VAT (20%)</span><span>£{tax.toFixed(2)}</span></div>
      <div className="co-divider" />
      <div className="co-row co-grand-total"><span>Total</span><span>£{grandTotal}</span></div>
      {shipping > 0 && (
        <p className="co-free-hint">Add £{(50 - TotalPrice).toFixed(2)} more for free shipping!</p>
      )}
    </div>
  )

  return (
    <div className="co-main">

      {/* ── PAGE HEADER ── */}
      <div className="co-header">
        <h1 className="co-title">Checkout</h1>
        <button className="co-back-link" onClick={() => navigate('/cart')}>← Back to Cart</button>
      </div>

      {/* ── STEPPER ── */}
      <div className="co-stepper">
        {['Delivery', 'Payment', 'Review'].map((label, i) => (
          <React.Fragment key={label}>
            <div className="co-step">
              <div className={`co-dot
                ${step > i + 1 ? 'co-dot-done' : ''}
                ${step === i + 1 ? 'co-dot-active' : ''}
              `}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`co-step-label ${step === i + 1 ? 'co-step-label-active' : ''}`}>
                {label}
              </span>
            </div>
            {i < 2 && <div className="co-step-line" />}
          </React.Fragment>
        ))}
      </div>

      {/* ── MAIN GRID ── */}
      <div className="co-grid">
        <div className="co-left">

          {/* STEP 1 — DELIVERY FORM */}
          {step === 1 && (
            <form className="co-card" onSubmit={handleDeliverySubmit} noValidate>
              <h2 className="co-card-title">
                <span className="co-card-icon"></span> Delivery Information
              </h2>

              <fieldset className="co-fieldset">
                <legend className="co-legend">Personal Details</legend>
                <div className="co-fields">
                  <Field
                    label="First Name" name="firstName" placeholder="preethika"
                    half value={form.firstName} onChange={handleChange} error={errors.firstName}
                  />
                  <Field
                    label="Last Name" name="lastName" placeholder="Subramani"
                    half value={form.lastName} onChange={handleChange} error={errors.lastName}
                  />
                  <Field
                    label="Email Address" name="email" placeholder="preethikasubramani@email.com"
                    type="email" value={form.email} onChange={handleChange} error={errors.email}
                  />
                  <Field
                    label="Phone (optional)" name="phone" placeholder="+44 7575121126"
                    type="tel" value={form.phone} onChange={handleChange} error={errors.phone}
                  />
                </div>
              </fieldset>

              <fieldset className="co-fieldset">
                <legend className="co-legend">Delivery Address</legend>
                <div className="co-fields">
                  <Field
                    label="Street Address" name="address" 
                    value={form.address} onChange={handleChange} error={errors.address}
                  />
                  <Field
                    label="City" name="city" 
                    half value={form.city} onChange={handleChange} error={errors.city}
                  />
                  <Field
                    label="Postcode" name="postcode" 
                    half value={form.postcode} onChange={handleChange} error={errors.postcode}
                  />
                </div>
              </fieldset>

              <button type="submit" className="cart-btn checkOut">
                Continue to Payment →
              </button>
            </form>
          )}

          {/* STEP 2 — PAYMENT FORM */}
          {step === 2 && (
            <form className="co-card" onSubmit={handlePaymentSubmit} noValidate>
              <h2 className="co-card-title">
                <span className="co-card-icon"></span> Payment Details
              </h2>

              <div className="co-card-badges">
                {['VISA', 'MASTERCARD', 'AMEX', 'PAYPAL'].map(c => (
                  <span key={c} className="co-badge">{c}</span>
                ))}
              </div>

              <fieldset className="co-fieldset">
                <legend className="co-legend">Card Information</legend>
                <div className="co-fields">
                  <Field
                    label="Name on Card" name="cardName" placeholder="Preethika Subramani"
                    value={form.cardName} onChange={handleChange} error={errors.cardName}
                  />
                  <Field
                    label="Card Number" name="cardNumber" placeholder="1234 5678 9012 3456"
                    value={form.cardNumber} onChange={handleChange} error={errors.cardNumber}
                  />
                  <Field
                    label="Expiry Date" name="expiry" placeholder="MM/YY"
                    half value={form.expiry} onChange={handleChange} error={errors.expiry}
                  />
                  <Field
                    label="CVV" name="cvv" placeholder="•••"
                    half value={form.cvv} onChange={handleChange} error={errors.cvv}
                  />
                </div>
              </fieldset>

              <p className="co-secure-note">Your payment details are encrypted and secure.</p>

              <div className="co-btn-row">
                <button type="button" className="co-back-btn" onClick={GoBack}>← Back</button>
                <button type="submit" className="cart-btn checkOut">Review Order →</button>
              </div>
            </form>
          )}

          {/* STEP 3 — REVIEW FORM */}
          {step === 3 && (
            <form className="co-card" onSubmit={handlePlaceOrder}>
              <h2 className="co-card-title">
                <span className="co-card-icon"></span> Review Your Order
              </h2>

              <div className="co-review-block">
                <div className="co-review-header">
                  <span>Delivery</span>
                  <button type="button" className="co-edit-btn" onClick={() => setStep(1)}>Edit</button>
                </div>
                <p className="co-review-text"><strong>{form.firstName} {form.lastName}</strong></p>
                <p className="co-review-text">{form.address}, {form.city}, {form.postcode}</p>
                <p className="co-review-text">{form.email}</p>
                {form.phone && <p className="co-review-text">{form.phone}</p>}
              </div>

              <div className="co-review-block">
                <div className="co-review-header">
                  <span>Payment</span>
                  <button type="button" className="co-edit-btn" onClick={() => setStep(2)}>Edit</button>
                </div>
                <p className="co-review-text"><strong>{form.cardName}</strong></p>
                <p className="co-review-text">
                  •••• •••• •••• {form.cardNumber.replace(/\s/g, '').slice(-4) || '——'}
                </p>
                <p className="co-review-text">Expires: {form.expiry}</p>
              </div>

              <div className="co-btn-row">
                <button type="button" className="co-back-btn" onClick={GoBack}>← Back</button>
                <button type="submit" className="cart-btn checkOut co-place-btn">
                  Place Order · £{grandTotal}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* ── RIGHT – Order Summary Sidebar ── */}
        <div className="co-right">
          <OrderSummary />
        </div>
      </div>

    </div>
  )
}

export default CheckOut
