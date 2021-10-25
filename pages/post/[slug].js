import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import styles from '../../styles/Post.module.scss'
import { useMarked } from '../../utils/useMarked'

export default function Post({ meta: { category, title, cover_image, date }, content, slug}) {
  const html = useMarked(content)

  return (
    <div className="container">
      <article>
        <h1>{title}</h1>
        <p>{date}</p>
        <Link href="/">
          <button className="btn-default">Go Back</button>
        </Link>
        <figure className={styles['post-img-banner']}>
          <img 
            src={cover_image} 
            alt={/[^/]*$/.exec(cover_image)[0].split('.')[0]}
          />
        </figure>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </article>
    </div>
  )
}

// List of paths
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }));

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')

  const { data:meta, content } = matter(markdownMeta)

  return {
    props: {
      content,
      meta,
      slug
    }
  }
}
