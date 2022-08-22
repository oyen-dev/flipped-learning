import Head from 'next/head'

import { Form, Input, Button } from 'antd'

export default function Home () {
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container h-screen flex flex-col px-5 py-2 bg-gray-800 items-center justify-center space-y-10 text-white">
        <div className="flex w-full space-x-10 justify-center lg:justify-start">
          <div className="w-20 h-20 bg-gray-200" />
          <div className="w-20 h-20 bg-gray-200" />
        </div>
        <p className="font-bold text-xl md:text-2xl lg:text-3xl text-center tracking-wide">
          Pendaftaran Pengguna Flipped Learning
        </p>
        <div className="flex flex-col w-[80%] md:w-[30%] space-y-4">
          <Form
            name="loginForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <p className="text-white text-base font-medium mb-0">Email</p>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Mohon masukkan email terdaftar Anda!'
                }
              ]}
            >
              <Input placeholder="Masukkan email Anda" value={'Kucing'}/>
            </Form.Item>

            <p className="text-white text-base font-medium mb-0">Password</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Mohon masukkan password Anda!'
                }
              ]}
            >
              <Input.Password placeholder="Masukkan password Anda" />
            </Form.Item>

            <div className="flex flex-col space-y-1 items-end text-white">
              <p className="text-base font-bold">Lupa password?</p>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Submit
              </Button>
            </Form.Item>

            <div className="flex flex-col space-y-2 items-center text-white">
              <p className="text-base font-light mb-0">Belum punya akun?</p>
              <Button type='default' className='w-full'>Daftar</Button>
            </div>
          </Form>
        </div>
      </main>
    </div>
  )
}
