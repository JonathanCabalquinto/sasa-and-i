import { supabase } from '../supabaseClient'
import { getRandomPastel, getRandomRotation } from '../utils/random'

const notesTableBody = document.querySelector('#notes-table tbody')

export async function fetchNotes(topicId) {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('topic_id', topicId)
    .order('created_at', { ascending: false })

    renderNotesAdmin(data, topicId)
}

export function renderNotesAdmin(notes, topicId) {
  notesTableBody.innerHTML = ''

  notes.forEach(note => {
    const row = document.createElement('tr')

    row.innerHTML = `
      <td>${note.content}</td>
      <td>${
        note.is_anonymous ? 'Anonymous' : note.author_name || 'Anonymous'
      }</td>
      <td>${new Date(note.created_at).toLocaleString()}</td>
      <td>
        <button class="delete-btn">Delete</button>
      </td>
    `

    row.querySelector('.delete-btn').addEventListener('click', async () => {
      const confirmDelete = confirm('Delete this note?')
      if (!confirmDelete) return

      await supabase
        .from('posts')
        .delete()
        .eq('id', note.id)

      fetchNotes(topicId)
    })

    notesTableBody.appendChild(row)
  })
}


async function deleteNotes(post) {
  // 1️⃣ Extract file path from URL
  let filePath = null

  if (post.image_url) {
    const parts = post.image_url.split('/css-freedom-wall/')
    filePath = parts[1]
  }

  // 2️⃣ Delete image from storage (if exists)
  if (filePath) {
    const { error: storageError } = await supabase
      .storage
      .from('css-freedom-wall')
      .remove([filePath])

    if (storageError) {
      console.error('Storage delete error:', storageError)
    }
  }

  // 3️⃣ Delete row from database
  const { error: dbError } = await supabase
    .from('posts')
    .delete()
    .eq('id', post.id)

  if (dbError) {
    console.error('DB delete error:', dbError)
  }
}


export function renderNotes(notes) {
  const container = document.getElementById('notes-container')
  container.innerHTML = ''

  notes.forEach(note => {
    const div = document.createElement('div')
    div.className = 'note-card'

    div.style.backgroundColor = getRandomPastel()
    div.style.transform = `rotate(${getRandomRotation()}deg)`

    div.innerHTML = `
      ${note.image_url ? `
        <div class="note-image">
          <img src="${note.image_url}" alt="Note image" />
        </div>
      ` : ''}

      <div class="note-content">
        <p>${note.content}</p>
        <small>
          ${note.is_anonymous ? 'Anonymous' : note.author_name || 'Anonymous'}
        </small>
      </div>
    `

    container.appendChild(div)
  })
}