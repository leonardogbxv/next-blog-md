import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Posts from "../components/Posts"

export default function Home({ posts }) {
  return (
    <div className="container">
      <Posts posts={posts} />
    </div>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const markdownMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data:meta } = matter(markdownMeta)

    return {
      slug,
      meta
    }
  })

  return {
    props: { posts }
  }
}