import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CreateAgentBanner from '@/components/Home/CreateAgentBanner'
import AgentListComponent from '@/components/Home/AgentListComponent'
import UserCreatedAgentList from '@/components/Explore/UserCreatedAgentList'
import { Agents } from '@/shared/AgentList'

export default function Explore() {
   const nonFeaturedAgents = Agents.filter(agent => !agent.featured);
  return (
    <ScrollView style={{
      padding: 20,
    }}>
      <CreateAgentBanner/>
      {/* User Create Agent */}
      <UserCreatedAgentList/>
      <Text style={{
        fontSize: 18,
        fontWeight:'bold',
      }}>Featured Agent</Text>
      <AgentListComponent data={nonFeaturedAgents} />
    </ScrollView>
  )
}