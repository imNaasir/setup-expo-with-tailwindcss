import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
// import "../../../global.css";


const HomeScreen = () => {
  return (
    <View className="flex-1 bg-amber-200 items-center justify-center" >
        <Text className="font-bold text-3xl text-red-400" >HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'red'
    }
  });