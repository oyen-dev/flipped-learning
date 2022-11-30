import { PresenceHeader } from '../../components/card'

import { Collapse } from 'antd'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'

const { Panel } = Collapse

const PresenceList = (props) => {
  // Destructure props
  const { presences } = props
  return (
    <div className="flex flex-col w-full">
      <Collapse
        className="flex flex-col w-full space-y-5 site-collapse-custom-collapse"
        expandIconPosition="end"
        expandIcon={({ isActive }) =>
          isActive
            ? <BsChevronDown className="w-5 h-5 fill-black dark:fill-white duration-300 ease-in-out" />
            : <BsChevronRight className="w-5 h-5 fill-black dark:fill-white duration-300 ease-in-out" />
        }
        // expandIcon={({ isActive }) => <RightOutlined className='text-white fill-white' rotate={isActive ? 90 : 0} />}
        style={{ backgroundColor: 'transparent', border: 'none' }}
      >
        {presences.map((presence, index) => (
          <Panel
            key={index}
            header={<PresenceHeader time={presence.start} />}
            className="flex flex-col w-full text-black dark:text-white bg-[#e9ecef] dark:bg-gray-700 transition-all ease-in-out duration-300"
          >
            <p>{presence._id}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}

export default PresenceList
