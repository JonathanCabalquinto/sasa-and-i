export function compressImage(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
  
      reader.readAsDataURL(file)
  
      reader.onload = event => {
        const img = new Image()
        img.src = event.target.result
  
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const scale = maxWidth / img.width
          const width = maxWidth
          const height = img.height * scale
  
          canvas.width = width
          canvas.height = height
  
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
  
          canvas.toBlob(
            blob => resolve(blob),
            'image/jpeg',
            quality
          )
        }
      }
  
      reader.onerror = error => reject(error)
    })
  }
  