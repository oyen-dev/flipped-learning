// import { Empty } from '../../pages/error'
import { Post, PostHeader } from '../../components/card'

import { Collapse } from 'antd'
import { BsChevronRight, BsChevronDown } from 'react-icons/bs'

const { Panel } = Collapse

const PostList = (props) => {
  // Destructure props
  // const { posts } = props

  const changePanel = (key) => {
    console.log(key)
  }

  return (
    <div className="flex w-full">
      <Collapse
        defaultActiveKey={['1']}
        onChange={changePanel}
        className="flex flex-col w-full space-y-10 site-collapse-custom-collapse"
        expandIconPosition='right'
        expandIcon={({ isActive }) => isActive ? <BsChevronDown className='w-5 h-5 fill-black dark:fill-white duration-300 ease-in-out'/> : <BsChevronRight className='w-5 h-5 fill-black dark:fill-white duration-300 ease-in-out'/>}
        // expandIcon={({ isActive }) => <RightOutlined className='text-white fill-white' rotate={isActive ? 90 : 0} />}
        style={{ backgroundColor: 'transparent', border: 'none' }}
      >
        <Panel
          header={<PostHeader />}
          key={'1'}
          className="flex flex-col w-full text-black dark:text-white bg-[#e9ecef] dark:bg-gray-700 transition-all ease-in-out duration-300"
          >
          <Post description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga tempore a, quos culpa laboriosam repudiandae, quasi rem eligendi quo voluptates deserunt obcaecati recusandae omnis ullam quibusdam distinctio, dolore ipsum autem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga tempore a, quos culpa laboriosam repudiandae, quasi rem eligendi quo voluptates deserunt obcaecati recusandae omnis ullam quibusdam distinctio, dolore ipsum autem!' />
        </Panel>

        <Panel
          header={<PostHeader />}
          key={'2'}
          className="flex flex-col w-full text-black dark:text-white bg-[#e9ecef] dark:bg-gray-700 transition-all ease-in-out duration-300"
          >
          <Post description='Ini post kedua'/>
        </Panel>
      </Collapse>
    </div>
  )
}

export default PostList
