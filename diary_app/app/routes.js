import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens
import SignIn from './components/auth'
import Diary from './components/diary'
import News from './components/news'

import DiaryDocu from './components/diary/diaryDocu'
import Logo from './utils/logo'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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

const TabBarIcon = (focused, name) => {
  let iconName, iconSize
  if (name === 'DiaryTab') {
    iconName = 'notebook-outline'
  } else if (name === 'NewsTab') {
    iconName = 'newspaper-variant-outline'
  }

  if (focused) iconSize = 37
  else iconSize = 32

  return <Icon name={iconName} size={iconSize} color="#fff" />
}

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
    <MainScreenTab.Navigator
      initialRouteName="DiaryTab"
      screenOptions={
        (({ route }) => ({
          tabBarIcon: ({ focused }) => TabBarIcon(focused, route.name)
        }),
        {
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: '#788DCF',
          tabBarInactiveBackgroundColor: '#7487C5',
          tabBarStyle: {
            backgroundColor: '#7487C5'
          }
        })
      }>
      <MainScreenTab.Screen name="DiaryTab" component={DiaryStackComponent} />
      <MainScreenTab.Screen name="NewsTab" component={NewsStackComponent} />
    </MainScreenTab.Navigator>
  )
}

// notebook-outline
// newspaper-variant-outline

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
