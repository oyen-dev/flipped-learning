import { useAuth } from '../../contexts/Auth'

import { Empty } from '../../pages/error'
import { Post, PostHeader, Submission } from '../../components/card'
import { StudentTasks } from '../../components/tables'

import { Collapse } from 'antd'
import { BsChevronRight, BsChevronDown } from 'react-icons/bs'

const { Panel } = Collapse

const PostList = (props) => {
  // Destructure props
  const { posts, setFetchPosts, isTask } = props

  // Auth States
  const { authState } = useAuth()
  const { user } = authState

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
            {posts.map((post) => {
              const postProps = {
                ...post,
                setFetchPosts
              }
              return (
                <Panel
                  header={<PostHeader {...post} />}
                  key={post._id}
                  className="flex flex-col w-full text-black dark:text-white bg-[#e9ecef] dark:bg-gray-700 transition-all ease-in-out duration-300"
                >
                  {isTask
                    ? user.role === 'STUDENT'
                      ? <Submission {...postProps} />
                      : <StudentTasks {...postProps} />
                    : <Post {...postProps} />
                  }
                </Panel>
              )
            })}
          </Collapse>
          }
    </div>
  )
}

export default PostList
