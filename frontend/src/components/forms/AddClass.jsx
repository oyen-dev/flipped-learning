import { Form, Input, Button, Select, message } from 'antd'

const { Option } = Select

const AddClass = () => {
  const onFinish = (values) => {
    console.log('Success:', values)

    message.info('Siap Hit API')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="addClassForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="w-full"
    >
      <p className="text-white text-base font-normal mb-0">Nama Kelas</p>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan nama lengkap!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Kelas/Jenjang</p>
      <Form.Item
        name="class"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan kelas/jenjang!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Guru/Pengajar</p>
      <Form.Item
        name="teacher"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan guru/pengajar!'
          }
        ]}
      >
        <Select
          showSearch
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLocaleLowerCase())}
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          <Option value="1">Reni Afrida, S.Pd.</Option>
          <Option value="2">Meong Pus, S.Pd.</Option>
          <Option value="3">Graita Sukma Febriansyah, S.Pd.</Option>
          <Option value="4">Febri Sinaga, S.Pd.</Option>
          <Option value="5">Anisa Laila, S.Pd.</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="text-white font-medium">Buat Kelas Baru</p>
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddClass
