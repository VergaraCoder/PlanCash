import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Login",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Contactos",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="editContact"
        options={{
          title: "Editar",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "refresh-circle-outline" : "refresh"}
              color={color}
            />
          ),
        }}
      />

    <Tabs.Screen
        name="camera"
        options={{
          title: "Camara",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "camera-outline" : "camera"}
              color={color}
            />
          ),
        }}
      />

    <Tabs.Screen
        name="newContact"
        options={{
          title: "Agregar",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person-add-outline" : "person-add"}
              color={color}
            />
          ),
        }}
      />

    <Tabs.Screen
        name="galery"
        options={{
          title: "Galeria",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "folder-open-outline" : "folder"}
              color={color}
            />
          ),
        }}
      />

    <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "log-in" : "log-in-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
