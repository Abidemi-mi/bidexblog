"use client"
import React, { useEffect } from 'react'

const Error = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to the console for debugging
    console.error("Global Error Boundary caught:", error)
  }, [error])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '2rem',
      textAlign: 'center',
      color: '#f1f5f9',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      margin: '2rem'
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Oops! Something went wrong</h2>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
        {error?.message || "An unexpected error occurred while rendering the page."}
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          onClick={() => reset()} 
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
        <button 
          onClick={() => window.location.href = '/'} 
          style={{
            padding: '0.75rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Go Home
        </button>
      </div>
      <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#64748b' }}>
        If this persists, please try clearing your browser cache or logging out and back in.
      </p>
    </div>
  )
}

export default Error