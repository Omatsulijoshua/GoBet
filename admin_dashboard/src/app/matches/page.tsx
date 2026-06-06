"use client";

import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function MatchesPage() {
  const [showForm, setShowForm] = useState(false);

  const matches = [
    { id: 1, home: 'Real Madrid', away: 'Barcelona', sport: 'Soccer', status: 'LIVE', time: '45\'' },
    { id: 2, home: 'Lakers', away: 'Warriors', sport: 'Basketball', status: 'PENDING', time: 'Tomorrow' },
    { id: 3, home: 'Man City', away: 'Arsenal', sport: 'Soccer', status: 'PENDING', time: '2 days' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Matches Management</h2>
          <p style={{ color: 'var(--text-muted)' }}>Create, monitor, and resolve sports matches</p>
        </div>
        <button 
          className="btn btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={20} />
          <span>New Match</span>
        </button>
      </div>

      {showForm && (
        <div className="glass-card" style={{ padding: '32px', marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '24px' }}>Create New Match</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Home Team</label>
              <input type="text" className="glass-card" style={{ padding: '12px', background: 'var(--bg-secondary)', color: 'white', border: '1px solid var(--border-color)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Away Team</label>
              <input type="text" className="glass-card" style={{ padding: '12px', background: 'var(--bg-secondary)', color: 'white', border: '1px solid var(--border-color)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Sport</label>
              <select className="glass-card" style={{ padding: '12px', background: 'var(--bg-secondary)', color: 'white', border: '1px solid var(--border-color)' }}>
                <option>Soccer</option>
                <option>Basketball</option>
                <option>Tennis</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Start Time</label>
              <input type="datetime-local" className="glass-card" style={{ padding: '12px', background: 'var(--bg-secondary)', color: 'white', border: '1px solid var(--border-color)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button className="btn btn-primary">Create Match</button>
            <button className="btn" style={{ background: 'var(--bg-secondary)', color: 'white' }} onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '16px' }}>
        {matches.map((match) => (
          <div key={match.id} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div style={{ textAlign: 'center', width: '120px' }}>
                <p style={{ fontWeight: 700, fontSize: '18px' }}>{match.home}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Home</p>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-primary)' }}>VS</div>
              <div style={{ textAlign: 'center', width: '120px' }}>
                <p style={{ fontWeight: 700, fontSize: '18px' }}>{match.away}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Away</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                <Clock size={16} />
                <span style={{ fontSize: '14px' }}>{match.time}</span>
              </div>
              <div style={{ 
                padding: '6px 12px', 
                borderRadius: '8px', 
                fontSize: '12px', 
                fontWeight: 600,
                background: match.status === 'LIVE' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                color: match.status === 'LIVE' ? '#ef4444' : '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', animation: match.status === 'LIVE' ? 'pulse 2s infinite' : 'none' }}></div>
                {match.status}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn" style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <CheckCircle size={20} />
                </button>
                <button className="btn" style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                  <XCircle size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
