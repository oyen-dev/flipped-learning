import { Link } from 'react-router-dom'
import { Result, Button } from 'antd'

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to={-1}>
          <Button type="primary">Back</Button>
        </Link>
      }
    />
  )
}

export default NotFound
