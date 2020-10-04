import React, {Component}from 'react';
import './App.css';
import Title from "./components/title"
import Wrapper from "./components/wrapper"
import Card from "./components/card"
import matches from "./cards.json"




let correctGuesses = 0;
let best = 0;
let msg = "Click on a picture to gain points! But don't choose the same one twice or you will lose!"


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matches,
      correctGuesses: correctGuesses,
      best: best,
      msg: msg
    };
   this.setClicked = this.setClicked.bind(this)
  }


  setClicked(id) {
    let matches = this.state.matches;

    const clickedMatch = matches.filter(match => match.id === id);

    if (clickedMatch[0].clicked){

      console.log ("Correct Guesses: " + correctGuesses);
      console.log ("Best Score: " + best);

      correctGuesses = 0;
      msg = "Ouch! You already clicked on this one."

      for (let i = 0 ; i < matches.length ; i++){
          matches[i].clicked = false;
      }

      this.setState({msg});
      this.setState({ correctGuesses });
      this.setState({matches});

  // Otherwise, if clicked = false, and the user hasn't finished
  } else if (correctGuesses < 11) {

    clickedMatch[0].clicked = true;

    // increment the appropriate counter
    correctGuesses++;
    
    msg = "Great! You haven't clicked on that one yet! Keep going!";

    if (correctGuesses > best){
        best = correctGuesses;
        this.setState({ best });
    }

    // Shuffle the array to be rendered in a random order
    matches.sort(function(a, b){return 0.5 - Math.random()});

    // Set this.state.matches equal to the new matches array
    this.setState({ matches });
    this.setState({correctGuesses});
    this.setState({msg});
} else { 
  // Set its value to true
  clickedMatch[0].clicked = true;

  // restart the guess counter
  correctGuesses = 0;

  // Egg on the user to play again
  msg = "You got ALL of them!!! Now, let's see if you can do it again!";
  best = 12;
  this.setState({ best });
  
  for (let i = 0 ; i < matches.length ; i++){
      matches[i].clicked = false;
  }

  // Shuffle the array to be rendered in a random order
  matches.sort(function(a, b){return 0.5 - Math.random()});

  // Set this.state.matches equal to the new matches array
  this.setState({ matches });
  this.setState({correctGuesses});
  this.setState({msg});

}
};



  

  render(){ let mappedCard = this.state.matches.map(match => (
    <Card
        setClicked={this.setClicked}
        id={match.id}
        key={match.id}
        image={match.image}
    />
))
    return (
      <Wrapper>
      <Title>Community Clicky Game</Title>

      <h3 className="scoreSummary">
          {this.state.msg}
      </h3>
      
      <h3 className="scoreSummary card-header">
          Correct Guesses: {this.state.correctGuesses} 
          <br />
          Best Score: {this.state.best} 
      </h3>
      <div className="container">
      <div className="row">
     {mappedCard}
      </div>
      </div>

  </Wrapper>
  )
  
}
}
export default App;
