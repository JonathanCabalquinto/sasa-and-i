import { supabase } from '../supabaseClient'
import { fetchPosts } from './posts'
import { loadNotes } from './topicV2'
export function initRealtime() {
  supabase
    .channel('posts-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'posts' },
      () => {
        fetchPosts()
      }
    )
    .subscribe()
}

export function setupRealtime(topicId) {
  let realtimeChannel = null
  // 🧹 Remove old subscription if exists
  if (realtimeChannel) {
    supabase.removeChannel(realtimeChannel)
  }

  return realtimeChannel = supabase
    .channel(`posts-topic-${topicId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'posts',
        filter: `topic_id=eq.${topicId}`
      },
      async (payload) => {
        // Optional: small animation delay
        await loadNotes(topicId)
      }
    )
    .subscribe((status) => {
      console.log('Realtime status:', status)
    })
}

