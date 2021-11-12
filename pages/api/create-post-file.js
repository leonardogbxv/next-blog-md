import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { normalizeString }  from '../../utils/normalizeString.js'
import { formatMarkdownMeta } from '../../utils/formatMarkdownMeta.js'
import moment from 'moment'

export default async function createPostFile(req, res) {
  try {
    const postData = req.body
    const postTitle = normalizeString(postData.title)
    const postMarkdown = formatMarkdownMeta(postData)

    console.log(postMarkdown)

    // create dir & write file or just write file inside dir
    // fs.access(`./posts/${currentDate}`, error => {
    //   if (error) {
    //     fs.mkdir(`./posts/${currentDate}`, { recursive: true })

    //     fs.writeFile(`./posts/${currentDate}/${postTitle}.md`, postMarkdown)
    //   } else {
    //     fs.writeFile(`./posts/${currentDate}/${postTitle}.md`, postMarkdown)
    //   }
    // })

    // Create markdown post file with content
    fs.writeFile(`./posts/${postTitle}.md`, postMarkdown)
    
    res.status(200).json({ data: postData })
  } catch (err) {
    res.status(400).json({ error: 'Failed to post file'})
  }
}