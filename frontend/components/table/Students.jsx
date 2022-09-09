import { Table } from 'antd'
import UserAction from './UserAction'

const Students = (props) => {
  const { students } = props
  const columns = [
    {
      title: (
        <p className="text-white uppercase text-sm text-center leading-normal mb-0">
          No
        </p>
      ),
      dataIndex: 'no',
      key: 'no',
      render: (no) => (
        <p className="font-medium text-center whitespace-nowrap mb-0">{no}</p>
      )
    },
    {
      title: (
        <p className="text-white uppercase text-sm leading-normal mb-0">Nama</p>
      ),
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <p className="font-medium whitespace-nowrap mb-0">{name}</p>
      )
    },
    {
      title: (
        <p className="text-white uppercase text-sm leading-normal mb-0">
          Email
        </p>
      ),
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <a
          href={`mailto:${email}`}
          className="font-medium whitespace-nowrap mb-0"
        >
          {email}
        </a>
      )
    },
    {
      title: (
        <p className="text-white uppercase text-sm text-center leading-normal mb-0">
          Action
        </p>
      ),
      key: 'action',
      render: () => <UserAction />
    }
  ]

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize)
  }

  return (
    <Table
      columns={columns}
      dataSource={students}
      tableLayout="auto"
      className="w-full"
      pagination={{ position: ['bottomLeft'], showSizeChanger: true, onShowSizeChange }}
      rowClassName={() => 'text-gray-900 dark:text-white dark:hover:text-gray-900 bg-gray-100 dark:bg-[#17171A] transition-all duration-300 ease-in-out'}
    />
  )
}

export default Students
