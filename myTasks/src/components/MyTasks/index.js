import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TagItem from '../TagItem'

import Tasks from '../Tasks'

import {
  Container,
  InputContainer,
  InputHeading,
  Form,
  InputLabelContainer,
  Label,
  Input,
  AddButton,
  Option,
  TagsAndTasksBgContainer,
  TagsContainer,
  RightContainerHeading,
  TasksContainer,
  NoTasksContainer,
  NoTaskHeading,
} from './styledComponents'

class MyTasks extends Component {
  state = {
    tasksList: [],
    taskInput: '',
    activeTag: 'HEALTH',
    activeOption: 'INITIAL',
  }

  onSubmitForm = event => {
    const {taskInput, activeTag} = this.state
    event.preventDefault()
    const newTask = {
      id: uuidv4(),
      task: taskInput,
      tag: activeTag,
    }
    if (taskInput !== '') {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        taskInput: '',
        activeTag: 'HEALTH',
      }))
    }
  }

  onTaskInputChange = event => {
    this.setState({taskInput: event.target.value})
  }

  onTagChange = event => {
    this.setState({activeTag: event.target.value})
  }

  onChooseTag = id => {
    this.setState({activeOption: id})
  }

  renderLeftContainer = () => {
    const {tagsList} = this.props
    const {taskInput, activeTag} = this.state
    return (
      <InputContainer>
        <InputHeading>Create a task!</InputHeading>
        <Form onSubmit={this.onSubmitForm}>
          <InputLabelContainer>
            <Label htmlFor="task">Task</Label>
            <Input
              type="text"
              id="task"
              placeholder="Enter the task here"
              value={taskInput}
              onChange={this.onTaskInputChange}
              aria-label="Task"
            />
          </InputLabelContainer>
          <InputLabelContainer>
            <Label htmlFor="tags">Tags</Label>
            <Input
              type="text"
              as="select"
              id="tags"
              placeholder="Enter the task here"
              onChange={this.onTagChange}
              value={activeTag}
            >
              {tagsList.map(eachOption => (
                <Option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </Option>
              ))}
            </Input>
          </InputLabelContainer>
          <AddButton type="submit">Add Task</AddButton>
        </Form>
      </InputContainer>
    )
  }

  renderTags = () => {
    const {tagsList} = this.props
    return (
      <>
        {tagsList.map(eachTag => (
          <TagItem
            tagDetails={eachTag}
            key={eachTag.optionId}
            onChooseTag={this.onChooseTag}
          />
        ))}
      </>
    )
  }

  renderTasks = () => {
    const {tasksList} = this.state
    const {activeOption} = this.state
    const filteredList =
      activeOption === 'INITIAL'
        ? tasksList
        : tasksList.filter(eachItem => eachItem.optionId === activeOption)
    return (
      <>
        {filteredList.map(eachTask => (
          <Tasks key={eachTask.id} taskDetails={eachTask} />
        ))}
      </>
    )
  }

  renderNoTaskView = () => (
    <NoTasksContainer>
      <NoTaskHeading>No Tasks Added Yet</NoTaskHeading>
    </NoTasksContainer>
  )

  renderRightContainer = () => {
    const {tasksList} = this.state
    const lengthOfTasksList = tasksList.length
    return (
      <TagsAndTasksBgContainer>
        <RightContainerHeading>Tags</RightContainerHeading>
        <TagsContainer>{this.renderTags()}</TagsContainer>
        <RightContainerHeading>Tasks</RightContainerHeading>
        <TasksContainer>
          {lengthOfTasksList > 0 ? this.renderTasks() : this.renderNoTaskView()}
        </TasksContainer>
      </TagsAndTasksBgContainer>
    )
  }

  render() {
    return (
      <Container>
        {this.renderLeftContainer()} {this.renderRightContainer()}
      </Container>
    )
  }
}

export default MyTasks
