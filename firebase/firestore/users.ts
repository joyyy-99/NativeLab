import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase.config';
import type { AuthUser } from '../auth/types';

const db = getFirestore(app);

export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  createdAt: number;
  lastLoginAt: number;
  photoURL?: string;
  displayName?: string;
  // Language learning specific fields
  nativeLanguage?: string;
  learningLanguages?: string[];
  currentLevel?: number;
  streakCount?: number;
  xpPoints?: number;
}

export const createUserProfile = async (user: AuthUser, additionalData?: Partial<UserProfile>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      const userData: UserProfile = {
        uid: user.uid,
        email: user.email!,
        username: user.displayName || '',
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
        photoURL: user.photoURL || undefined,
        // Default values for new users
        nativeLanguage: '',
        learningLanguages: [],
        currentLevel: 1,
        streakCount: 0,
        xpPoints: 0,
        ...additionalData
      };

      await setDoc(userRef, userData);
    } else {
      // Update last login time if user already exists
      await updateDoc(userRef, {
        lastLoginAt: Date.now(),
        ...additionalData
      });
    }
  } catch (error: any) {
    console.error('Error creating user profile:', error);
    throw new Error('Failed to create user profile');
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      return userSnapshot.data() as UserProfile;
    }
    return null;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: Date.now()
    });
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update user profile');
  }
};