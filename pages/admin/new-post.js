import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { convertToBase64 } from '../../utils/convertToBase64'
import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import styles from '../../styles/Form.module.scss'

export default function NewPost() {
  // Form states
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    date: moment().format('DD MMM YYYY').toUpperCase(),
    category: '',
    image: '',
    title: '',
    description: '',
    markdown: ''
  })

  // Image field states
  const [previewImage, setPreviewImage] = useState("")
  const [isUploaded, setIsUploaded] = useState(false)
  const [imageFile, setImageFile] = useState("")

  // Redirects after form submit
  const router = useRouter()
  useEffect(() => {
    if(formSubmitted) {
      router.push('/')
    }
  }, [formSubmitted])

  // Handles
  const handleSubmit = async event => {
    event.preventDefault()

    const imageFormData = new FormData()
    imageFormData.append('image', imageFile)
    
    try {
      const config = { 
        headers: { 'content-type': 'multipart/form-data' }
      }

      // image upload
      const imagePromise = await axios.post('http://localhost:3000/api/upload-post-image', imageFormData, config)
      const newFormData = { ...formData}
      newFormData['image'] = `/images/uploads/${imagePromise.data.data.name}`

      await axios.post('http://localhost:3000/api/create-post-file', newFormData)

      setFormSubmitted(true)
    } catch (error) {
      alert(error)
      setFormSubmitted(false)
    }
  }

  const handleChange = event => {
    const newFormData = { ...formData }
    newFormData[event.target.name] = event.target.value

    setFormData(newFormData)
  }

  const handleImagePreview = async event => {
    const inputFile = event.target.files[0]

    try {
      const base64 = await convertToBase64(inputFile)

      setPreviewImage(base64)
      setIsUploaded(true)
    } catch (err) {
      setIsUploaded(false)
    } finally {
      setImageFile(inputFile)
    }
  }

  return (
    <div className="container">
      <section>
        <h1>Create new post</h1>
            
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles['image-input']}>
            { isUploaded ? <img src={previewImage} alt="" /> : <h3>Preview</h3>}
            <label htmlFor="file">Image</label>
            <input
              onChange={handleImagePreview} 
              type="file"
              name="image"
            />
          </div>

          <div>
            <label htmlFor="text">Title</label>
            <input onChange={handleChange} type="text" name="title" placeholder="Post title" required />
          </div>

          <div>
            <label htmlFor="text">Category</label>
            <select onChange={handleChange} name="category" defaultValue="default" required>
              <option 
                value="default" 
                disabled
                hidden
              >Choose a Category</option>
              <option value="Programming">Programming</option>
              <option value="Animes">Animes</option>
              <option value="Games">Games</option>
              <option value="Books">Books</option>
            </select>
          </div>

          <div>
            <label htmlFor="text">Description</label>
            <input onChange={handleChange} type="text" name="description" placeholder="Post description" required />
          </div>

          <div>
            <label htmlFor="text">Markdown</label>
            <textarea onChange={handleChange} name="markdown" ></textarea>
          </div>

          <button type="submit" className="btn-default">Submit</button>
          <Link href="/">
            <button className="btn-default">Cancel</button>
          </Link>
        </form>

      </section>
    </div>
  )
}
