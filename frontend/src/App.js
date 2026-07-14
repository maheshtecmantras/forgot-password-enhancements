import ForgotPasswordForm from './components/ForgotPasswordForm';

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">Mahesh reference block</p>
        <h1>Forgot password assistance</h1>
        <p>
          Fill in the identifier, reference, and contact email so the support team can verify the request immediately.
        </p>
      </header>
      <main>
        <ForgotPasswordForm />
      </main>
    </div>
  );
}

export default App;
