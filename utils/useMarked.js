import { useState, useEffect } from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

// Parse markdown to html and sanitizes it
export const useMarked = markdown => {
  const [html, setHtml] = useState(markdown)

  useEffect(() => {
    const html = marked(markdown)
    setHtml(DOMPurify.sanitize(html))
  }, [])

  return html
}