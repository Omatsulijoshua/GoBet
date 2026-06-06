"use client";

import React from 'react';
import { Shield, Key, Bell, Globe } from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    { name: 'Security', desc: 'Manage access and admin permissions', icon: Shield },
    { name: 'API Keys', desc: 'Configure backend and Web3 connections', icon: Key },
    { name: 'Notifications', desc: 'System alerts and monitoring rules', icon: Bell },
    { name: 'Platform', desc: 'General GoBet configuration', icon: Globe },
  ];

  return (
    <div style={{ maxWidth: '800px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Settings</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Configure your admin dashboard and platform rules</p>

      <div style={{ display: 'grid', gap: '20px' }}>
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.name} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '14px', 
                background: 'rgba(99, 102, 241, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--accent-primary)'
              }}>
                <Icon size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>{section.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{section.desc}</p>
              </div>
              <div style={{ color: 'var(--text-muted)' }}>→</div>
            </div>
          );
        })}
      </div>

      <div className="glass-card" style={{ marginTop: '40px', padding: '32px' }}>
        <h3 style={{ marginBottom: '24px' }}>Danger Zone</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>These actions are irreversible and will affect the live platform.</p>
        <button className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          Reset Platform Data
        </button>
      </div>
    </div>
  );
}
