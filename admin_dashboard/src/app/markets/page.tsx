"use client";

import React, { useState } from 'react';
import { Plus, Check, X, TrendingUp, Search } from 'lucide-react';

export default function MarketsPage() {
  const [showForm, setShowForm] = useState(false);

  const markets = [
    { id: 1, question: 'Will Bitcoin reach $100k by end of 2026?', vol: '$1.2M', yes: '65%', no: '35%', status: 'OPEN' },
    { id: 2, question: 'Will Ethereum 2.0 transaction fees drop below $1?', vol: '$450k', yes: '40%', no: '60%', status: 'OPEN' },
    { id: 3, question: 'Will Solana overtake Ethereum in TVL by 2027?', vol: '$890k', yes: '25%', no: '75%', status: 'CLOSED' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Prediction Markets</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage decentralized prediction outcomes</p>
        </div>
        <button 
          className="btn btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={20} />
          <span>Create Market</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {markets.map((market) => (
          <div key={market.id} className="glass-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              right: 0, 
              padding: '8px 16px', 
              fontSize: '10px', 
              fontWeight: 800, 
              background: market.status === 'OPEN' ? 'var(--success)' : 'var(--text-muted)',
              color: 'white',
              borderBottomLeftRadius: '12px'
            }}>
              {market.status}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', borderRadius: '10px' }}>
                <TrendingUp size={20} />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Volume: {market.vol}</span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px', lineHeight: 1.4 }}>{market.question}</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <div className="glass-card" style={{ padding: '12px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.05)' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>YES</p>
                <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--success)' }}>{market.yes}</p>
              </div>
              <div className="glass-card" style={{ padding: '12px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.05)' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>NO</p>
                <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--error)' }}>{market.no}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-primary" style={{ flex: 1, padding: '12px', fontSize: '14px' }}>Resolve Yes</button>
              <button className="btn" style={{ flex: 1, padding: '12px', fontSize: '14px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}>Resolve No</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
