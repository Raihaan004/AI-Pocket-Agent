import { View, Text } from 'react-native'
import React from 'react'
import { Agent } from './AgentCard'

type Props={
    agent:Agent
}
export default function NonFeaturedAgentCard({agent}:Props) {
  return (
    <View>
      <Text>NonFeaturedAgentCard</Text>
    </View>
  )
}