import './index.css'
import {Link} from 'react-router-dom'

import {Component} from 'react'

class TeamCard extends Component {
  render() {
    const {teamCardDetails} = this.props
    const {name, id, teamImgUrl} = teamCardDetails
    return (
      <Link to={`/team-matches/${id}`} className="link-item">
        <li className="team-card">
          <img src={teamImgUrl} alt={`${name}`} className="team-image" />
          <p className="team-name">{name}</p>
        </li>
      </Link>
    )
  }
}
export default TeamCard
