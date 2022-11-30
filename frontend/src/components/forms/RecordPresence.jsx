import { Form, Button, message } from 'antd'
import { useState } from 'react'

import Emoji1 from '../../assets/gif/1.gif'
import Emoji2 from '../../assets/gif/2.gif'
import Emoji3 from '../../assets/gif/3.gif'
import Emoji4 from '../../assets/gif/4.gif'
import Emoji5 from '../../assets/gif/5.gif'
import Emoji6 from '../../assets/gif/6.gif'
import Emoji7 from '../../assets/gif/7.gif'
import Emoji8 from '../../assets/gif/8.gif'

const { Item } = Form

const RecordPresence = () => {
  // Local States
  const [isSelectted, setIsSelected] = useState(false)
  const [isAttended, setIsAttended] = useState(true)
  const [reaction, setReaction] = useState(null)
  const [attendance, setAttendance] = useState(1)

  // Emoji data
  const [reactions] = useState([
    {
      value: 1,
      image: Emoji1
    },
    {
      value: 2,
      image: Emoji2
    },
    {
      value: 3,
      image: Emoji3
    },
    {
      value: 4,
      image: Emoji4
    },
    {
      value: 5,
      image: Emoji5
    }
  ])
  const [attendances] = useState([
    {
      value: 1,
      image: Emoji6
    },
    {
      value: 2,
      image: Emoji7
    },
    {
      value: 3,
      image: Emoji8
    }
  ])

  // Handler reaction
  const handleReaction = (e) => {
    setReaction(e)

    if (!isSelectted) setIsSelected(true)
  }

  // Handler attendance
  const handleAttendance = (e) => {
    setAttendance(e)

    if (!isAttended) setIsAttended(true)
  }

  // onFinish
  const onFinish = () => {
    if (!isSelectted) {
      message.error('Silahkan pilih reaksi terlebih dahulu')
      return
    }

    const payload = {
      attendance,
      reaction,
      at: new Date()
    }

    console.log(payload)
  }

  // onFinishFailed
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="flex flex-col w-full space-y-4">

      {/* Attendance */}
      <div
        className={`flex flex-col space-y-2 items-center bg-white w-full ${
          isAttended ? 'h-32' : 'h-24'
        } rounded-lg duration-300 ease-in-out`}
      >
        <p className="text-black text-base font-normal mb-0 py-2">
          Saya {' '}
          {attendance === 1
            ? <span className='font-bold'>hadir</span>
            : attendance === 2
              ? <span className='font-bold'>sakit</span>
              : <span className='font-bold'>izin</span>
          }
        </p>
        <div className="flex flex-row space-x-2 bg-white">
          {/* Emoji 1 */}
          <div>
            <input
              type="radio"
              name="attendance"
              id="attd"
              className="input-hidden"
            />
            <label htmlFor="attd">
              <img
                src={attendances[0].image}
                onClick={() => handleAttendance(1)}
                className={`cursor-pointer ${
                  attendance === 1 ? 'w-20 h-20 ' : 'w-10 h-10'
                }`}
              />
            </label>
          </div>

          {/* Emoji 2 */}
          <div>
            <input
              type="radio"
              name="attendance"
              id="attd"
              className="input-hidden"
            />
            <label htmlFor="attd">
              <img
                src={attendances[1].image}
                onClick={() => handleAttendance(2)}
                className={`cursor-pointer ${
                  attendance === 2 ? 'w-20 h-20 ' : 'w-10 h-10'
                }`}
              />
            </label>
          </div>

          {/* Emoji 3 */}
          <div>
            <input
              type="radio"
              name="attendance"
              id="attd"
              className="input-hidden"
            />
            <label htmlFor="attd">
              <img
                src={attendances[2].image}
                onClick={() => handleAttendance(3)}
                className={`cursor-pointer ${
                  attendance === 3 ? 'w-20 h-20 ' : 'w-10 h-10'
                }`}
              />
            </label>
          </div>

        </div>
      </div>

      {/* Reaction */}
      <div
        className={`flex flex-col space-y-2 items-center bg-white w-full ${
          isSelectted ? 'h-32' : 'h-24'
        } rounded-lg duration-300 ease-in-out`}
      >
        <p className="text-black text-base font-normal mb-0 py-2">
          Reaksi kamu selama mengikuti kelas:
        </p>
        <div className="flex flex-row space-x-2 bg-white">
          {/* Emoji 1 */}
          <div>
            <input
              type="radio"
              name="emotion"
              id="sad"
              className="input-hidden"
            />
            <label htmlFor="sad">
              <img
                src={reactions[0].image}
                onClick={() => handleReaction(1)}
                className={`cursor-pointer ${
                  reaction === 1 ? 'w-20 h-20 ' : 'w-10 h-10'
                }`}
              />
            </label>
          </div>

          {/* Emoji 2 */}
          <div>
            <input
              type="radio"
              name="emotion"
              id="sad"
              className="input-hidden"
            />
            <label htmlFor="sad">
              <img
                src={reactions[1].image}
                onClick={() => handleReaction(2)}
                className={`cursor-pointer ${
                  reaction === 2 ? 'w-20 h-20 ' : 'w-10 h-10'
                }`}
              />
            </label>
          </div>

          {/* Emoji 3 */}
          <div>
            <input
              type="radio"
              name="emotion"
              id="sad"
              className="input-hidden"
            />
            <label htmlFor="sad">
              <img
                src={reactions[2].image}
                onClick={() => handleReaction(3)}
                className={`cursor-pointer ${
                  reaction === 3 ? 'w-20 h-20 ' : 'w-10 h-10'
                }`}
              />
            </label>
          </div>

          {/* Emoji 4 */}
          <div>
            <input
              type="radio"
              name="emotion"
              id="sad"
              className="input-hidden"
            />
            <label htmlFor="sad">
              <img
                src={reactions[3].image}
                onClick={() => handleReaction(4)}
                className={`cursor-pointer ${
                  reaction === 4 ? 'w-20 h-20 ' : 'w-10 h-10'
                }`}
              />
            </label>
          </div>

          {/* Emoji 5 */}
          <div>
            <input
              type="radio"
              name="emotion"
              id="sad"
              className="input-hidden"
            />
            <label htmlFor="sad">
              <img
                src={reactions[4].image}
                onClick={() => handleReaction(5)}
                className={`cursor-pointer ${
                  reaction === 5 ? 'w-20 h-20 ' : 'w-10 h-10'
                }`}
              />
            </label>
          </div>
        </div>
      </div>

      <Form
        name='record-presence'
        className='w-full'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* Button */}
      <Item>
        <Button type="primary" htmlType="submit" className="w-full">
          <p className="font-medium">Rekam Presensi</p>
        </Button>
      </Item>

      </Form>

    </div>
  )
}

export default RecordPresence
