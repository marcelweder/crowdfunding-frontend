import React, {Component} from 'react'
import {css} from 'glamor'
import Link from 'next/link'
import {compose} from 'redux'

import withT from '../../lib/withT'
import withMe from '../../lib/withMe'
import {withSignOut} from '../Auth/SignOut'
import {intersperse} from '../../lib/utils/helpers'
import track from '../../lib/piwik'

import {
  Container, Logo, colors, mediaQueries,
  fontFamilies
} from '@project-r/styleguide'

import IconLink from '../IconLink'

const COL_PADDING_S = 15
const COL_PADDING_M = 70

const styles = {
  bg: css({
    position: 'relative',
    zIndex: 10, // goes over sidebar
    borderTop: `1px solid ${colors.divider}`,
    backgroundColor: colors.secondaryBg,
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 100
  }),
  icons: css({
    float: 'right'
  }),
  grid: css({
    marginLeft: -COL_PADDING_S / 2,
    width: `calc(100% + ${COL_PADDING_S}px)`,
    [mediaQueries.mUp]: {
      marginLeft: -COL_PADDING_M / 2,
      width: `calc(100% + ${COL_PADDING_M}px)`
    },
    ':after': {
      content: '""',
      display: 'table',
      clear: 'both'
    }
  }),
  column: css({
    paddingLeft: COL_PADDING_S / 2,
    paddingRight: COL_PADDING_S / 2,
    marginBottom: 10,
    fontSize: 12,
    lineHeight: '18px',
    fontFamily: fontFamilies.sansSerifRegular,
    color: colors.secondary,
    float: 'left',
    width: '50%',
    [mediaQueries.mUp]: {
      fontSize: 17,
      lineHeight: '25px',
      paddingLeft: COL_PADDING_M / 2,
      paddingRight: COL_PADDING_M / 2,
      width: '25%'
    },
    '& a': {
      textDecoration: 'none',
      color: colors.secondary,
      ':visited': {
        color: colors.secondary
      },
      ':hover': {
        color: colors.primary
      }
    }
  }),
  title: css({
    fontFamily: fontFamilies.sansSerifMedium
  }),
  hr: css({
    marginTop: 20,
    marginBottom: 20,
    border: 'none',
    borderBottom: `1px solid ${colors.divider}`
  })
}

class Footer extends Component {
  componentDidMount () {
    const {me} = this.props
    track(['setUserId', me ? me.email : false])
  }
  componentWillReceiveProps ({me}) {
    if (
      me !== this.props.me &&
      !(
        me &&
        this.props.me &&
        me.email === this.props.me.email
      )
    ) {
      track(['setUserId', me ? me.email : false])
    }
  }
  render () {
    const {t, me, signOut} = this.props
    return (
      <div {...styles.bg}>
        <Container style={{overflow: 'hidden'}}>
          <div {...styles.grid}>
            <div {...styles.column}>
              <div {...styles.title}>{t('footer/contact/title')}</div>
              {intersperse(
                t('footer/contact/name').split('\n'),
                (item, i) => <br key={i} />
              )}
              <a href='https://www.google.ch/maps/place/Sihlhallenstrasse+1,+8004+Zürich' target='_blank'>{intersperse(
                t('footer/contact/address').split('\n'),
                (item, i) => <br key={i} />
              )}</a><br />
              <a href={`mailto:${t('footer/contact/mail')}`}>
                {t('footer/contact/mail')}
              </a>
            </div>
            <div {...styles.column}>
              <div {...styles.title}>{t('footer/about/title')}</div>
              <Link href='/crew'>
                <a>{t('footer/crew')}</a>
              </Link><br />
              <a href='https://project-r.construction/' target='_blank'>
                {t('footer/about/projecR')}
              </a><br />
              <Link href='/events'>
                <a>{t('footer/events')}</a>
              </Link><br />
              <Link href='/updates'>
                <a>{t('footer/updates')}</a>
              </Link><br />
              <Link href='/media'>
                <a>{t('footer/media')}</a>
              </Link><br />
              <a href='/manifest' target='_blank'>
                {t('footer/about/manifest')}
              </a><br />
              <a href='/en' target='_blank'>
                {t('footer/about/en')}
              </a>
            </div>
            <div {...styles.column}>
              <div {...styles.title}>{t('footer/legal/title')}</div>
              <Link href='/legal/tos'>
                <a>{t('footer/legal/tos')}</a>
              </Link><br />
              <Link href='/legal/privacy'>
                <a>{t('footer/legal/privacy')}</a>
              </Link><br />
              <Link href='/legal/statute'>
                <a>{t('footer/legal/statute')}</a>
              </Link><br />
              <Link href='/legal/imprint'>
                <a>{t('footer/legal/imprint')}</a>
              </Link>
            </div>
            <div {...styles.column}>
              <div {...styles.title}>{t('footer/me/title')}</div>
              <Link href='/merci'>
                <a>{t(me ? 'footer/me/merci/signedIn' : 'footer/me/merci/signIn')}</a>
              </Link><br />
              <Link href='/claim'>
                <a>{t('footer/me/claim')}</a>
              </Link><br />
              {!!me && <a href='#' onClick={(e) => {
                e.preventDefault()
                signOut()
              }}>
                {t('footer/me/signOut')}
              </a>}
            </div>
          </div>
          <hr {...styles.hr} />
          <Logo fill={colors.secondary} width={140} />
          <div {...styles.icons}>
            <IconLink icon='facebook' href='https://www.facebook.com/RepublikMagazin' target='_blank' fill={colors.secondary} />
            <IconLink icon='twitter' href='https://twitter.com/RepublikMagazin' target='_blank' fill={colors.secondary} />
          </div>
        </Container>
      </div>
    )
  }
}

export default compose(
  withT,
  withMe,
  withSignOut
)(Footer)
