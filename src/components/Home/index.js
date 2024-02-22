// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamList: [], isLoading: true}

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updatedTeamList = data.teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImgUrl: each.team_image_url,
    }))
    this.setState({teamList: updatedTeamList, isLoading: false})
  }

  renderTeamsList = () => {
    const {teamList} = this.state

    return (
      <ul className="team-card-container">
        {teamList.map(each => (
          <TeamCard key={each.id} teamCardDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-container">
        <div className="card-container">
          <div className="logo-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="logo"
            />
            <h1 className="heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home
