import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Pressable, ToastAndroid, Image } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Camera, Copy, Plane, Plus, Send, X } from 'lucide-react-native';
import Colors from '@/shared/Colors';
import { AIChatModel } from '@/shared/GlobalApi';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc } from 'firebase/firestore';
import { firestoreDb } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

type Message = {
  role: string,
  content: string
}

export default function ChatUI() {
  const navigation = useNavigation();
  const { agentName, initialText, agentPrompt, agentId, chatId,messagesList } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>();
  const [file, setFile] = useState<string | null>();
  const [docId, setDocId] = useState<string | null>();
  const { user } = useUser();

  useEffect(() => {
  navigation.setOptions({
    headerShown: true,
    headerTitle: agentName,
    headerRight: () => <Plus />,
  });

  if (!chatId) {
    const id = Date.now().toString();
    setDocId(id);
  }

  if (messagesList) {
    try {
      const messageListJSON =
        typeof messagesList === 'string' ? JSON.parse(messagesList) : messagesList;
      if (Array.isArray(messageListJSON) && messageListJSON.length > 0) {
        setMessages(messageListJSON);
      }
    } catch (error) {
      console.warn('Failed to parse messagesList:', error);
    }
  }
}, [messagesList]);

  useEffect(() => {
    //@ts-ignore
    setInput(initialText);
    if (agentPrompt) {
      setMessages((prev) => [...prev, { role: 'system', content: agentPrompt.toString() }])
    }
  }, [agentPrompt])

  const onSendMessage = async () => {
    if (!input?.trim()) return;
    const newMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    const loadingMsg = { role: 'assistant', content: '__loading__' };
    setMessages((prev) => [...prev, loadingMsg]);
    /*const result = await AIChatModel([...messages, newMessage]);
    console.log(result.aiResponse);
    setMessages((prev)=>[...prev,result.aiResponse]);*/
    try {
      const result = await AIChatModel([...messages, newMessage]);
      console.log('AI Response:', result.aiResponse);

      // ✅ Replace loading message with actual AI response
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: result.aiResponse,
        };
        return updated;
      });
    } catch (error) {
      console.error('Error:', error);
      // Show an error message instead of loading
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        };
        return updated;
      });
    }
  }

  const CopyToClipboard = async (message: string) => {
    await Clipboard.setStringAsync(message);
    alert('Copied to clipboard');
    ToastAndroid.show('Copied to clipboard', ToastAndroid.BOTTOM);
  }

  const PickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.5
    })
    if (!result.canceled) {
      setFile(result.assets[0].uri);
    }
  }

  useEffect(() => {
    const SaveMessages = async () => {
      if (messages?.length > 0 && docId) {
await setDoc(doc(firestoreDb, 'chats', docId), {
  userEmail: user?.primaryEmailAddress?.emailAddress || "unknown",
  messages: messages || [],
  docId: docId || Date.now().toString(),
  agentName: agentName || "Unknown Agent",
  agentPrompt: agentPrompt || "",
  agentId: agentId || null, // ✅ Fix here
}, { merge: true });
      }
    }
    SaveMessages();
  }, [messages])

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{
        padding: 10,
        flex: 1,
      }}>

      <FlatList data={messages}
        //@ts-ignore
        renderItem={({ item, index }) => item.role !== 'system' && (
          <View style={[styles.messageContainer, item.role == 'user' ? styles.userMessage : styles.assistantMessage]}>
            {item.content == '__loading__' ?
              <ActivityIndicator size={'small'} color={Colors.BLACK} /> :

              <Text style={[styles.messageText, item.role == 'user' ? styles.userText : styles.assistantText]}>{item.content}</Text>}
            {item.role == 'assistant' &&
              <Pressable onPress={() => CopyToClipboard(item.content)}>
                <Copy color={Colors.GRAY} />
              </Pressable>
            }
          </View>)} />

      <View>
        {file && (
          <View style={{
            marginBottom: 5,
            display: 'flex',
            flexDirection: 'row',
          }}>

            <Image source={{ uri: file }} style={{
              width: 50,
              height: 50,
              borderRadius: 6,
            }} />
            
            <TouchableOpacity onPress={() => setFile(null)}>
              <X />
            </TouchableOpacity>
          </View>
        )}
        {/*Input box*/}

        <View style={styles.inputContainer}>
          <TouchableOpacity style={{
            marginRight: 10,

          }} onPress={PickImage}>
            <Camera size={27} />
          </TouchableOpacity>

          <TextInput style={styles.input}
            placeholder='Type a message...'
            onChangeText={(v) => setInput(v)}
            value={input} />

          <TouchableOpacity style={{
            backgroundColor: Colors.PRIMARY,
            padding: 7,
            borderRadius: 99,

          }} onPress={onSendMessage}>
            <Send color={Colors.WHITE} size={20} />
          </TouchableOpacity>
        </View>
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