"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Trophy, 
  TrendingUp, 
  Users, 
  Settings, 
  Bell, 
  Search,
  User
} from 'lucide-react';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Matches', href: '/matches', icon: Trophy },
    { name: 'Markets', href: '/markets', icon: TrendingUp },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>G</div>
          <span className={styles.logoText}>GoBet Admin</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.titleSection}>
            <h1>Dashboard</h1>
            <p>Welcome back, Admin</p>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={18} color="#94a3b8" />
              <input 
                type="text" 
                placeholder="Search..." 
                style={{ background: 'none', border: 'none', color: 'white', outline: 'none', width: '200px' }}
              />
            </div>
            <button className="glass-card" style={{ padding: '10px' }}>
              <Bell size={20} />
            </button>
            <div className="glass-card" style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                <User size={18} />
              </div>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Admin</span>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
