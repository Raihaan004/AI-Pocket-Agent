import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Agents } from '@/shared/AgentList'
import AgentCard from './AgentCard'
import NonFeaturedAgentCard from './NonFeaturedAgentCard'
import { useRouter } from 'expo-router'

export default function AgentListComponent({data}:any) {
  const router = useRouter();
  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ flex: 1, padding: 5 }}
            onPress={() =>
              router.push({
                pathname: "/chat",
                params: {
                  agentName: item.name,
                  initialText: item.initialText,
                  agentPrompt: item.prompt,
                  agentId: item.id,
                },
              })
            }
          >
            {item.featured ? (
              <AgentCard agent={item} key={index} />
            ) : (
              <NonFeaturedAgentCard agent={item} key={index} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  )
} 