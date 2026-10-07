// Image helpers.
import type { ImageSource } from './projects'

/** Blurred preview while an image loads, when the image has one (static imports and the CMS do). */
export function blurPlaceholder(image: ImageSource): { placeholder?: 'blur' } {
  return 'blurDataURL' in image && image.blurDataURL ? { placeholder: 'blur' } : {}
}
