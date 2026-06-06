"use client";

import React from 'react';
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function Home() {
  const stats = [
    { name: 'Total Users', value: '1,284', change: '+12%', icon: Users, color: '#6366f1' },
    { name: 'Active Bets', value: '452', change: '+5%', icon: Trophy, color: '#a855f7' },
    { name: 'Total Volume', value: '$42,580', change: '+24%', icon: TrendingUp, color: '#10b981' },
    { name: 'Platform Revenue', value: '$2,145', change: '-2%', icon: DollarSign, color: '#f59e0b' },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '24px',
        marginBottom: '40px'
      }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <div key={stat.name} className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: `rgba(${parseInt(stat.color.slice(1,3), 16)}, ${parseInt(stat.color.slice(3,5), 16)}, ${parseInt(stat.color.slice(5,7), 16)}, 0.15)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color
                }}>
                  <Icon size={24} />
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  color: isPositive ? '#10b981' : '#ef4444',
                  fontSize: '14px',
                  fontWeight: 600
                }}>
                  {stat.change}
                  {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}>{stat.name}</p>
              <h3 style={{ fontSize: '28px', fontWeight: 700 }}>{stat.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Main Sections */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '24px' 
      }}>
        {/* Recent Activity */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Recent Bets</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>User</th>
                <th style={{ padding: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>Match/Market</th>
                <th style={{ padding: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>Amount</th>
                <th style={{ padding: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 12px' }}>0x71C...3a2{i}</td>
                  <td style={{ padding: '16px 12px' }}>Real Madrid vs Barcelona</td>
                  <td style={{ padding: '16px 12px' }}>0.5 ETH</td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      background: 'rgba(16, 185, 129, 0.1)', 
                      color: '#10b981' 
                    }}>Pending</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Markets */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Hot Markets</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { q: 'BTC to $100k?', vol: '$12.4k', img: '₿' },
              { q: 'ETH 2.0 Payout?', vol: '$8.2k', img: 'Ξ' },
              { q: 'Solana ATH?', vol: '$5.1k', img: '◎' },
            ].map((m) => (
              <div key={m.q} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>{m.img}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: '14px' }}>{m.q}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Volume: {m.vol}</p>
                </div>
                <div style={{ width: '48px', height: '4px', background: 'var(--bg-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '70%', height: '100%', background: 'var(--accent-primary)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
