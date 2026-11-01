import { useState } from 'react';
import { normalizePhone } from '../utils/format';

const SOURCES = ['Telegram', 'Instagram', 'Boshqa'];

const emptyForm = {
  customer: '',
  phone: '',
  product: '',
  amount: '',
  source: 'Telegram',
};

// Qayta ishlatiladigan maydon: yorliq + kiritish joyi + xato matni
function Field({ label, error, children }) {
  return (
    <label className="field">
      {label}
      {children}
      {error && <small className="error">{error}</small>}
    </label>
  );
}

// O'ZGARDI: order propi qo'shildi (null bo'lsa yangi, bo'lmasa tahrirlash)
function OrderForm({ order, onSubmit, onClose }) {
  const isEditing = Boolean(order);

  // O'ZGARDI: tahrirlashda boshlang'ich qiymatlar buyurtmadan olinadi
  const [form, setForm] = useState(
    order
      ? {
          customer: order.customer,
          phone: order.phone,
          product: order.product,
          amount: String(order.amount),
          source: order.source,
        }
      : emptyForm
  );
  const [errors, setErrors] = useState({});

  // Har bir maydon uchun bitta umumiy funksiya (name atributi orqali)
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  }

  function validate() {
    const next = {};
    if (form.customer.trim().length < 2) next.customer = 'Mijoz ismini kiriting.';
    if (!normalizePhone(form.phone)) next.phone = "Telefon raqamni to'g'ri kiriting (90 123 45 67).";
    if (form.product.trim().length < 2) next.product = 'Mahsulot nomini kiriting.';
    if (!(Number(form.amount) > 0)) next.amount = "Summa 0 dan katta bo'lsin.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault(); // sahifa qayta yuklanmasin
    if (!validate()) return;

    onSubmit({
      customer: form.customer.trim(),
      phone: normalizePhone(form.phone),
      product: form.product.trim(),
      amount: Number(form.amount),
      source: form.source,
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {/* O'ZGARDI: sarlavha holatga qarab */}
          <h2>{isEditing ? 'Buyurtmani tahrirlash' : 'Yangi buyurtma'}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Yopish">
            ✕
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <Field label="Mijoz ismi" error={errors.customer}>
            <input
              name="customer"
              value={form.customer}
              onChange={handleChange}
              placeholder="Masalan: Ali Valiyev"
              className={errors.customer ? 'invalid' : ''}
              autoFocus
            />
          </Field>

          <Field label="Telefon raqam" error={errors.phone}>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+998 90 123 45 67"
              className={errors.phone ? 'invalid' : ''}
            />
          </Field>

          <Field label="Mahsulot" error={errors.product}>
            <input
              name="product"
              value={form.product}
              onChange={handleChange}
              placeholder="Masalan: Sport krossovka"
              className={errors.product ? 'invalid' : ''}
            />
          </Field>

          <Field label="Summa (so'm)" error={errors.amount}>
            <input
              name="amount"
              type="number"
              min="0"
              value={form.amount}
              onChange={handleChange}
              placeholder="Masalan: 250000"
              className={errors.amount ? 'invalid' : ''}
            />
          </Field>

          <Field label="Buyurtma manbai">
            <select name="source" value={form.source} onChange={handleChange}>
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Bekor qilish
            </button>
            <button type="submit" className="btn btn-primary">
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;