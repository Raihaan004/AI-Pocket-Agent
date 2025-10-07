import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestoreDb } from '@/config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import { MessageCircle } from 'lucide-react-native'
import Colors from '@/shared/Colors'
import { useRouter } from 'expo-router'

type History={
  agentId:number,
  agentName:string,
  agentPrompt:string,
  emoji:string,
  imageBanner:string,
  messages:any[],
  lastModified:any
}
export default function History() {
  const {user}=useUser();
  const router=useRouter();
  const [historyList, setHistoryList]=useState<History[]>([]);
  useEffect(()=>{
    user&&GetChatHistory();
  },[user])
  const GetChatHistory=async()=>{
    const q=query(collection(firestoreDb,'chats'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress))
    const querySnapshot=await getDocs(q);
    setHistoryList([])
    querySnapshot.forEach((doc)=>{
      console.log(doc.data());
      //@ts-ignore
      setHistoryList(prev=>[...prev,doc.data()])
    })
  }
  const OnClickHandle=(item:History)=>{
    router.push({
      pathname:'/chat',
      params: {
      agentName: item.agentName,
      initialText: '',
      agentPrompt: item.agentPrompt,
      chatId: item.agentId,  // ✅ Use Firestore document ID
      emoji: item.emoji,
      imageBanner: item.imageBanner,
      messagesList: JSON.stringify(item.messages), // ✅ Correct name & JSON
    },
    })
  } 
  return (
    <View style={{
      padding:20
    }}>
      <FlatList data={historyList} renderItem={({item,index})=>(
        <TouchableOpacity style={{
          display:'flex',
          flexDirection:'row',
          padding:10,
          backgroundColor:Colors.WHITE,
          marginBottom:10,
          borderRadius:10

        }} onPress={()=>OnClickHandle(item)}><View style={{
          padding:15,
          marginRight:10,
          
          backgroundColor:Colors.LIGHT_GRAY,
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10
        }}>
          {item.emoji?<Text style={{fontSize:20}}>{item.emoji}</Text>:<MessageCircle/>}
          </View>
          <View style={{
            width:'80%'
          }}>
            <Text style={{
              fontSize:20,
              fontWeight:'bold'
            }}>{item.agentName}</Text>
            <Text numberOfLines={2} style={{
              color:Colors.GRAY
            }}>{item.messages[item.messages.length-1]?.content}</Text>
          </View>
        </TouchableOpacity>
      )}/>
    </View>
  )
}