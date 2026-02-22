import './styles/admin/admin.scss'

import { initAuth } from './admin/auth'
import { initTopics } from './admin/topics'
import { checkSession } from './admin/auth'

document.addEventListener('DOMContentLoaded', async () => {
  initAuth()
  initTopics()
  await checkSession()
})