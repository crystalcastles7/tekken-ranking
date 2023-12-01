import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Calendar(props) {

    const [newSetData, setNewSetData] = useState({
        player_1_id: null,
        player_2_id: null,
        dateNonModified: null, // date, wont be used 
        date: null, // date, integer 
        hour: null, // saat, just string.
        player_1_character_id: null, // integer 
        player_2_character_id: null, // integer 
        score1: null, // integer, optional
        score2: null, // integer, optional
        youtube_id: null // string, optional
    });

    const matches = useSelector((state) => state.matches);
    const players = useSelector((state) => state.players);
    const characters = useSelector((state) => state.characters);
    const account = useSelector((state) => state.account);
    const [isFormActive, setIsFormActive] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [timeOptions, setTimeOptions] = useState([]);

    const handleInputChange = (event) => {

        let { name, value } = event.target;
        // name: prop name (player_1_id etc.)
        // value: of the prop (s9aj38sh4kas35fg etc)

        let dateValue = undefined
        if (name === "dateNonModified") { // converting to integer if date
            dateValue = value ? new Date(value).getTime() : '';
        }

        if (name === "player_1_character_id" || name === "player_2_character_id") {
            value = parseInt(value)
        }

        if ((name === "score1" && value !== "") || (name === "score2" && value !== "")) {
            value = parseInt(value)
        }

        setNewSetData((prevData) => ({
            ...prevData,
            [name]: value,
            ...(dateValue && { date: dateValue })
        }));
    };

    const addNewSet = async (event) => {

        event.preventDefault();

        let validForm = true
        let missingProp = ""
        const entries = Object.entries(newSetData);
        for (let i = 0; i < entries.length; i++) {
            const [prop, value] = entries[i];
            if (!value && !["score1", "score2", "youtube_id"].includes(prop)) {
                missingProp = prop
                validForm = false;
                break;
            }
        }

        if (!validForm) {
            alert("Please fill all the required fields. Missing: " + missingProp)
            return false
        }

        const fetchUrl = `${process.env.REACT_APP_API_URL}/add-set`
        fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ setObject: newSetData })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert("Set is added!")
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const toggleActiveClass = (elementId) => {
        const element = document.getElementById(elementId);

        if (element) {
            // Check if the element has the class
            if (element.classList.contains('youtube-container--active')) {
                // If it has the class, remove it
                element.classList.remove('youtube-container--active');
            } else {
                // If it doesn't have the class, add it
                element.classList.add('youtube-container--active');
            }
        }
    }

    const filterCalendar = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    }

    const loadGame = (index) => {
        toggleActiveClass("match-id--" + index);
    }

    const generateTimeOptions = () => {
        const timeOptions = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');
                const timeValue = `${formattedHour}:${formattedMinute}`;
                timeOptions.push(timeValue);
            }
        }
        setTimeOptions(timeOptions)
    };

    const formatUnixTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    const getYouTubeVideoId = (url) => {
        try {
            var youtubeUrl = new URL(url);
            var videoId = youtubeUrl.searchParams.get('v');
            return videoId || null;
        } catch (error) {
            console.error("Error parsing URL:", error);
            return null;
        }
    }

    const updateSetProp = async (setId, newPropName, newPropValue) => {

        const fetchUrl = `${process.env.REACT_APP_API_URL}/update-set`
        fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ setId, newPropName, newPropValue })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert("Set is updated!")
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleSetUpdateChange = (event, setId) => {
        const { value } = event.target;
        if (!value) return false
        let data = prompt("Enter the new value for: " + value)
        if (!data) return false
        if (value === "youtube_id") {
            data = getYouTubeVideoId(data)
            if (!data) return false
        }
        updateSetProp(setId, value, data)
    }

    useEffect(() => {
        generateTimeOptions()
    }, [])

    return (

        <div>
            <div className='query-calendar-container'>
                <input type="text" onChange={filterCalendar} id="query-calendar" placeholder="Search a set..." />
            </div>

            <div className="fixture">

                {matches && matches.matches.length > 0 && players && players.players.length > 0 && matches.matches.map((match, index) => {
                    let player_1_object = players.players.find(player => player._id === match.player_1_id)
                    let player_2_object = players.players.find(player => player._id === match.player_2_id)
                    return (

                        player_1_object && player_2_object &&

                        (player_1_object.name.toLowerCase().includes(inputValue) || player_2_object.name.toLowerCase().includes(inputValue)) &&

                        <div className='match-group-container'>

                            {account.isAdmin &&
                                <select
                                    id="updateSet"
                                    name="updateSet"
                                    onChange={(event) => handleSetUpdateChange(event, match._id)}
                                >
                                    <option value="">Update</option>
                                    <option value="score1">Score 1</option>
                                    <option value="score2">Score 2</option>
                                    <option value="youtube_id">Youtube link</option>
                                </select>
                            }

                            <div className="match">
                                <div className="date-container">
                                    <div className="date">{formatUnixTimestamp(match.date)}</div>
                                    <div className="hour">{match.hour}</div>
                                </div>

                                <div className="player-container p1">
                                    {/* <img src="" className="flag"></img> */}

                                    {match.score1 && <span className={`player-name ${match.score1 > match.score2 ? 'winner' : 'loser'}`} >{player_1_object.name}</span>}
                                    {!match.score1 && <span className='player-name'>{player_1_object.name}</span>}

                                    <img alt="" className="char-img" src={"../../tekken-ranking/images/characters/" + match.player_1_character_id + ".png"} />
                                </div>

                                {match.score1 != null && match.score2 != null &&
                                    <div className='vs-score-container'>
                                        <div className="score-container">
                                            <span className="score">{match.score1}</span>
                                            <span>-</span>
                                            <span className="score">{match.score2}</span>
                                        </div>
                                        <div className='watch-container'>
                                            <span onClick={() => loadGame(index)}>Watch</span>
                                        </div>
                                    </div>
                                }

                                {!match.score1 && !match.score2 &&
                                    <span className="vs">vs</span>
                                }

                                <div className="player-container p2">
                                    <img className="char-img" src={"../../tekken-ranking/images/characters/" + match.player_2_character_id + ".png"} />
                                    {match.score1 && <span className={`player-name ${match.score1 > match.score2 ? 'loser' : 'winner'}`}>{player_2_object.name}</span>}
                                    {!match.score1 && <span className='player-name'>{player_2_object.name}</span>}
                                    {/* <img src="" className="flag"></img> */}
                                </div>

                            </div>
                            <div className='youtube-container' id={"match-id--" + index}>

                                <iframe
                                    src={`https://www.youtube.com/embed/${match.youtube_id}`}
                                    title="Tekken match"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>

                            </div>
                        </div>
                    )
                })}
            </div>


            {account.isAdmin &&
                <div className='new-set-form-container'>

                    <div className='btn-container'>
                        <button onClick={() => {
                            setIsFormActive(!isFormActive)
                        }}>+ Add new set</button>
                    </div>
                    <div className={`container mt-4 form-container ${isFormActive ? 'active' : ''}`}>
                        <form onSubmit={addNewSet}>
                            <div className="mb-3">
                                <label htmlFor="player_1_id" className="form-label">Player 1:</label>
                                <select
                                    id="player_1_id"
                                    name="player_1_id"
                                    value={newSetData.player_1_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Player</option>
                                    {players && players.players.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map((player) => (
                                        <option key={player._id} value={player._id}>
                                            {player.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="player_1_character_id" className="form-label">Player 1 Character:</label>
                                <select
                                    id="player_1_character_id"
                                    name="player_1_character_id"
                                    value={newSetData.player_1_character_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Character</option>
                                    {characters && characters.characters.sort((a, b) => a.character_name.toLowerCase() > b.character_name.toLowerCase() ? 1 : -1).map((character) => (
                                        <option key={character.char_id} value={character.char_id}>
                                            {character.character_name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="player_2_id" className="form-label">Player 2:</label>
                                <select
                                    id="player_2_id"
                                    name="player_2_id"
                                    value={newSetData.player_2_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Player</option>
                                    {players && players.players.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map((player) => (
                                        <option key={player._id} value={player._id}>
                                            {player.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="player_2_character_id" className="form-label">Player 2 Character:</label>
                                <select
                                    id="player_2_character_id"
                                    name="player_2_character_id"
                                    value={newSetData.player_2_character_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Character</option>
                                    {characters && characters.characters.sort((a, b) => a.character_name.toLowerCase() > b.character_name.toLowerCase() ? 1 : -1).map((character) => (
                                        <option key={character.char_id} value={character.char_id}>
                                            {character.character_name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="dateNonModified">Set date:</label>
                                <input type="date" id="dateNonModified" name="dateNonModified" value={newSetData.dateNonModified} onChange={handleInputChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="hour" className="form-label">Hour:</label>
                                <select
                                    id="hour"
                                    name="hour"
                                    value={newSetData.hour}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Time</option>
                                    {timeOptions.map((hour, idx) => (
                                        <option key={idx} value={hour}>
                                            {hour}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="classValue" className="form-label">First player score (optional):</label>

                                <select
                                    id="score1"
                                    name="score1"
                                    value={newSetData.score1}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Score</option>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="classValue" className="form-label">Second player score (optional):</label>

                                <select
                                    id="score2"
                                    name="score2"
                                    value={newSetData.score2}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Score</option>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                        <option key={value} value={value}>
                                            {value}
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


export default Calendar;
