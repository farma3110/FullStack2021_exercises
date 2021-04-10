import React, {useState} from 'react'

const Button = (props) => {
  return (
    <button onClick={props.event}>
      {props.name}
    </button>
  )
} 

const StatisticsLine = (props) => {
  return (
  <tr>
    <td>{props.name}</td>
    <td>{props.value}</td>
  </tr>
  )
} 

const Statistics = (props) => {
  if (props.state.good === props.state.bad && props.state.bad === props.state.neutral && props.state.bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine name='good' value={props.state.good}/>
          <StatisticsLine name='neutral' value={props.state.neutral}/>
          <StatisticsLine name='bad' value={props.state.bad}/>
          <StatisticsLine name='all' value={props.state.all}/>
          <StatisticsLine name='average' value={props.state.avg}/>
          <StatisticsLine name='positive' value={props.state.pos + '%'}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  const [stats, setStats] = useState(
    {
      good: 0,
      bad: 0,
      neutral: 0,
      all: 0,
      avg: 0,
      pos: 0
    }
  )
  
  const calcAvg = (good, bad, total) => (good - bad) / total;
  const calcPos = (good, total) => 100 * (good/total);

  function updateRest(stats) {
    stats.all = stats.all + 1;
    stats.avg = calcAvg(stats.good, stats.bad, stats.all);
    stats.pos = calcPos(stats.good, stats.all);
  }

  async function clickGood() {
    const newStats = Object.assign({}, stats);
    newStats.good = newStats.good + 1;
    updateRest(newStats);
    await setStats(newStats);
  }
  async function clickNeutral() {
    const newStats = Object.assign({}, stats);
    newStats.neutral = newStats.neutral + 1;
    updateRest(newStats);
    await setStats(newStats);
  }
  async function clickBad() {
    const newStats = Object.assign({}, stats);
    newStats.bad = newStats.bad + 1;
    updateRest(newStats);
    await setStats(newStats);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button event={clickGood} name='good'/>
      <Button event={clickNeutral} name='neutral'/>
      <Button event={clickBad} name='bad'/>
      <h1>statistics</h1>
      <Statistics state={stats}/>
    </div>
  )
}

export default App