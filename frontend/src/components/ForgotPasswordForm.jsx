import { useState } from 'react';
import { requestPasswordReset } from '../api/forgotPasswordApi';

const initialFormState = {
  identifier: '',
  reference: '',
  email: ''
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ForgotPasswordForm() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.identifier.trim()) {
      next.identifier = 'Identifier is required.';
    } else if (form.identifier.trim().length > 80) {
      next.identifier = 'Identifier must be 80 characters or fewer.';
    }

    if (!form.reference.trim()) {
      next.reference = 'Reference text is required.';
    } else if (form.reference.trim().length > 200) {
      next.reference = 'Reference may not exceed 200 characters.';
    }

    if (!form.email.trim()) {
      next.email = 'Email is required.';
    } else if (!emailPattern.test(form.email)) {
      next.email = 'Enter a valid email address.';
    }

    return next;
  };

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await requestPasswordReset(form);
      setStatus({
        type: 'success',
        message: result?.message ?? 'Please check your email for reset instructions.'
      });
      setForm(initialFormState);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        (error?.response?.data?.errors?.length
          ? error.response.data.errors.map(({ msg }) => msg).join(' ')
          : 'Unable to submit your request right now.');
      setStatus({ type: 'error', message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="forgot-form" onSubmit={handleSubmit} noValidate>
      <p className="card-note">
        Reference and email fields appear directly below the Mahesh reference block so the support team can locate this request quickly.
      </p>

      <label className="field">
        Identifier (mobile number, username, or employee code)
        <input
          type="text"
          value={form.identifier}
          onChange={handleChange('identifier')}
          disabled={isSubmitting}
          placeholder="e.g. mahesh123"
          autoComplete="username"
        />
        {errors.identifier && <span className="field-error">{errors.identifier}</span>}
      </label>

      <label className="field">
        Reference (add this field right after the Mahesh reference box)
        <textarea
          value={form.reference}
          onChange={handleChange('reference')}
          disabled={isSubmitting}
          rows="3"
          placeholder="Describe why you're requesting the reset"
        />
        {errors.reference && <span className="field-error">{errors.reference}</span>}
      </label>

      <label className="field">
        Email (below the Mahesh block, used for confirmation)
        <input
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          disabled={isSubmitting}
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </label>

      <button type="submit" className="primary-action" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Send reset link'}
      </button>

      {status && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}
    </form>
  );
}

export default ForgotPasswordForm;
