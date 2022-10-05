import { useGlobal } from '../../contexts/Global'

import api from '../../api'
import { PrivacyPolicy } from '../modals'

import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment'
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Checkbox,
  message
} from 'antd'

const Register = () => {
  // Global context
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Navigator
  const navigate = useNavigate()

  const register = async (values) => {
    await api.post('/auth/register', values).then((res) => {
      // console.log(res.data)
      if (res.data.statusCode === 201) {
        // Show success message using mySwal
        mySwal.fire({
          icon: 'success',
          title: 'Register Success',
          text: 'Please check your email to verify your account',
          timer: 5000,
          showConfirmButton: false
        }).then(() => {
          navigate('/auth')
        })
      } else {
        // Show error message using mySwal
        mySwal.fire({
          icon: 'error',
          title: 'Register Failed',
          text: 'Make sure you fill all the fields correctly',
          timer: 5000,
          showConfirmButton: false
        })
      }
    }).catch((error) => {
      console.log(error)
      mySwal.fire({
        icon: 'error',
        title: 'Register Failed',
        text: 'Make sure you fill all the fields correctly',
        timer: 5000,
        showConfirmButton: false
      })
    })
  }

  const onFinish = (values) => {
    // Destrucutre values
    const { email, fullName, gender, dateOfBorn, placeOfBorn, address, password, confirmPassword, agree } = values

    if (!agree) {
      message.error(
        'Mohon setujui ketentuan penggunaan dan kebijakan privasi!'
      )
    } else if (password.length < 8) {
      message.error('Mohon buat password dengan minimal 8 karakter!')
    } else if (password !== confirmPassword) {
      message.error('Mohon maaf, password belum sesuai.')
    } else {
      const payload = {
        email,
        fullName,
        gender,
        dateOfBorn: moment(dateOfBorn).format('YYYY-MM-DD'),
        placeOfBorn,
        address,
        password
      }

      // Show loadng
      mySwal.fire({
        title: 'Registering you in...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          mySwal.showLoading()
        }
      })

      register(payload)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf('day')
  }

  return (
    <Form
      name="registerForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <p className="text-white text-base font-normal mb-0">Nama Lengkap</p>
      <Form.Item
        name="fullName"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan nama lengkap Anda!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Email</p>
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'Mohon masukkan email yang valid!'
          },
          {
            required: true,
            message: 'Mohon masukkan email aktif Anda!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Jenis Kelamin</p>
      <Form.Item
        name="gender"
        rules={[
          {
            required: true,
            message: 'Mohom memilih jenis kelamin Anda!'
          }
        ]}
      >
        <Select>
          <Select.Option value="Male">Laki</Select.Option>
          <Select.Option value="Female">Perempuan</Select.Option>
        </Select>
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Tanggal Lahir</p>
      <Form.Item
        name="dateOfBorn"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan tanggal lahir Anda!'
          }
        ]}
      >
        {/* <DatePicker className="w-full" /> */}
        <DatePicker className="w-full" format={'YYYY-MM-DD'}
            style={{ width: '100%' }}
            disabledDate={disabledDate}
          />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Tempat Lahir</p>
      <Form.Item
        name="placeOfBorn"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan tempat lahir Anda!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Alamat</p>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan data alamat Anda!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">Password</p>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Mohon masukkan password Anda!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <p className="text-white text-base font-normal mb-0">
        Konfirmasi Password
      </p>
      <Form.Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: 'Mohon konfirmasi password Anda!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <div className="flex flex-row items-start justify-start space-x-4 text-white">
        <Form.Item name="agree" valuePropName="checked">
          <div className="flex flex-row space-x-4">
            <Checkbox />
            <p className="text-sm justify-center text-justify text-white">
              Dengan mencentang kotak ini, saya menyetujui{' '}
              <label
                htmlFor="modal-privacy-policy"
                className="modal-button font-bold hover:text-blue-500 duration-150 cursor-pointer"
              >
                Ketentuan Penggunaan
              </label>{' '}
              dan{' '}
              <label
                htmlFor="modal-privacy-policy"
                className="modal-button font-bold hover:text-blue-500 duration-150 cursor-pointer"
              >
                Kebijakan Privasi
              </label>{' '}
              Flipped Learning.
            </p>
          </div>
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="text-white font-medium">Daftar Flipped Learning</p>
        </Button>
      </Form.Item>

      {/* Modal container */}
      <input
        type="checkbox"
        id="modal-privacy-policy"
        className="modal-toggle"
      />
      <PrivacyPolicy />
    </Form>
  )
}

export default Register
