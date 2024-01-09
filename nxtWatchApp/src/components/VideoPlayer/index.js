import ReactPlayer from 'react-player'

import {Container} from './styledComponents'

const VideoPlayer = props => {
  const {videoUrl} = props
  return (
    <Container>
      <ReactPlayer
        url={videoUrl}
        controls
        className="video-player"
        width="100%"
        height="90%"
      />
    </Container>
  )
}

export default VideoPlayer
