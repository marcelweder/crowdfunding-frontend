import React from 'react'
import {gql, graphql} from 'react-apollo'
import {css} from 'glamor'
import {compose} from 'redux'
import Head from 'next/head'

import withT from '../../lib/withT'

import Loader from '../Loader'

import {
  P, Interaction, Logo, fontFamilies
} from '@project-r/styleguide'

const toViewport = px => `${px / 18}vw`

const MIDDLE = 56.25

const styles = {
  container: css({
    position: 'relative',
    width: '100%',
    paddingBottom: `${9 / 16 * 100}%`,
    backgroundColor: '#fff'
  }),
  screen: css({
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0
  }),
  logo: css({
    position: 'absolute',
    left: `${MIDDLE + 5}%`,
    right: '5%',
    bottom: '5%'
  }),
  image: css({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: `${MIDDLE}%`
  }),
  text: css({
    position: 'absolute',
    top: '5%',
    left: `${MIDDLE + 5}%`,
    right: '5%',
    bottom: `${10 + 5}%`,
    wordWrap: 'break-word'
  }),
  quote: css({
    fontSize: toViewport(27),
    lineHeight: 1.42
  }),
  number: css({
    fontSize: toViewport(30),
    fontFamily: fontFamilies.sansSerifMedium
  }),
  name: css({
    fontSize: toViewport(60),
    lineHeight: 1.25,
    marginBottom: toViewport(20)
  }),
  role: css({
    fontSize: toViewport(30),
    lineHeight: 1.25,
    marginBottom: toViewport(20)
  })
}

const fontSizeBoost = length => {
  if (length < 40) {
    return 26
  }
  if (length < 50) {
    return 17
  }
  if (length < 80) {
    return 8
  }
  if (length < 100) {
    return 4
  }
  if (length > 400) {
    return -2
  }
  return 0
}

const Item = ({loading, error, t, testimonial, testimonial: {quote, image, name, role, video, sequenceNumber}}) => (
  <Loader loading={!testimonial && loading} error={!testimonial && error} render={() => (
    <div {...styles.container}>
      <div {...styles.screen}>
        <Head>
          <meta name='robots' content='noindex' />
        </Head>
        <img {...styles.image} src={image} />
        <div {...styles.text}>
          <Interaction.H2 {...styles.name}>
            {name}
          </Interaction.H2>
          <Interaction.P {...styles.role}>
            {role}
          </Interaction.P>
          {quote && <P {...styles.quote}
            style={{fontSize: toViewport(24 + fontSizeBoost(quote.length))}}>
            «{quote}»
          </P>}
          {!!sequenceNumber && (
            <div {...styles.number}>{t('memberships/sequenceNumber/label', {
              sequenceNumber
            })}</div>
          )}
        </div>
        <div {...styles.logo}>
          <Logo />
        </div>
      </div>
    </div>
  )} />
)

const query = gql`query aTestimonial {
  testimonials(limit: 1) {
    id
    name
    role
    quote
    image(size: SHARE)
    sequenceNumber
    video {
      hls
      mp4
      youtube
    }
  }
}`

export default compose(
  withT,
  graphql(query, {
    props: ({data, ownProps: {name}}) => {
      return ({
        loading: data.loading,
        error: data.error,
        testimonial: (
          data.testimonials &&
          data.testimonials[0]
        )
      })
    },
    options: ({duration}) => ({
      pollInterval: duration
    })
  })
)(Item)
