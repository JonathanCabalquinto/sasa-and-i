import { supabase } from '../supabaseClient'
import { getRandomPastel, getRandomRotation } from '../utils/random'

const wall = document.getElementById('wall')

export async function fetchPosts() {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  // displayPosts(data)
}

export async function countPostsByTopic(topicId) {
  const { count, error } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('topic_id', topicId)

  if (error) {
    console.error(error)
    return 0
  }

  return count
}

function displayPosts(posts) {
  wall.innerHTML = ''

  posts.forEach(post => {
    const note = document.createElement('div')
    note.classList.add('note')

    note.style.backgroundColor = getRandomPastel()
    note.style.transform = `rotate(${getRandomRotation()}deg)`

    note.innerHTML = `
      <p>${post.content}</p>
      <small>— ${
        post.is_anonymous ? 'Anonymous' : post.author_name || 'Anonymous'
      }</small>
    `

    wall.appendChild(note)
  })
}
