import { supabase } from '../supabaseClient'
import { fetchPosts } from './posts'
import { getCurrentTopicId } from './topic'
import { getOrCreateDeviceId } from '../utils/get-or-create-device-id'
import { uploadImage } from './image-handler'
import { countPostsByTopic } from './posts'

const modal = document.getElementById('modal-overlay')
const addNoteBtn = document.getElementById('addNoteBtn')
const cancelBtn = document.getElementById('cancel-btn')
const submitBtn = document.getElementById('submit-btn')
const deviceId = getOrCreateDeviceId()

const MAX_NOTES = 20;
let notesCount = 0;

export function initModal() {
  addNoteBtn.addEventListener('click', () => {
    modal.classList.remove('hidden')
  })

  cancelBtn.addEventListener('click', () => {
    console.log("modal clicked")

    modal.classList.add('hidden')
  })

  submitBtn.addEventListener('click', handleSubmit)
}

async function handleSubmit() {
  const content = document.getElementById('post-content').value
  const author = document.getElementById('author-name').value
  const isAnonymous = document.getElementById('anonymous-checkbox').checked
  const imageFile = document.getElementById('post-image').files[0]
  const deviceId = getOrCreateDeviceId()
  // const deviceId = crypto.randomUUID()
  const count = await countPostsByTopic(getCurrentTopicId());

  if (!content.trim()) {
    alert('Please write something.')
    return
  }

  // 1️⃣ Insert post first (without image)
  if (count >= MAX_NOTES) {
    alert("This topic has reached the maximum number of posts.")
    return
  }

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        topic_id: getCurrentTopicId(),
        content,
        author_name: author,
        is_anonymous: isAnonymous,
        device_id: deviceId
      }
    ])
    .select()
    .single()

  if (error) {
    alert("You have already posted on this topic from this device.")
    return
  }

  // 2️⃣ Upload image ONLY if insert succeeded
  if (imageFile && !error) {
    const imageUrl = await uploadImage(imageFile)

    await supabase
      .from('posts')
      .update({ image_url: imageUrl })
      .eq('id', data.id)
  }

  modal.classList.add('hidden')
  // fetchPosts()
  console.log(posts.length)
}