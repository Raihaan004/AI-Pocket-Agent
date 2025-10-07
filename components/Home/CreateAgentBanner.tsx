import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/shared/Colors'
import { useRouter } from 'expo-router'

export default function CreateAgentBanner() {
  const router = useRouter();
  return (
    <View style={{
        backgroundColor:Colors.PRIMARY,
        borderRadius:15,
        display:'flex',
        flexDirection:'row',
        marginTop:15,
    }}>
      <Image source={require('../../assets/images/agentGroup.png')} style={{
        width:200,
        height:120,
        resizeMode:'contain',
      }}/>
      <View style={{
        padding:10,
        width:180
      }}>
        <Text style={{
            fontSize:16,
            fontWeight:'bold',
            color: Colors.WHITE,
        }}>Create Your Own Agent</Text>
        <TouchableOpacity style={{
            backgroundColor:Colors.WHITE,
            padding:7,
            borderRadius: 5,
            marginTop:10,
        }}
        //@ts-ignore
        onPress={()=>router.push('/create-agent')}>
                <Text style={
                    {color:Colors.PRIMARY, fontWeight:'bold',
                    textAlign:'center'
                    }
                }>Create Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}