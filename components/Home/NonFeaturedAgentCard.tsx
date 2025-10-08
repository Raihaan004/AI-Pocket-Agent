import { View, Text, Image } from 'react-native'
import React from 'react'
import { Agent } from './AgentCard'

type Props = {
  agent: Agent
}

export default function NonFeaturedAgentCard({ agent }: Props) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2
      }}
    >
      <Image
      //@ts-ignore
        source={agent.image}
        style={{
          width: 50,
          height: 50,
          alignSelf: 'center',
          marginBottom: 10
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 14,
          textAlign: 'center'
        }}
      >
        {agent.name}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: '#555',
          textAlign: 'center',
          marginTop: 4
        }}
        numberOfLines={2}
      >
        {agent.desc}
      </Text>
    </View>
  )
}
