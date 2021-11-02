import { useState } from "react"
import { convertToBase64 } from '../../utils/convertToBase64'
import axios from 'axios'
import Link from "next/link"
import styles from '../../styles/Form.module.scss'

export default function NewPost() {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    category: 'programming',
    description: '',
    markdown: ''
  })

  const [image, setImage] = useState("")
  const [typeFile, setTypeFile] = useState("")
  const [isUploaded, setIsUploaded] = useState(false)

  const handleImageUpload = async event => {
    const inputFile = event.target.files[0]
    
    try {
      const base64 = await convertToBase64(inputFile)

      setImage(base64)
      setTypeFile(event.target.files[0].type)
      setIsUploaded(true)
    } catch (err) {
      setIsUploaded(false)
    } finally {
      const newFormData = { ...formData }
      newFormData[event.target.name] = {
        fakePath: event.target.value,
        base64: image,
        type: typeFile
      }

      setFormData(newFormData)
    }
  }

  const handleChange = event => {
    const newFormData = { ...formData }
    newFormData[event.target.name] = event.target.value

    setFormData(newFormData)
    console.log(formData)
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios.post('http://localhost:3000/api/create-post-file', formData)
    .then(res => {
      console.log(res)
    });
        

    console.log(formData)
  }

  return (
    <div className="container">
      <section>
        <h1>Create new post</h1>
            
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles['image-input']}>
            { isUploaded ? <img src={image} alt="" /> : <h3>Preview</h3>}
            <label htmlFor="file">Image</label>
            <input 
              onChange={handleImageUpload} 
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

          <button onSubmit={handleSubmit} type="submit" className="btn-default">Submit</button>
          <Link href="/">
            <button className="btn-default">Cancel</button>
          </Link>
        </form>

      </section>
    </div>
  )
}
