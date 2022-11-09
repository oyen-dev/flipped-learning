import { Empty } from '../../pages/error'
import { Post, PostHeader } from '../../components/card'

import { Collapse } from 'antd'
import { BsChevronRight, BsChevronDown } from 'react-icons/bs'

const { Panel } = Collapse

const PostList = (props) => {
  // Destructure props
  const { posts, setFetchPosts } = props

  return (
    <div className="flex w-full">
      {posts.length === 0
        ? <Empty message="Belum ada informasi atau postingan di kelas." />
        : <Collapse
            className="flex flex-col w-full space-y-10 site-collapse-custom-collapse"
            expandIconPosition="end"
            expandIcon={({ isActive }) =>
              isActive
                ? (
                <BsChevronDown className="w-5 h-5 fill-black dark:fill-white duration-300 ease-in-out" />
                  )
                : (
                <BsChevronRight className="w-5 h-5 fill-black dark:fill-white duration-300 ease-in-out" />
                  )
            }
            // expandIcon={({ isActive }) => <RightOutlined className='text-white fill-white' rotate={isActive ? 90 : 0} />}
            style={{ backgroundColor: 'transparent', border: 'none' }}
          >
            {posts.map((post, index) => {
              const headerProps = {
                picture: post.teacherId.picture,
                title: post.title,
                createdAt: post.createdAt,
                isUpdated: post.createdAt !== post.updatedAt,
                updatedAt: post.updatedAt
              }

              const postProps = {
                description: post.description,
                attachments: post.attachments,
                postId: post._id,
                setFetchPosts
              }
              return (
                <Panel
                  header={<PostHeader {...headerProps} />}
                  key={post._id}
                  className="flex flex-col w-full text-black dark:text-white bg-[#e9ecef] dark:bg-gray-700 transition-all ease-in-out duration-300"
                >
                  <Post {...postProps} />
                </Panel>
              )
            })}
          </Collapse>
          }
    </div>
  )
}

export default PostList
