
import { User } from '../types';

const USERS_DB_KEY = 'globalpath_users_db';
const CURRENT_USER_KEY = 'globalpath_current_user';

// Secure hashing using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const authService = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_DB_KEY);
    return data ? JSON.parse(data) : [];
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  signup: async (name: string, email: string, password: string): Promise<User> => {
    const users = authService.getUsers();
    
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    const passwordHash = await hashPassword(password);
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      passwordHash,
      role: 'user',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(updatedUsers));
    
    // Auto-login (omit passwordHash from storage)
    const { passwordHash: pHash, ...userWithoutPass } = newUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPass));
    return userWithoutPass as User;
  },

  login: async (email: string, password: string): Promise<User> => {
    const users = authService.getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) throw new Error('Invalid email or password');

    const incomingHash = await hashPassword(password);
    if (user.passwordHash !== incomingHash) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));

    const { passwordHash: pHash, ...userWithoutPass } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPass));
    return userWithoutPass as User;
  },

  resetPassword: async (email: string, newPassword: string): Promise<void> => {
    const users = authService.getUsers();
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
      throw new Error('No user found with this email address');
    }

    const newHash = await hashPassword(newPassword);
    users[userIndex].passwordHash = newHash;
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  updateProfile: (updatedData: Partial<User>): User | null => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return null;

    const users = authService.getUsers();
    const updatedUsers = users.map(u => u.id === currentUser.id ? { ...u, ...updatedData } : u);
    
    const updatedUser = { ...currentUser, ...updatedData };
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(updatedUsers));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  }
};
