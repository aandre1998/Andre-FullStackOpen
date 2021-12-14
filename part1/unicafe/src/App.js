import React, { useState } from 'react';

// TODO
// From 1.7, figure out what average means


const Button = ({ onClick, text}) => {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, counter}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{counter}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all / 3;
  const positive = good / all;

  if (good === 0 && neutral === 0 && bad === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <StatisticLine text={'good'} counter={good}/>
      <StatisticLine text={'neutral'} counter={neutral}/>
      <StatisticLine text={'bad'} counter={bad}/>
      <StatisticLine text={'all'} counter={all}/>
      <StatisticLine text={'average'} counter={average}/>
      <StatisticLine text={'positive'} counter={positive}/>
    </table>
  )
}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0)

  const incGood = () => setGood(good + 1);
  const incNeutral = () => setNeutral(neutral + 1);
  const incBad = () => setBad(bad + 1);

  return (
    <div>
      <h2>give feedback</h2>
      
      <Button onClick={incGood} text={'good'}/>
      <Button onClick={incNeutral} text={'neutral'}/>
      <Button onClick={incBad} text={'bad'}/>

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
