// Write your code here
import './index.css'

import {Component} from 'react'

class MatchCard extends Component {
  render() {
    const {recentMatches} = this.props
    const {
      result,
      competingTeam,
      competingTeamLogo,
      matchStatus,
    } = recentMatches

    return (
      <li className="list-card">
        <img
          src={competingTeamLogo}
          alt={`competingTeam ${competingTeam}`}
          className="match-image"
        />
        <p className="match-name">{competingTeam}</p>
        <p className="result">{result}</p>
        <p className={matchStatus}>{matchStatus}</p>
      </li>
    )
  }
}

export default MatchCard
