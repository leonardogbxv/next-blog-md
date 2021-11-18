import { useState } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import moment from 'moment'
import Posts from '../components/Posts'
import Pagination from '../components/Pagination'

export default function Home({ posts }) {
  // Pagination
  const [postsPerPage] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)

  const lastPost = currentPage * postsPerPage
  const firstPost = lastPost - postsPerPage
  const currentPosts = posts.slice(firstPost, lastPost)

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="container">
      <Posts posts={currentPosts} />
      <Pagination 
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        onChange={handlePageChange}
      />
    </div>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const markdownMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data:meta } = matter(markdownMeta)

    moment.locale('pt-br')
    console.log(moment().format('DD MMMM YYYY'))

    return {
      slug,
      meta
    }
  })

  return {
    props: {
      posts: posts.sort((a, b) => { return new Date(b.meta.date) - new Date(a.meta.date) })
    }
  }
}