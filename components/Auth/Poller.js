import React, {Component, PropTypes} from 'react'
import {graphql, withApollo} from 'react-apollo'
import {meQuery} from '../../lib/withMe'
import {compose} from 'redux'

class Status extends Component {
  constructor (props) {
    super(props)
    const now = (new Date()).getTime()
    this.state = {
      now,
      start: now
    }
    this.tick = () => {
      clearTimeout(this.tickTimeout)
      this.tickTimeout = setTimeout(
        () => {
          this.setState(() => ({
            now: (new Date()).getTime()
          }))
          this.tick()
        },
        1000
      )
    }
  }
  componentDidMount () {
    this.props.data.startPolling(1000)
    this.tick()
  }
  componentDidUpdate () {
    const {me, onSuccess} = this.props
    if (me) {
      clearTimeout(this.tickTimeout)
      const elapsedMs = this.state.now - this.state.start
      this.props.data.stopPolling()

      onSuccess && onSuccess(me, elapsedMs)
    }
  }
  componentWillUnmount () {
    clearTimeout(this.tickTimeout)
    // refetch everything with user context
    const client = this.props.client
    // nextTick to avoid in-flight queries
    setTimeout(
      () => {
        client.resetStore()
      },
      0
    )
  }
  render () {
    const elapsedMs = this.state.now - this.state.start

    const {data: {error, me}} = this.props
    if (me) {
      return null
    }

    return (
      <span>
        {Math.round(elapsedMs / 1000)}s
        {' '}{!!error && error.toString()}
      </span>
    )
  }
}

Status.propTypes = {
  onSuccess: PropTypes.func
}

export default compose(
  graphql(meQuery),
  withApollo
)(Status)
