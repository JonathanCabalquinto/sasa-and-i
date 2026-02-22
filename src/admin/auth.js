import { supabase } from '../supabaseClient'
import { showAdmin, showLogin } from './ui'

export function initAuth() {
  const loginBtn = document.getElementById('login-btn')
  const logoutBtn = document.getElementById('logout-btn')

  // Dev credentials
  document.getElementById('email').value = import.meta.env.VITE_ADMIN_USERNAME
  document.getElementById('password').value = import.meta.env.VITE_ADMIN_PASSWORD

  loginBtn.addEventListener('click', login)
  logoutBtn.addEventListener('click', logout)
}

async function login() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert('Invalid credentials')
  } else {
    showAdmin()
  }
}

async function logout() {
  await supabase.auth.signOut()
  showLogin()
}

export async function checkSession() {
  const { data } = await supabase.auth.getSession()

  if (data.session) {
    showAdmin()
  } else {
    showLogin()
  }
}
