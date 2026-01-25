import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

const PostCard = ({post}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image 
            src={post.img || "/noAvatar.png"} 
            alt={post.title || "Blog post"} 
            fill 
            className={styles.img}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <span className={styles.date}>{post.createdAt?.toString().slice(0, 10)}</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.body}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>READ MORE</Link>
      </div>
    </div>
  )
}

export default PostCard