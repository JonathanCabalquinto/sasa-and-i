export function getRandomRotation() {
    return Math.floor(Math.random() * 10 - 5)
  }
  
export function getRandomPastel() {
    const colors = [
      '#ffd6e0',
      '#d6f5ff',
      '#fff5ba',
      '#e0ffd6',
      '#f3d6ff',
      '#ffe4c4'
    ]
  
    return colors[Math.floor(Math.random() * colors.length)]
  }
  