import { useState } from 'react'

import Smile1 from '../../assets/images/1.png'
import Smile2 from '../../assets/images/2.png'
import Smile3 from '../../assets/images/3.png'
import Smile4 from '../../assets/images/4.png'
import Smile5 from '../../assets/images/5.png'
import momentId from '../../constants/momentId'

import { JudgeSubmission } from '../forms'
import { Attachment } from '../others'
import { AttachmentDetail } from '../../views/class'

import moment from 'moment/moment'
moment.updateLocale('id', momentId)

const GradeSubmission = (props) => {
  // Props destructuring
  const { currentSubmissionData } = props
  const { answers, attachments, updatedAt, feedback, points, reaction, _id } = currentSubmissionData

  // Local states
  const [attachmentVisible, setAttachmentVisible] = useState(false)
  const [currentAttachment, setCurrentAttachment] = useState(null)

  // Define reaction
  const defineReaction = (reaction) => {
    let emoji = null

    if (reaction === 1) emoji = <img src={Smile1} alt="emoji" className="w-8 h-8" />
    else if (reaction === 2) emoji = <img src={Smile2} alt="emoji" className="w-8 h-8" />
    else if (reaction === 3) emoji = <img src={Smile3} alt="emoji" className="w-8 h-8" />
    else if (reaction === 4) emoji = <img src={Smile4} alt="emoji" className="w-8 h-8" />
    else emoji = <img src={Smile5} alt="emoji" className="w-8 h-8" />

    return emoji
  }

  // Handle show attachment
  const showAttachment = (attachmentId) => {
    // Reset states
    setAttachmentVisible(false)
    setCurrentAttachment(null)

    setCurrentAttachment(attachmentId)
    setAttachmentVisible(true)
  }

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
            <Attachment {...attachment} key={attachment._id} isTeacher={true} showAttachment={showAttachment} />
          ))}
        </div>
      </div>

      {/* Reaction */}
      <div className="flex flex-row space-x-2 pt-2 items-center">
        <p className="mb-0 font-bold">Reaksi Siswa: </p>
        {defineReaction(reaction)}
      </div>

      {/* Time of submisson */}
      <div className="flex flex-row w-full space-x-2">
        <p className="mb-0 font-bold">Pengumpulan: </p>
        {/* Text */}
        <p className='mb-0'>{moment(updatedAt).format('LLLL')}</p>
      </div>

      {/* Judging Form  */}
      <JudgeSubmission {...{ feedback, points, _id }} />

      {/* Attachment View */}
      {attachmentVisible && currentAttachment
        ? <AttachmentDetail attachmentId={currentAttachment} />
        : null
      }
    </div>
  )
}

export default GradeSubmission
