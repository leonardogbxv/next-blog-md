import styles from '../styles/Posts.module.scss'
import Link from 'next/link'
import Icon from '@mui/material/Icon'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Posts({ posts }) {
  const deletePost = () => {/* todo */}

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

          <section>
            <div>
              <h1>{post.meta.title}</h1>
              <p className={styles.description}>{post.meta.description}</p>
              <p className={styles.date}>{post.meta.date}</p>
            </div>

            <div>
              <div className={styles["edit-icon"]}>
                <Icon color="inherit">
                  <EditIcon />
                </Icon>
              </div>

              <div 
                className={styles["delete-icon"]}
                onClick={() => deletePost()}
              >
                <Icon color="inherit">
                  <DeleteIcon />
                </Icon>
              </div>
            </div>
          </section>
          <hr />
        </article>
      ))}

    </main>
  )
}
