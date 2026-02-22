import { supabase } from '../supabaseClient'
import { fetchNotes } from './notes'

const topicsTableBody = document.querySelector('#topics-table tbody')
const notesTableBody = document.querySelector('#notes-table tbody')
const notesSection = document.getElementById('notes-section')
const selectedTopicText = document.getElementById('selected-topic')

let selectedTopicId = null

export function initTopics() {
  document
    .getElementById('create-topic')
    .addEventListener('click', createTopic)

  fetchTopics()
}

async function createTopic() {
  const title = document.getElementById('new-topic').value

  if (!title.trim()) return

  await supabase.from('topics').insert([{ title }])

  document.getElementById('new-topic').value = ''
  fetchTopics()
}

async function fetchTopics() {
  const { data } = await supabase
    .from('topics')
    .select('*')
    .order('created_at', { ascending: false })

  renderTopics(data)

  // ✅ AUTO LOAD LATEST TOPIC
  if (data && data.length > 0) {
    const latest = data[0]
    selectedTopicId = latest.id
    selectedTopicText.textContent = latest.title
    fetchNotes(latest.id)
  }
}

function renderTopics(topics) {
  topicsTableBody.innerHTML = ''

  topics.forEach(topic => {
    const row = document.createElement('tr')

    row.innerHTML = `
      <td>${topic.title}</td>
      <td>${new Date(topic.created_at).toLocaleDateString()}</td>
      <td>
        <button class="view-btn">View Notes</button>
        <button class="delete-btn">Delete</button>
      </td>
    `

    row.querySelector('.view-btn').addEventListener('click', () => {
      selectedTopicId = topic.id
      selectedTopicText.textContent = topic.title
      notesSection.classList.remove('hidden')
      fetchNotes(topic.id)
    })

    row.querySelector('.delete-btn').addEventListener('click', async () => {
      const confirmDelete = confirm(
        `Delete topic "${topic.title}"?\nAll notes will also be deleted.`
      )
      if (!confirmDelete) return

      await supabase
        .from('topics')
        .delete()
        .eq('id', topic.id)

      notesTableBody.innerHTML = ''
      selectedTopicText.textContent = ''
      fetchTopics()
    })

    topicsTableBody.appendChild(row)
  })
}
