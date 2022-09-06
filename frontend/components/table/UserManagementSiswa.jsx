import { Table } from 'antd'
import UserAction from './UserAction'

const UserManagementSiswa = () => {
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
          No Telepon
        </p>
      ),
      dataIndex: 'telp',
      key: 'telp',
      render: (text) => (
        <p className="font-medium text-center whitespace-nowrap mb-0">{text}</p>
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
  const data = [
    {
      key: '1',
      no: '1',
      name: 'John Brown',
      email: 'kucing@meong.com',
      telp: '081335488360'
    },
    {
      key: '2',
      no: '2',
      name: 'Jim Green',
      email: 'kucingbarong@meong.com',
      telp: '081335488360'
    },
    {
      key: '3',
      no: '3',
      name: 'Joe Black',
      email: 'kon67kucing@meong.com',
      telp: '081335488360'
    }
  ]

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize)
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      tableLayout="auto"
      className="w-full"
      pagination={{ position: ['bottomLeft'], showSizeChanger: true, onShowSizeChange }}
      rowClassName={() => 'bg-white'}
    />
  )
}

export default UserManagementSiswa
