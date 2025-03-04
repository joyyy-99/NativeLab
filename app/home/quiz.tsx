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

export default function Quiz() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<{ 
    username: string; 
    photoURL?: string;
    streakCount?: number;
  } | null>(null);
  const [score, setScore] = useState(10); // Mock Score for now
  const [energy, setEnergy] = useState(4); // Mock Energy for now

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

            {/* Streak Count */}
            <View style={styles.streakWrapper}>
              <Text style={styles.fireEmoji}>🔥</Text>
              <Text style={styles.streakCount}>{userProfile?.streakCount ?? 0}</Text>
            </View>
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
          <TouchableOpacity 
            style={styles.inactiveButton}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.inactiveButtonText}>Learn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activeButton}>
            <Text style={styles.activeButtonText}>Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.inactiveButton}
            onPress={() => router.push("/home/games")}
          >
            <Text style={styles.inactiveButtonText}>Games</Text>
          </TouchableOpacity>
        </View>

        {/* ENERGY (Lightning Bolt) */}
        <View style={styles.energyContainer}>
          <Text style={styles.energyEmoji}>⚡</Text>
          <Text style={styles.energyCount}>{energy}</Text>
        </View>

        {/* QUIZ QUESTION */}
        <Text style={styles.quizText}>Select the correct answer from the choices below</Text>

        {/* QUESTION IMAGE */}
        <View style={styles.quizImageContainer}>
          <Image source={require("../../assets/images/rabbit.png")} style={styles.quizImage} />
        </View>
        <Text style={styles.quizWord}>Rabbit</Text>

        {/* ANSWER CHOICES */}
        <View style={styles.answersContainer}>
          <TouchableOpacity style={styles.answerButton}>
            <Text style={styles.answerText}>Sungura</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.answerButton}>
            <Text style={styles.answerText}>Ngombe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.answerButton}>
            <Text style={styles.answerText}>Paka</Text>
          </TouchableOpacity>
        </View>

        {/* SCORE */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
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
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: "#7E7C7C",
  },
  streakWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  fireEmoji: {
    fontSize: 16,
  },
  streakCount: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#FF7700",
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
  energyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  energyEmoji: {
    fontSize: 24,
    marginRight: 5,
  },
  energyCount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quizText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  quizImageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  quizImage: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: "contain",
  },
  quizWord: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  answersContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  answerButton: {
    backgroundColor: "#F9DB82",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  answerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF7700",
  },
});
