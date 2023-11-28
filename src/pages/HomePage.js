import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


function HomePage(props) {

  const [newPlayerData, setNewPlayerData] = useState({
    winCount: 0,
    loseCount: 0,
  });

  const [isFormActive, setIsFormActive] = useState(false);
  const players = useSelector((state) => state.players);
  const account = useSelector((state) => state.account);
  const characters = useSelector((state) => state.characters);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlayerData((prevData) => ({
      ...prevData,
      [name]: name === 'mainCharacterId' ? parseInt(value, 10) : value,
    }));
  };

  const addNewPlayer = async (event) => {

    event.preventDefault();

    const fetchUrl = `${process.env.REACT_APP_API_URL}/add-player`
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ playerObject: newPlayerData })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        alert("Player is added!")
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const getClassText = (num) => {
    return ["S+", "S", "A+", "A", "B", "C"][6 - num]
  }


  return (

    <div className="component-container">

      {players && players.players && players.players.length > 0 &&
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Class</th>
              <th>Name</th>
              <th>Record</th>
              <th>Character</th>
              {/* <th>Rank</th> */}
              {/* <th>Last Played</th> */}
            </tr>
          </thead>
          <tbody>

            {players.players.sort((a,b) => a.classValue < b.classValue ? 1 : -1).map(((player, index) => {
              return (
                <tr key={index}>
                  <td>#{index + 1}</td>
                  <td>{getClassText(player.classValue)}</td>
                  <td>{player.name}</td>
                  <td>{player.winCount} - {player.loseCount}</td>
                  <td className="main-char-container">
                    <img className="char-img" src={"../../tekken-ranking/images/characters/" + player.mainCharacterId + ".png"} />
                  </td>
                  {/* <td>{player.rank}</td> */}
                  {/* <td>{player.lastPlayed}</td> */}
                </tr>
              )
            }))

            }
          </tbody>
        </table>
      }

      {account.isAdmin &&
        <div className='new-player-form-container'>

          <div className='btn-container'>
            <button onClick={() => {
              setIsFormActive(!isFormActive)
            }}>+ Add new player</button>
          </div>
          <div className={`container mt-4 form-container ${isFormActive ? 'active' : ''}`}>
            <form onSubmit={addNewPlayer}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" autoComplete='off' className="form-control" id="name" name="name" value={newPlayerData.name} onChange={handleInputChange} required />
              </div>

              <div className="mb-3">
                <label htmlFor="winCount" className="form-label">Win Count:</label>
                <input type="number" className="form-control" id="winCount" name="winCount" value={newPlayerData.winCount} onChange={handleInputChange} required />
              </div>

              <div className="mb-3">
                <label htmlFor="loseCount" className="form-label">Lose Count:</label>
                <input type="number" className="form-control" id="loseCount" name="loseCount" value={newPlayerData.loseCount} onChange={handleInputChange} required />
              </div>

              <div className="mb-3">
                <label htmlFor="mainCharacterId" className="form-label">Main Character:</label>
                <select
                  id="mainCharacter"
                  name="mainCharacterId"
                  value={newPlayerData.mainCharacterId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a character</option>
                  {characters && characters.characters.map((character) => (
                    <option key={character.char_id} value={character.char_id}>
                      {character.character_name}
                    </option>
                  ))}
                </select>

              </div>

              <div className="mb-3">
                <label htmlFor="classValue" className="form-label">Class:</label>

                <select
                  id="classValue"
                  name="classValue"
                  value={newPlayerData.classValue}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a class</option>
                  {[1, 2, 3, 4, 5, 6].reverse().map((num) => (
                    <option key={num} value={num}>
                      {getClassText(num)}
                    </option>
                  ))}
                </select>

              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>

        </div>
      }

    </div>

  );

}

export default HomePage;
