import styles from '../styles/Posts.module.scss'
import Link from 'next/link'


export default function Posts({ posts }) {
  return (
    <main className={styles.content}>
      { posts.map((post, index) => (
        <article key={index}>
          <Link href={`/post/${post.slug}`}>
            <figure>
              <div className={styles.category}>{post.meta.category}</div>
              <img 
                src={post.meta.cover_image} 
                alt={/[^/]*$/.exec(post.meta.cover_image)[0].split('.')[0]}
              />
            </figure>
          </Link>
          <h1>{post.meta.title}</h1>
          <p className={styles.description}>{post.meta.description}</p>
          <p className={styles.date}>{post.meta.date}</p>
          <hr />
        </article>
      ))}

    </main>
  )
}
