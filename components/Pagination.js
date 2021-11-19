import styles from '../styles/Pagination.module.scss'
import Icon from '@mui/material/Icon'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'

export default function Pagination({ totalPosts, postsPerPage, currentPage, onChange }) {
  const pages = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i)
  }

  return (
    <nav className={styles.pagination}>
      <ul>
        <li 
          className={styles['icons-pagination']} 
          onClick={() => currentPage == 1 || onChange(currentPage - 1)}
        >
          <Icon color="inherit">
            <ArrowBackIosRoundedIcon />
          </Icon>
        </li>

        { pages.map((page) => (
          <li 
            key={page} 
            className={ page == currentPage ? styles['current-page'] : styles['pages-pagination']}
            onClick={() => onChange(page)}
          >
            <span>{page}</span>
          </li>
        )) }

        <li 
          className={styles['icons-pagination']} 
          onClick={() => currentPage == pages.length || onChange(currentPage + 1)}
        >
          <Icon color="inherit">
            <ArrowForwardIosRoundedIcon />
          </Icon>
        </li>
      </ul>
    </nav>
  )
}
