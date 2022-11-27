import { Select } from 'antd'

const { Option } = Select

const FilterOption = (props) => {
  const { setFilter } = props
  const handleChange = (value) => {
    console.log(`selected ${value}`)
    setFilter(value)
  }

  return (
    <Select
      placeholder="Filter class"
      allowClear={true}
      onChange={handleChange}
    >
      <Option value="X">X</Option>
      <Option value="XI">XI</Option>
      <Option value="XII">XII</Option>
    </Select>
  )
}

export default FilterOption
