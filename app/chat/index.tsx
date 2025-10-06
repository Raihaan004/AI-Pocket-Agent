import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Plus } from 'lucide-react-native';
import Colors from '@/shared/Colors';

const initialMessages = [
  { role: 'user', text: 'Hello, who are you?' },
  { role: 'assistant', text: 'I am an AI created by OpenAI. How can I help you today?' }
]

export default function ChatUI() {
  const navigation = useNavigation();
  const { agentName, initialText, agentPrompt, agentId } = useLocalSearchParams();
  const [messages, setmessages] = useState(initialMessages);
  useEffect(() => { navigation.setOptions({ headerShown: true, headerTitle: agentName, headerRight: () => (<Plus />) }) }, [])
  return (
    <View style={{
      padding: 10,
    }}>
      <FlatList data={messages} renderItem={({ item, index }) => (
        <View style={[styles.messageContainer,item.role=='user'?styles.userMessage:styles.assistantMessage]}>
        <Text style={[styles.messageText,item.role=='user'?styles.userText:styles.assistantText]}>{item.text}</Text>
      </View>)} />
    </View>
  )
}
const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '75%',
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
  },
  userMessage:{
    backgroundColor:Colors.PRIMARY,
    alignSelf:'flex-end',
    borderBottomRightRadius:2,
  },
  assistantMessage:{
    backgroundColor:Colors.LIGHT_GRAY,
    alignSelf:'flex-start',
    borderBottomLeftRadius:2,
    
  },
  messageText:{fontSize:16},
  userText:{color:Colors.WHITE},
  assistantText:{color:Colors.BLACK}
})