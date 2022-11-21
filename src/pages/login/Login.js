import { useLogin } from '../../hooks/useLogin';
//styles
import { useState } from 'react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>

      <label>
        <span>Email:</span>
        <input required type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </label>
      <label>
        <span>Password:</span>
        <input required type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && (
        <button className="btn" disabled>
          loading
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
