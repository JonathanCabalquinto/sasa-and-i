import { supabase } from '../supabaseClient'
import { compressImage } from '../utils/image-compressor'

export async function uploadImage(imageFile) {
    let imageUrl = ''
    if (imageFile) {
        const compressedImage = await compressImage(imageFile)
    
        const fileName = `${crypto.randomUUID()}.jpg`
    
        const { error: uploadError } = await supabase.storage
          .from('css-freedom-wall')
          .upload(fileName, compressedImage, {
            contentType: 'image/jpeg'
          }) 
    
        if (uploadError) {
          alert("Image upload failed.")
          return
        }
    
        const { data } = supabase.storage
          .from('css-freedom-wall')
          .getPublicUrl(fileName)
    
        return imageUrl = data.publicUrl
      }
}