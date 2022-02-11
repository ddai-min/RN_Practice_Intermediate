import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens
import SignIn from './components/auth'
import Diary from './components/diary'
import News from './components/news'

import DiaryDocu from './components/diary/diaryDocu'
import Logo from './utils/logo'

const AuthStack = createNativeStackNavigator()
const MainScreenTab = createBottomTabNavigator()
const DiaryStack = createNativeStackNavigator()
const NewsStack = createNativeStackNavigator()

const headerConfig = {
  headerTitleAlign: 'center',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#7487C5'
  },
  headerTitle: <Logo />,
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center'
  }
}

/*
    Stack Navigator
        - Stack Screen A

    Stack Navigator
        - Tab Navigator
            - Tab Screen B
            - Tab Screen C
*/

const isLoggedIn = false

const DiaryStackComponent = () => {
  return (
    <DiaryStack.Navigator>
      <DiaryStack.Screen
        name="Diary"
        component={Diary}
        options={headerConfig}
      />
      <DiaryStack.Screen
        name="DiaryDocu"
        component={DiaryDocu}
        options={headerConfig}
      />
    </DiaryStack.Navigator>
  )
}

const NewsStackComponent = () => {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen name="News" component={News} options={headerConfig} />
    </NewsStack.Navigator>
  )
}

const AppTabComponent = () => {
  return (
    <MainScreenTab.Navigator screenOptions={{ headerShown: false }}>
      <MainScreenTab.Screen name="DiaryStack" component={DiaryStackComponent} />
      <MainScreenTab.Screen name="NewsStack" component={NewsStackComponent} />
    </MainScreenTab.Navigator>
  )
}

export const RootNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <AuthStack.Screen name="Main" component={AppTabComponent} />
      ) : (
        <>
          <AuthStack.Screen name="SignIn" component={SignIn} />
          <AuthStack.Screen
            name="AppTabComponent"
            component={AppTabComponent}
          />
        </>
      )}
    </AuthStack.Navigator>
  )
}
