import './styles/style.scss'

import { fetchTopic } from './components/topic'
import { fetchPosts } from './components/posts'
import { initModal } from './components/modal'
import { initRealtime } from './components/realtime'
import { loadMainTopic } from './components/topicV2'


async function initApp() {
  await loadMainTopic()
  await fetchTopic()
  await fetchPosts()
  initModal()
  initRealtime()
}



initApp()
