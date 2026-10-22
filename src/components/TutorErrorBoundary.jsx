import React from 'react';

export class TutorErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Tutor caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            background: '#1e293b',
            color: '#f8fafc',
            borderRadius: '16px',
            border: '1px solid #334155',
            padding: '32px',
            maxWidth: '520px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#f87171' }}>
              Tutor Encountered an Issue
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '20px', lineHeight: 1.6 }}>
              {this.state.error?.message || 'A component error occurred while rendering the tutor.'}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: '#6366f1',
                  color: '#ffffff',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  if (this.props.onClose) this.props.onClose();
                }}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: '#334155',
                  color: '#f8fafc',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Close Tutor
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
