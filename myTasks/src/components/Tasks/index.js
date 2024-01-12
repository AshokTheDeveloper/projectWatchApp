import {Container, Task, Tag} from './styledComponents'

const Tasks = props => {
  const {taskDetails} = props
  const {task, tag} = taskDetails
  return (
    <Container>
      <Task>{task}</Task>
      <Tag>{tag}</Tag>
    </Container>
  )
}

export default Tasks
