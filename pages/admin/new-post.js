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
    category: 'programming',
    image: '',
    title: '',
    description: '',
    markdown: ''
  })

  // Image field states
  const [previewImage, setPreviewImage] = useState("")
  const [typeFile, setTypeFile] = useState("")
  const [isUploaded, setIsUploaded] = useState(false)

  // Redirects after form submit
  const router = useRouter()
  useEffect(() => {
    console.log('formSubmitted', formSubmitted)
    if(formSubmitted) {
      router.push('/')
    }
  }, [formSubmitted])

  // Handles
  const handleSubmit = async event => {
    event.preventDefault()
    
    try {
      const promise = await axios.post('http://localhost:3000/api/create-post-file', formData)
      promise.status !== 200 || setFormSubmitted(true)
    } catch (error) {
      alert(error)
      setFormSubmitted(false)
    }
  }

  const handleChange = event => {
    const newFormData = { ...formData }
    newFormData[event.target.name] = event.target.value

    setFormData(newFormData)
    console.log(formData)
  }

  const handleImagePreview = async event => {
    const inputFile = event.target.files[0]
    
    try {
      const base64 = await convertToBase64(inputFile)

      setPreviewImage(base64)
      setTypeFile(event.target.files[0].type)
      setIsUploaded(true)
    } catch (err) {
      setIsUploaded(false)
    } finally {
      const newFormData = { ...formData }
      newFormData[event.target.name] = {
        fakePath: event.target.value,
        base64: previewImage,
        type: typeFile,
        file: inputFile
      }

      setFormData(newFormData)
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
            <select onChange={handleChange} name="category" required>
              <option value="programming">Programming</option>
              <option value="animes">Animes</option>
              <option value="games">Games</option>
              <option value="books">Books</option>
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
