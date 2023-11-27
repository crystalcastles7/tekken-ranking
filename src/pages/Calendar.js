import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Calendar(props) {

    const matches = useSelector((state) => state.matches);
    const [inputValue, setInputValue] = useState('');

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

    useEffect(() => {
        // console.log(matches);
    }, [matches]);

    return (

        <div>
            <div className='query-calendar-container'>
                <input type="text" onChange={filterCalendar} id="query-calendar" placeholder="Search a set..." />
            </div>

            <div className="fixture">

                {matches && matches.matches.length > 0 && matches.matches.map((match, index) => {
                    return (

                        (match.playerName1.toLowerCase().includes(inputValue) || match.playerName2.toLowerCase().includes(inputValue)) &&

                        <div className='match-group-container'>
                            <div className="match">
                                <div className="date-container">
                                    <div className="date">{match.date}</div>
                                    <div className="hour">{match.hour}</div>
                                </div>

                                <div className="player-container p1">
                                    {/* <img src="" className="flag"></img> */}

                                    {match.score1 && <span className={`player-name ${match.score1 > match.score2 ? 'winner' : 'loser'}`} >{match.playerName1}</span>}
                                    {!match.score1 && <span className='player-name'>{match.playerName1}</span>}

                                    <img alt="" className="char-img" src={"../../tekken-league/images/characters/" + match.characterId1 + ".png"} />
                                </div>

                                {match.score1 && match.score2 &&
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
                                    <img className="char-img" src={"../../tekken-league/images/characters/" + match.characterId2 + ".png"} />
                                    {match.score1 && <span className={`player-name ${match.score1 > match.score2 ? 'loser' : 'winner'}`}>{match.playerName2}</span>}
                                    {!match.score1 && <span className='player-name'>{match.playerName2}</span>}
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

        </div>
    );

}


export default Calendar;
