// Write your code here
import {Link} from 'react-router-dom'
import {PieChart, Pie, Cell, Legend} from 'recharts'
import './index.css'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {
    teamMatchList: {},
    isLoading: true,
    matchStatistics: {
      wins: 0,
      losses: 0,
      draws: 0,
    },
  }

  componentDidMount() {
    this.getTeamMatchDetails()
  }

  getTeamMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedMatch = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(each => ({
        umpires: each.umpires,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        id: each.id,
        date: each.date,
        venue: each.venue,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        secondInnings: each.second_innings,
        matchStatus: each.match_status,
      })),
    }

    // Calculate match statistics here
    const matchStatistics = this.calculateMatchStatistics(
      updatedMatch.recentMatches,
    )
    this.setState({
      teamMatchList: updatedMatch,
      isLoading: false,
      matchStatistics,
    })
  }

  calculateMatchStatistics = matches => {
    let wins = 0
    let losses = 0
    let draws = 0
    console.log(matches)
    matches.forEach(match => {
      if (match.matchStatus === 'Won') {
        wins += 1
      } else if (match.matchStatus === 'Lost') {
        losses += 1
      } else {
        draws += 1
      }
    })

    return {wins, losses, draws}
  }

  getTeamClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  renderTeamMatches = () => {
    const {teamMatchList, matchStatistics} = this.state
    console.log('matchStatistics:', matchStatistics)
    const {teamBannerUrl, latestMatchDetails} = teamMatchList
    console.log(latestMatchDetails)
    const pieChartData = [
      {name: 'Wins', value: matchStatistics.wins},
      {name: 'Losses', value: matchStatistics.losses},
      {name: 'Draws', value: matchStatistics.draws},
    ]
    console.log(pieChartData)
    const getColor = name => {
      if (name === 'Wins') {
        return '#008000'
      }
      if (name === 'Losses') {
        return '#FF0000'
      }
      return '#800080'
    }
    return (
      <div className="team-match-container">
        <Link to="/">
          <button type="submit" className="back-btn">
            Back
          </button>
        </Link>

        <div className="chart-container">
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              labelLine={false}
              outerRadius={80}
              cx="50%"
              cy="50%"
              fill="#8884d8"
              label={({name, percent}) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={getColor(entry.name)} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
        <img src={teamBannerUrl} alt="team banner" className="banner-image" />
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        {this.renderRecentMatches()}
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderRecentMatches = () => {
    const {teamMatchList} = this.state
    const {recentMatches} = teamMatchList
    return (
      <ul className="ul-container">
        {recentMatches.map(each => (
          <MatchCard key={each.id} recentMatches={each} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    const className = `app-team-container ${this.getTeamClassName()}`
    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
