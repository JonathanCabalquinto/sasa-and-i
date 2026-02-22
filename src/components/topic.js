import { supabase } from '../supabaseClient'

let currentTopicId = null

export async function fetchTopic() {
  const { data } = await supabase
    .from('topics')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (data) {
    // document.getElementById('topic-title').innerText = data.title
    currentTopicId = data.id
  }
}

export function getCurrentTopicId() {
  return currentTopicId
}
