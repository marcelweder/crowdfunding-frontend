import React, {Component} from 'react'
import {geoAlbers} from 'd3-geo'
import {timer} from 'd3-timer'
import {ascending} from 'd3-array'
import {easeCubicInOut} from 'd3-ease'

import ContextBox, {ContextBoxValue} from './ContextBox'
import {countFormat} from '../../lib/utils/formats'
import {HEADER_HEIGHT, HEADER_HEIGHT_MOBILE, MENUBAR_HEIGHT} from '../Frame/constants'

import {
  colors, fontFamilies, mediaQueries
} from '@project-r/styleguide'

const toGeoJson = data => ({
  type: 'FeatureCollection',
  features: data.map(d => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [d.lon, d.lat]
    }
  }))
})

const ROTATION = [-8.33, 0]

class PostalCodeMap extends Component {
  constructor (...args) {
    super(...args)

    this.state = {}
    this.projection = geoAlbers()
      .rotate(ROTATION)
    this.containerRef = ref => {
      this.container = ref
    }
    this.canvasRef = ref => {
      this.canvas = ref
    }
    this.measure = () => {
      const {width} = this.container.getBoundingClientRect()
      const mobile = window.innerWidth < mediaQueries.mBreakPoint
      const top = mobile
        ? HEADER_HEIGHT_MOBILE + MENUBAR_HEIGHT
        : HEADER_HEIGHT

      let stableInnerHeight = window.innerHeight

      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      if (iOS) {
        stableInnerHeight = window.orientation === 90 || window.orientation === -90
          ? window.screen.width
          : window.screen.height
      }

      const height = stableInnerHeight - top

      const {extentPadding} = this.props

      const extentData = this.props.extentData || this.props.data
      if (
        width !== this.state.width ||
        height !== this.state.height ||
        extentData !== this.state.extentData
      ) {
        const extent = [
          [
            extentPadding.left || 10,
            extentPadding.top || 20
          ],
          [
            width - (extentPadding.right || 10),
            height - (extentPadding.bottom || window.innerHeight * 0.15)
          ]
        ]
        if (!this.state.extentData) {
          this.projection.fitExtent(
            extent,
            toGeoJson(extentData)
          )
          this.draw()
        } else {
          const targetProjection = geoAlbers()
            .rotate(ROTATION)
            .fitExtent(
              extent,
              toGeoJson(extentData)
            )

          const currentScale = this.projection.scale()
          const targetScale = targetProjection.scale()
          const currentTranslate = this.projection.translate()
          const targetTranslate = targetProjection.translate()

          const duration = 1000
          if (this.timer) {
            this.timer.stop()
          }
          this.timer = timer(elapsed => {
            const t = easeCubicInOut(Math.min(elapsed / duration, 1))
            this.projection.scale(
              currentScale * (1 - t) + targetScale * t
            )
            this.projection.translate(
              [
                currentTranslate[0] * (1 - t) + targetTranslate[0] * t,
                currentTranslate[1] * (1 - t) + targetTranslate[1] * t
              ]
            )
            this.draw()
            if (t >= 1) {
              this.timer.stop()
            }
          })
        }

        this.setState({
          top,
          width,
          height,
          extentData
        }, () => {
          this.draw()
        })
      } else {
        this.draw()
      }
    }
    this.focus = (event) => {
      const {top} = this.state
      if (top === undefined || !this.circles) {
        return
      }

      let currentEvent = event
      if (currentEvent.nativeEvent) {
        currentEvent = event.nativeEvent
      }
      while (currentEvent.sourceEvent) {
        currentEvent = currentEvent.sourceEvent
      }
      if (currentEvent.changedTouches) {
        currentEvent = currentEvent.changedTouches[0]
      }

      const focusX = currentEvent.clientX
      const focusY = currentEvent.clientY - top

      const hover = this.circles.filter(({cx, cy, r}) => (
        Math.sqrt(
          Math.pow(cx - focusX, 2) +
          Math.pow(cy - focusY, 2)
        ) <= Math.max(r, 3)
      ))

      this.setState(() => ({hover}))
    }
    this.blur = () => {
      this.setState(() => ({hover: null}))
    }
  }
  componentDidMount () {
    window.addEventListener('resize', this.measure)
    this.measure()
  }
  componentDidUpdate () {
    this.measure()
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.measure)
  }
  draw () {
    const {width, height, hover} = this.state
    const {projection} = this
    const {data, labels, labelOptions} = this.props
    if (!this.canvas || !width) {
      return
    }

    const devicePixelRatio = window.devicePixelRatio || 1
    this.canvas.width = width * devicePixelRatio
    this.canvas.height = height * devicePixelRatio

    const ctx = this.canvas.getContext('2d')

    ctx.save()
    ctx.scale(devicePixelRatio, devicePixelRatio)
    ctx.clearRect(0, 0, width, height)

    const scale = projection.scale()
    const radius = d => (
      Math.max(0.5, Math.sqrt(d.count) * scale * 0.00001)
    )

    ctx.beginPath()
    this.circles = data.map((d, i) => {
      const [cx, cy] = projection([d.lon, d.lat])
      const r = radius(d)

      ctx.moveTo(cx + r, cy)
      ctx.arc(cx, cy, r, 0, 2 * Math.PI)

      return {
        cx,
        cy,
        r,
        d
      }
    })
    ctx.globalAlpha = 0.1
    ctx.fillStyle = colors.primary
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.strokeStyle = colors.primary
    ctx.stroke()

    if (hover && hover.length) {
      ctx.beginPath()
      hover.forEach(({d}, i) => {
        const [cx, cy] = projection([d.lon, d.lat])
        const r = radius(d)

        ctx.moveTo(cx + r, cy)
        ctx.arc(cx, cy, r, 0, 2 * Math.PI)
      })
      ctx.globalAlpha = 0.1
      ctx.fillStyle = colors.secondary
      ctx.fill()
      ctx.globalAlpha = 1
      ctx.strokeStyle = colors.secondary
      ctx.stroke()
    }

    if (labels.length) {
      ctx.font = `12px ${fontFamilies.sansSerifRegular}`

      ctx.textAlign = labelOptions.center ? 'center' : 'start'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = colors.primary
      ctx.strokeStyle = '#fff'

      labels.forEach((d, i) => {
        let [x, y] = projection([d.lon, d.lat])
        y -= 1
        if (!labelOptions.center) {
          x += radius(d)
        }
        if (labelOptions.xOffset) {
          x += labelOptions.xOffset
        }
        const text = labelOptions.postalCode
          ? d.postalCode : d.name

        ctx.lineWidth = 2
        ctx.strokeText(text, x, y)
        ctx.fillText(text, x, y)
      })
    }

    ctx.restore()
  }
  renderHover () {
    const {hover, width, height} = this.state

    if (!hover || !hover.length) {
      return null
    }

    const {cx, cy, r} = hover.sort((a, b) => ascending(a.cy, b.cy))[0]
    const top = cy > height / 3
    const yOffset = r + 12
    return (
      <ContextBox
        orientation={top ? 'top' : 'below'}
        x={cx}
        y={cy + (top ? -yOffset : yOffset)}
        contextWidth={width}>
        {hover.map(({d}) => (
          <ContextBoxValue key={d.postalCode || d.name}
            label={`${d.postalCode || 'Unbekannt / '} ${d.name}`}>
            {countFormat(d.count)}
          </ContextBoxValue>
        ))}
      </ContextBox>
    )
  }
  render () {
    const {width, height} = this.state

    return (
      <div ref={this.containerRef} style={{position: 'relative'}}>
        <canvas ref={this.canvasRef}
          onTouchStart={this.focus}
          onTouchMove={this.focus}
          onTouchEnd={this.blur}
          onMouseEnter={this.focus}
          onMouseMove={this.focus}
          onMouseLeave={this.blur}
          style={{width, height, userSelect: 'none'}} />
        {this.renderHover()}
      </div>
    )
  }
}

export default PostalCodeMap
