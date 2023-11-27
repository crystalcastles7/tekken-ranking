import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';


function HomePage(props) {

  const players = useSelector((state) => state.players);
  const isAdmin = localStorage.getItem("username") === "crystalcastlesss"

  const addNewPlayer = async () => {
    alert("adding new player.... ")
    let playerObject = {
      name: "SomeUsername",
      winCount: 0,
      loseCount: 0,
      mainCharacterId: 40,
      classValue: 9,
      lastPlayed: "-",
      playedCharaterIds: []
    }

    const fetchUrl = `${process.env.REACT_APP_API_URL}/add-player`
    console.log('Fetching: ' + fetchUrl);
    
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ playerObject })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data);
        alert("hopefully added")
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (

    <div>
      {isAdmin &&
        <div className="add-btn">
          <button onClick={addNewPlayer}>Add new player!</button>
        </div>
      }

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Class</th>
            <th>Name</th>
            <th>Record</th>
            <th>Character</th>
            {/* <th>Rank</th> */}
            <th>Last Played</th>
          </tr>
        </thead>
        <tbody>

          {players && players.players.length > 0 && players.players.map(((player, index) => {
            return (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td>{player.class}</td>
                <td>{player.name}</td>
                <td>{player.win} - {player.lose}</td>
                <td className="main-char-container">
                  <img className="char-img" src={"../../tekken-ranking/images/characters/" + player.mainCharacterId + ".png"} />
                </td>
                {/* <td>{player.rank}</td> */}
                <td>{player.lastPlayed}</td>
              </tr>
            )
          }))

          }
        </tbody>
      </table>

    </div>

  );

}

const mapStateToProps = (state) => {
  return {
    // characters: state.characters,
    // move_results: selectMoves(state.characters, state.filters)
  }
}

export default connect(mapStateToProps)(HomePage);
