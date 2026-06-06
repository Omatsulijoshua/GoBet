"use client";

import React from 'react';
import { User, Wallet, History, ShieldAlert } from 'lucide-react';

export default function UsersPage() {
  const users = [
    { id: 1, wallet: '0x71C...3a21', bets: 12, spent: '4.5 ETH', status: 'ACTIVE' },
    { id: 2, wallet: '0x123...abcD', bets: 8, spent: '2.1 ETH', status: 'ACTIVE' },
    { id: 3, wallet: '0x999...9999', bets: 45, spent: '12.8 ETH', status: 'FLAGGED' },
    { id: 4, wallet: '0xabc...def0', bets: 0, spent: '0 ETH', status: 'NEW' },
  ];

  return (
    <div className="glass-card" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700 }}>User Management</h2>
          <p style={{ color: 'var(--text-muted)' }}>Monitor user activity and wallet interactions</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Sort by:</span>
            <select style={{ background: 'none', border: 'none', color: 'white', fontWeight: 600 }}>
              <option>Highest Spent</option>
              <option>Recent Activity</option>
              <option>Bet Count</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {users.map((user) => (
          <div key={user.id} className="glass-card" style={{ 
            padding: '20px 24px', 
            display: 'grid', 
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr 100px',
            alignItems: 'center',
            background: user.status === 'FLAGGED' ? 'rgba(239, 68, 68, 0.03)' : 'var(--bg-card)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'var(--bg-secondary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Wallet size={18} color="var(--accent-primary)" />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '15px' }}>{user.wallet}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: #{user.id}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={16} color="var(--text-muted)" />
              <span style={{ fontSize: '14px' }}>{user.bets} Bets Placed</span>
            </div>

            <div style={{ fontWeight: 600, fontSize: '15px' }}>{user.spent}</div>

            <div>
              <span style={{ 
                padding: '4px 10px', 
                borderRadius: '6px', 
                fontSize: '11px', 
                fontWeight: 700,
                background: user.status === 'FLAGGED' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                color: user.status === 'FLAGGED' ? 'var(--error)' : 'var(--success)'
              }}>
                {user.status}
              </span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button className="btn" style={{ padding: '8px', background: 'var(--bg-secondary)', color: 'white' }}>
                <ShieldAlert size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
