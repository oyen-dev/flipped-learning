import Smile1 from '../../assets/images/1.png'
import Smile2 from '../../assets/images/2.png'
import Smile3 from '../../assets/images/3.png'
import Smile4 from '../../assets/images/4.png'
import Smile5 from '../../assets/images/5.png'
import momentId from '../../constants/momentId'

import { JudgeSubmission } from '../forms'
import { Attachment } from '../others'

import moment from 'moment/moment'
moment.updateLocale('id', momentId)

const GradeSubmission = (props) => {
  // Props destructuring
  const { currentSubmissionData } = props
  const { answers, attachments, updatedAt, feedback, points, reaction, _id } = currentSubmissionData

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Answer */}
      <div className="flex flex-row w-full space-x-2">
        <p className="mb-0 font-bold">Jawaban Siswa: </p>
        {/* Text */}
        <p className='mb-0'>{answers}</p>
      </div>

      {/* Attachment */}
      <div className="flex flex-row w-full space-x-2">
        <p className="mb-0 font-bold">Lampiran: </p>
        {/* Attachment */}
        <div className="flex flex-col w-full space-y-2">
          {attachments.map((attachment) => (
            <Attachment {...attachment} key={attachment._id} isTeacher={true} />
          ))}
        </div>
      </div>

      {/* Reaction */}
      <div className="flex flex-row space-x-2 pt-2 items-center">
        <p className="mb-0 font-bold">Reaksi Siswa: </p>
        {reaction === 1
          ? (
          <img src={Smile1} alt="emoji" className="w-8 h-8" />
            )
          : reaction === 2
            ? (
          <img src={Smile2} alt="emoji" className="w-8 h-8" />
              )
            : reaction === 3
              ? (
          <img src={Smile3} alt="emoji" className="w-8 h-8" />
                )
              : reaction === 4
                ? (
          <img src={Smile4} alt="emoji" className="w-8 h-8" />
                  )
                : (
          <img src={Smile5} alt="emoji" className="w-8 h-8" />
                  )}
      </div>

      {/* Time of submisson */}
      <div className="flex flex-row w-full space-x-2">
        <p className="mb-0 font-bold">Pengumpulan: </p>
        {/* Text */}
        <p className='mb-0'>{moment(updatedAt).format('LLLL')}</p>
      </div>

      {/* Judging Form  */}
        <JudgeSubmission {...{ feedback, points, _id }} />
    </div>
  )
}

export default GradeSubmission
