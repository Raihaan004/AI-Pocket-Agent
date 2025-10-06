import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Camera, Plane, Plus, Send } from 'lucide-react-native';
import Colors from '@/shared/Colors';

const initialMessages = [
  { role: 'user', text: 'Hello, who are you?' },
  { role: 'assistant', text: 'I am an AI created by OpenAI. How can I help you today?' },
]

export default function ChatUI() {
  const navigation = useNavigation();
  const { agentName, initialText, agentPrompt, agentId } = useLocalSearchParams();
  const [messages, setmessages] = useState(initialMessages);
  useEffect(() => { navigation.setOptions({ headerShown: true, headerTitle: agentName, headerRight: () => (<Plus />) }) }, [])
  return (
    <KeyboardAvoidingView 
    keyboardVerticalOffset={80}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    style={{
      padding: 10,
      flex: 1,
    }}>
      <FlatList data={messages} renderItem={({ item, index }) => (
        <View style={[styles.messageContainer, item.role == 'user' ? styles.userMessage : styles.assistantMessage]}>
          <Text style={[styles.messageText, item.role == 'user' ? styles.userText : styles.assistantText]}>{item.text}</Text>
        </View>)} />
      {/*Input box*/}

      <View style={styles.inputContainer}>
        <TouchableOpacity style={{
          marginRight: 10,

        }}>
          <Camera size={27} />
        </TouchableOpacity>

        <TextInput style={styles.input} placeholder='Type a message...' />

        <TouchableOpacity style={{
          backgroundColor: Colors.PRIMARY,
          padding: 7,
          borderRadius: 99
        }}>
          <Send color={Colors.WHITE} size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '75%',
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: Colors.PRIMARY,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 2,
  },
  assistantMessage: {
    backgroundColor: Colors.LIGHT_GRAY,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 2,

  },
  messageText: { fontSize: 16 },
  userText: { color: Colors.WHITE },
  assistantText: { color: Colors.BLACK },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: Colors.WHITE,
    marginRight: 8,
    paddingHorizontal: 15,
  }
})