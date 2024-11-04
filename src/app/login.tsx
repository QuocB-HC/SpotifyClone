import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import Entypo from "@expo/vector-icons/Entypo";
  import AntDesign from "@expo/vector-icons/AntDesign";
  
  const LoginScreen = () => {
    return (
      <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
        <SafeAreaView>
          <View style={{ height: 80 }} />
          <Entypo
            style={{ textAlign: "center" }}
            name="spotify"
            size={80}
            color="white"
          />
          <Text
            style={{
              color: "white",
              fontSize: 40,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Millions of Songs Free on Spotify!
          </Text>
  
          <View style={{ height: 80, marginTop: 50 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#1BD954",
                padding: 10,
                marginLeft: "auto",
                marginRight: "auto",
                width: 300,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 10,
              }}
            >
              <Text>Sign up Free</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#131624",
                padding: 10,
                marginLeft: "auto",
                marginRight: "auto",
                width: 300,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginVertical: 10,
                borderColor: "#C0C0C0",
                borderWidth: 0.8,
              }}
            >
              <AntDesign name="google" size={24} color="red" />
              <Text
                style={{
                  fontWeight: "500",
                  color: "white",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={{
                padding: 10,
                marginLeft: "auto",
                marginRight: "auto",
                width: 300,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: "white",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({});
  