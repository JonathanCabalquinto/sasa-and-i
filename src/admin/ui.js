const loginSection = document.getElementById('login-section')
const adminSection = document.getElementById('admin-section')

export function showAdmin() {
  loginSection.style.display = 'none'
  adminSection.style.display = 'block'
}

export function showLogin() {
  loginSection.style.display = 'block'
  adminSection.style.display = 'none'
}
