import momentId from '../../constants/momentId'

import { Spin } from 'antd'
import moment from 'moment/moment'
moment.updateLocale('id', momentId)

const RecentAccess = (props) => {
  const { logs } = props

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th className="py-3 text-center">Tanggal</th>
          <th className="py-3 text-center">Jam</th>
        </tr>
      </thead>
      <tbody className="text-black text-xs font-light">
        {logs === null
          ? (
          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300">
            <td className="py-3 text-left whitespace-nowrap">
              <div className="flex items-center justify-center">
                <span className="font-medium">{<Spin size="small" />}</span>
              </div>
            </td>
            <td className="py-3  text-left">
              <div className="flex items-center justify-center">
                <span className="font-medium">{<Spin size="small" />}</span>
              </div>
            </td>
          </tr>
            )
          : (
              logs.map((log, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 bg-gray-50 hover:bg-gray-300"
            >
              <td className="py-3 text-left whitespace-nowrap">
                <div className="flex items-center justify-center">
                  <span className="font-medium">{`${moment(log.at).format(
                    'dddd'
                  )}, ${moment(log.at).format('LL')}`}</span>
                </div>
              </td>
              <td className="py-3  text-left">
                <div className="flex items-center justify-center">
                  <span className="font-medium">
                    {moment(log.at).format('LTS')}
                  </span>
                </div>
              </td>
            </tr>
              ))
            )}
      </tbody>
    </table>
  )
}

export default RecentAccess
