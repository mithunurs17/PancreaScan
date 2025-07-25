import { User } from '../types';
import { db } from './database';

export class AuthService {
  private currentUser: User | null = null;

  async login(email: string, password: string): Promise<User> {
    try {
      // In a real implementation, this would verify credentials against the database
      const user = await db.getUserByEmail(email);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Log activity
      await db.logActivity({
        userId: user.id,
        type: 'login',
        description: 'User logged in',
        timestamp: new Date().toISOString()
      });

      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  async signup(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    phone?: string;
  }): Promise<User> {
    try {
      const { password, ...userInfo } = userData;
      const user = await db.createUser(userInfo);
      
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error('Signup failed');
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;
    
    const stored = localStorage.getItem('user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
    
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}

export const authService = new AuthService();