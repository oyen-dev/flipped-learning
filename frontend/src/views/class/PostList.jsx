import { Empty } from '../../pages/error'

const PostList = (props) => {
  // Destructure props
  const { posts } = props
  console.log(posts)

  return (
    <Empty message="Belum ada postingan di kelas ini." />
  )
}

export default PostList
