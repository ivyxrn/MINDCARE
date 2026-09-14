import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('MINDCARE ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, () => this.setState({ hasError: false, error: null }));
      }

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#F6F1EA',
            color: '#183D36',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            padding: '40px 24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#FAF7F2',
              borderRadius: '24px',
              padding: '40px 48px',
              maxWidth: '560px',
              boxShadow: '0 8px 30px rgba(22, 57, 49, 0.08)',
              border: '1.5px solid rgba(24, 61, 54, 0.06)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌱</div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '2rem',
                fontWeight: 500,
                color: '#183D36',
                margin: '0 0 12px 0',
              }}
            >
              Let's try that again
            </h2>
            <p
              style={{
                fontSize: '1.08rem',
                color: '#557267',
                lineHeight: 1.5,
                margin: '0 0 28px 0',
              }}
            >
              A small hiccup occurred. You can safely return to your activities or reload.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  if (this.props.onReset) this.props.onReset();
                }}
                style={{
                  backgroundColor: '#265045',
                  color: '#FAF6F0',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                Return to Activities
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
