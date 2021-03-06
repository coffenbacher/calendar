import React from 'react'
import css, { merge } from 'next/css'
import { divider, matchStyle } from '../styles/common'
import MatchTime from './MatchTime'
import MatchStreams from './MatchStreams'
import Team from './Team'
import CalendarExporter from './CalendarExporter'
import moment from 'moment-timezone'

// Match display on a landscape-style screen.
export default class MatchDesktop extends React.Component {
  render () {
    const { d, match, timezone } = this.props
    return (
      <div className={matchStyle}>
        <hr className={matchDividerStyle}/>
        <Team d={d} team={match.team} match={match} side='left'/>
        <div className={divider}>
          <MatchTime time={match.time} timezone={timezone} />
          <CalendarExporter
                title={match.event + ": " + match.team + " vs " + match.team_2 + " (" + match.round + ")"}
                startTime={new Date(match.time)} endTime={moment(new Date(match.time)).add(1.5, 'hours').toString()}
                content={match.content}
                location={match.schedulingthread}
          />
        </div>
        <Team d={d} team={match.team_2} match={match} side='right'/>
        <div className={eventStyle}>
          {match.recorded == 'TRUE'
            ? <span className={recordedStyle}>(RECS)</span>
            : null}
          {match.event} - {match.round} - {match.format}
        </div>
        <MatchStreams d={d} streams={match.streams} />
      </div>
    )
  }
}

const recordedStyle = css({color: 'red', fontWeight: 'bold'})
const matchDividerStyle = css({width: '100px', marginBottom: '2em'})
const eventStyle = css({clear: 'both', textAlign: 'center', fontSize: '10pt', fontWeight: 'bold', paddingTop:'1em'})
