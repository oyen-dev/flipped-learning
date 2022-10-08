import { useGlobal } from '../../contexts/Global'

import api from '../../api'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'

const { Option } = Select

const AddClass = () => {
  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Navigator
  const navigate = useNavigate()

  const onFinish = async (values) => {
    // console.log('Success:', values)
    // Show loading
    mySwal.fire({
      title: 'Creating class...',
      showConfirmButton: false,
      didOpen: () => {
        mySwal.showLoading()
      }
    })

    await createClass(values)
  }

  const createClass = async (values) => {
    await api.post('/classes', {
      name: values.name,
      class: values.class
    }).then((res) => {
      console.log(res.data)

      if (res.data.statusCode === 201) {
        // Show success message using mySwal
        mySwal.fire({
          icon: 'success',
          title: 'Created class successfully',
          text: "You'll be redirected to the class page",
          timer: 4000,
          showConfirmButton: false
        }).then(async () => {
          // Todo : Redirect to class page
          navigate(res.data.data._id)
        })
      } else {
        // Show error message using mySwal
        mySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.data.message,
          timer: 4000,
          showConfirmButton: false
        })
      }
    }).catch((err) => {
      console.log(err)
      mySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.message,
        timer: 4000,
        showConfirmButton: false
      })
    })
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
      <p className="text-white text-base font-normal mb-0">
        Nama Kelas/Mata Pelajaran
      </p>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan nama kelas/mata pelajaran'
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
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLocaleLowerCase())
          }
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
