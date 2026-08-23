// src/features/checkout/components/AddressForm.tsx
'use client';

import { FormEvent, useState } from 'react';
import type { AddressData } from '@/core/types/address';
import styles from '../styles/CheckoutPage.module.css';

type Props = {
  initialValue?: AddressData;
  onSubmit: (data: AddressData) => void;
};

type FieldName =
  | 'fullName'
  | 'phone'
  | 'zipCode'
  | 'street'
  | 'number'
  | 'complement'
  | 'district'
  | 'city'
  | 'state'
  | 'reference';

type FormState = {
  [K in FieldName]: string;
};

type Errors = Partial<Record<FieldName, string>>;

const REQUIRED_FIELDS: FieldName[] = [
  'fullName',
  'phone',
  'zipCode',
  'street',
  'number',
  'district',
  'city',
  'state',
];

function mapInitialValue(initial?: AddressData): FormState {
  return {
    fullName: initial?.fullName ?? '',
    phone: initial?.phone ?? '',
    zipCode: initial?.zipCode ?? '',
    street: initial?.street ?? '',
    number: initial?.number ?? '',
    complement: initial?.complement ?? '',
    district: initial?.district ?? '',
    city: initial?.city ?? '',
    state: initial?.state ?? '',
    reference: initial?.reference ?? '',
  };
}

export default function AddressForm({ initialValue, onSubmit }: Props) {
  const [form, setForm] = useState<FormState>(() => mapInitialValue(initialValue));
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: FieldName, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const nextErrors: Errors = {};

    REQUIRED_FIELDS.forEach((field) => {
      if (!form[field] || form[field].trim().length === 0) {
        nextErrors[field] = 'Campo obrigatório';
      }
    });

    if (form.zipCode && form.zipCode.replace(/\D/g, '').length < 8) {
      nextErrors.zipCode = 'Informe um CEP válido';
    }

    if (form.phone && form.phone.replace(/\D/g, '').length < 10) {
      nextErrors.phone = 'Informe um telefone válido';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload: AddressData = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      zipCode: form.zipCode.trim(),
      street: form.street.trim(),
      number: form.number.trim(),
      complement: form.complement.trim() || undefined,
      district: form.district.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      reference: form.reference.trim() || undefined,
    };

    onSubmit(payload);
    setIsSubmitting(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGrid}>
        {/* Nome completo */}
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="fullName">
            Nome completo<span className={styles.fieldRequired}>*</span>
          </label>
          <div className={styles.fieldControl}>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              className={`${styles.fieldInput} ${
                errors.fullName ? styles.fieldInputError : ''
              }`}
              placeholder="Quem irá receber o pedido?"
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
            {errors.fullName && (
              <p className={styles.fieldError}>{errors.fullName}</p>
            )}
          </div>
        </div>

        {/* Telefone */}
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="phone">
            Telefone<span className={styles.fieldRequired}>*</span>
          </label>
          <div className={styles.fieldControl}>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={`${styles.fieldInput} ${
                errors.phone ? styles.fieldInputError : ''
              }`}
              placeholder="(11) 99999-9999"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            {errors.phone && (
              <p className={styles.fieldError}>{errors.phone}</p>
            )}
          </div>
        </div>

        {/* CEP */}
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="zipCode">
            CEP<span className={styles.fieldRequired}>*</span>
          </label>
          <div className={styles.fieldControl}>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              autoComplete="postal-code"
              className={`${styles.fieldInput} ${
                errors.zipCode ? styles.fieldInputError : ''
              }`}
              placeholder="00000-000"
              value={form.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
            />
            {errors.zipCode && (
              <p className={styles.fieldError}>{errors.zipCode}</p>
            )}
          </div>
        </div>

        {/* Rua */}
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="street">
            Rua<span className={styles.fieldRequired}>*</span>
          </label>
          <div className={styles.fieldControl}>
            <input
              id="street"
              name="street"
              type="text"
              autoComplete="address-line1"
              className={`${styles.fieldInput} ${
                errors.street ? styles.fieldInputError : ''
              }`}
              placeholder="Nome da rua, avenida, etc."
              value={form.street}
              onChange={(e) => handleChange('street', e.target.value)}
            />
            {errors.street && (
              <p className={styles.fieldError}>{errors.street}</p>
            )}
          </div>
        </div>

        {/* Número */}
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="number">
            Número<span className={styles.fieldRequired}>*</span>
          </label>
          <div className={styles.fieldControl}>
            <input
              id="number"
              name="number"
              type="text"
              className={`${styles.fieldInput} ${
                errors.number ? styles.fieldInputError : ''
              }`}
              placeholder="Nº"
              value={form.number}
              onChange={(e) => handleChange('number', e.target.value)}
            />
            {errors.number && (
              <p className={styles.fieldError}>{errors.number}</p>
            )}
          </div>
        </div>

        {/* Complemento */}
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="complement">
            Complemento
          </label>
          <div className={styles.fieldControl}>
            <input
              id="complement"
              name="complement"
              type="text"
              className={styles.fieldInput}
              placeholder="Apto, bloco, referência interna..."
              value={form.complement}
              onChange={(e) => handleChange('complement', e.target.value)}
            />
          </div>
        </div>

        {/* Bairro */}
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="district">
            Bairro<span className={styles.fieldRequired}>*</span>
          </label>
          <div className={styles.fieldControl}>
            <input
              id="district"
              name="district"
              type="text"
              autoComplete="address-level3"
              className={`${styles.fieldInput} ${
                errors.district ? styles.fieldInputError : ''
              }`}
              placeholder="Bairro"
              value={form.district}
              onChange={(e) => handleChange('district', e.target.value)}
            />
            {errors.district && (
              <p className={styles.fieldError}>{errors.district}</p>
            )}
          </div>
        </div>

        {/* Cidade */}
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="city">
            Cidade<span className={styles.fieldRequired}>*</span>
          </label>
          <div className={styles.fieldControl}>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              className={`${styles.fieldInput} ${
                errors.city ? styles.fieldInputError : ''
              }`}
              placeholder="Cidade"
              value={form.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
            {errors.city && (
              <p className={styles.fieldError}>{errors.city}</p>
            )}
          </div>
        </div>

        {/* Estado */}
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="state">
            Estado<span className={styles.fieldRequired}>*</span>
          </label>
          <div className={styles.fieldControl}>
            <input
              id="state"
              name="state"
              type="text"
              autoComplete="address-level1"
              className={`${styles.fieldInput} ${
                errors.state ? styles.fieldInputError : ''
              }`}
              placeholder="UF (MG, SP, RJ...)"
              value={form.state}
              onChange={(e) => handleChange('state', e.target.value)}
            />
            {errors.state && (
              <p className={styles.fieldError}>{errors.state}</p>
            )}
          </div>
        </div>

        {/* Referência */}
        <div className={styles.fieldFull}>
          <label className={styles.fieldLabel} htmlFor="reference">
            Ponto de referência
          </label>
          <div className={styles.fieldControl}>
            <input
              id="reference"
              name="reference"
              type="text"
              className={styles.fieldInput}
              placeholder="Próximo a, em frente a..."
              value={form.reference}
              onChange={(e) => handleChange('reference', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <button
          type="submit"
          className={styles.primaryButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : 'Continuar para pagamento'}
        </button>
      </div>
    </form>
  );
}
