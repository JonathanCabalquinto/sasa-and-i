import { getRandomPastel, getRandomRotation } from '../utils/random'
import { setupRealtime } from './realtime'
import { renderNotes } from '../admin/notes'


import { supabase } from '../supabaseClient'

let currentTopicId = null

// ============================
// LOAD MAIN TOPIC
// ============================
export async function loadMainTopic() {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)

  if (error || !data.length) return

  const topic = data[0]
  currentTopicId = topic.id

  document.getElementById('main-topic-title').innerText = topic.title

  await loadNotes(topic.id)
  setupRealtime(topic.id)
}

export async function loadNotes(topicId) {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('topic_id', topicId)
    .order('created_at', { ascending: false })

  renderNotes(data)
}