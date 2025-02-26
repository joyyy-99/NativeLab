import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { getUserProfile } from "../../firebase/firestore/users";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function Home() {
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<{ username: string; photoURL?: string } | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.uid) {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Image source={require("../../assets/images/kenya-flag.png")} style={styles.flagIcon} />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Hello {userProfile?.username || "User"}</Text>
            <Text style={styles.subText}>Let's have fun!</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image
              source={userProfile?.photoURL ? { uri: userProfile.photoURL } : require("../../assets/images/profile-placeholder.png")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* NAVIGATION BUTTONS */}
        <View style={styles.navButtons}>
          <TouchableOpacity style={styles.activeButton}>
            <Text style={styles.activeButtonText}>Learn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveButton}>
            <Text style={styles.inactiveButtonText}>Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveButton}>
            <Text style={styles.inactiveButtonText}>Games</Text>
          </TouchableOpacity>
        </View>

        {/* LEARNING CATEGORIES */}
        <View style={styles.categories}>
          <TouchableOpacity style={styles.category}>
            <Image source={require("../../assets/images/videos.png")} style={styles.originalImage} />
            <Text style={styles.categoryText}>Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.category}>
            <Image source={require("../../assets/images/writing.png")} style={styles.originalImage} />
            <Text style={styles.categoryText}>Writing</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.category}>
            <Image source={require("../../assets/images/speaking.png")} style={styles.originalImage} />
            <Text style={styles.categoryText}>Speaking</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.category}>
            <Image source={require("../../assets/images/pronunciation.png")} style={styles.originalImage} />
            <Text style={styles.categoryText}>Pronunciation</Text>
          </TouchableOpacity>
        </View>

        {/* GOALS SECTION */}
        <View style={styles.goalContainer}>
          <View style={styles.goalBox}>
            <Text style={styles.goalTitle}>DAILY GOAL</Text>
          </View>
          <View style={styles.goalBox}>
            <Text style={styles.goalTitle}>WEEKLY GOAL</Text>
          </View>
        </View>

        {/* SIGN OUT BUTTON */}
        <View style={styles.signOutContainer}>
          <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  flagIcon: {
    width: 30,
    height: 20,
  },
  userInfo: {
    alignItems: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  subText: {
    fontSize: 14,
    color: "#7E7C7C",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
    marginTop: 20,
  },
  activeButton: {
    backgroundColor: "#F9DB82",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  inactiveButton: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  activeButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  inactiveButtonText: {
    color: "#7E7C7C",
    fontSize: 16,
  },
  categories: {
    alignItems: "center",
    marginTop: 20,
  },
  category: {
    alignItems: "center",
    marginVertical: 10,
  },
  originalImage: {
    width: 80, 
    height: 80,
    resizeMode: "contain", 
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
    color: "#000",
  },
  goalContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  goalBox: {
    width: width * 0.4,
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  signOutContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  signOutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  signOutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
}); 