import { Link } from 'react-router-dom'
import { Result, Button } from 'antd'

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <div className='flex flex-col space-y-4'>
          <Link to={-1}>
            <Button type="primary">Back</Button>
          </Link>

          <Link to={'/dashboard'}>
            <Button type="primary">Dashboard</Button>
          </Link>
        </div>
      }
    />
  )
}

export default NotFound
