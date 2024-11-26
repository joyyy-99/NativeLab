import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../hooks/useAuth';
import { getUserProfile } from '../../firebase/firestore/users';
import type { UserProfile } from '../../firebase/firestore/users';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function Home() {
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.uid) {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <LinearGradient
          colors={['#FEF616', '#FCA502']}
          style={styles.headerContainer}
        >
          <View style={styles.profileSection}>
            <View style={styles.profileInfo}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.username}>{userProfile?.username || 'User'}</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{userProfile?.streakCount || 0}</Text>
                  <Text style={styles.statLabel}>Day Streak</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{userProfile?.xpPoints || 0}</Text>
                  <Text style={styles.statLabel}>XP Points</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{userProfile?.currentLevel || 1}</Text>
                  <Text style={styles.statLabel}>Level</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Learning Section */}
        <View style={styles.learningSection}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <View style={styles.languageCards}>
            {userProfile?.learningLanguages?.map((language, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.languageCard}
              >
                <Text style={styles.languageText}>{language}</Text>
                <Text style={styles.progressText}>Continue →</Text>
              </TouchableOpacity>
            ))}
            {(!userProfile?.learningLanguages || userProfile.learningLanguages.length === 0) && (
              <TouchableOpacity style={styles.addLanguageCard}>
                <Text style={styles.addLanguageText}>Add a language</Text>
                <Text style={styles.addLanguageIcon}>+</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Daily Challenge</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Practice</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.signOutButton]}
            onPress={signOut}
          >
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 16,
    color: '#000000',
  },
  headerContainer: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  profileInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#000000',
    opacity: 0.7,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    maxWidth: 300,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  statLabel: {
    fontSize: 14,
    color: '#000000',
    opacity: 0.7,
    marginTop: 4,
  },
  learningSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
  },
  languageCards: {
    gap: 15,
  },
  languageCard: {
    backgroundColor: '#F9DB82',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  progressText: {
    fontSize: 16,
    color: '#000000',
    opacity: 0.7,
  },
  addLanguageCard: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addLanguageText: {
    fontSize: 18,
    color: '#000000',
    opacity: 0.7,
  },
  addLanguageIcon: {
    fontSize: 24,
    color: '#000000',
    opacity: 0.7,
  },
  quickActions: {
    padding: 20,
    gap: 15,
  },
  actionButton: {
    backgroundColor: '#F9DB82',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  signOutButton: {
    backgroundColor: '#FF3B30',
    marginTop: 20,
  },
  signOutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});