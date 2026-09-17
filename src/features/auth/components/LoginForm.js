import { useState } from 'react';
import { staffSignIn } from '../services/authService';

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const profile = await staffSignIn(email, password);
      if (onSuccess) {
        onSuccess(profile);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {errorMessage && (
        <div className="auth-error-banner" role="alert">
          <span aria-hidden="true">⚠️</span>
          <div>{errorMessage}</div>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="staff-email">Staff Email Address</label>
        <input
          id="staff-email"
          type="email"
          className="auth-input"
          placeholder="e.g. your-email@carmelitas.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="staff-password">Password</label>
        <div className="input-wrapper">
          <input
            id="staff-password"
            type={showPassword ? 'text' : 'password'}
            className="auth-input"
            placeholder="Enter your staff password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            disabled={loading}
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <button type="submit" className="auth-submit-btn" disabled={loading}>
        {loading ? (
          <>
            <span>Authenticating with Supabase...</span>
          </>
        ) : (
          <>
            <span>Sign In to Dashboard</span>
            <span aria-hidden="true">→</span>
          </>
        )}
      </button>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '14px',
          fontSize: '11px',
          color: 'var(--taupe)',
        }}
      >
        <span style={{ color: 'var(--green)', fontSize: '10px' }}>●</span>
        <span>Connected to Live Supabase Authentication</span>
      </div>
    </form>
  );
}

export default LoginForm;
