import React, { useState, useEffect, useContext } from "react"
import { Home } from "./Home"
import { TriviaProvider } from "./providers/TriviaProvider"
import "./css/Home.css"
import "./css/Trivia.css"
import { Trivia } from "./trivia/Trivia"

export const Dashboard = () => {

    const [activeView, setActiveView] = useState("home")
    const [components, setComponents] = useState()
    const [userScore, setUserScore] = useState(0)
    const [roundEnded, setRoundEnded] = useState(false)
    const [numberOfQuestions, setNumberOfQuestions] = useState(10)

    const showHome = () => (
        <div className="homeContainer">
            <Home setActiveView={setActiveView} roundEnded={roundEnded}
                setRoundEnded={setRoundEnded} userScore={userScore} setUserScore={setUserScore}
                numberOfQuestions={numberOfQuestions} setNumberOfQuestions={setNumberOfQuestions} />
        </div>
    )

    const showQuestions = () => (
        <div className="triviaContainer">
            <Trivia setActiveView={setActiveView} setUserScore={setUserScore}
                setRoundEnded={setRoundEnded} numberOfQuestions={numberOfQuestions} />
        </div>
    )

    useEffect(() => {
        if (activeView === "home") {
            setComponents(showHome)
        }
        else if (activeView === "questions") {
            setComponents(showQuestions)
        } else {
            setComponents(showHome)
        }
    }, [activeView])

    return (
        <div className="mainContainer">
            <TriviaProvider>
                {components}
            </TriviaProvider>
        </div>
    )
}