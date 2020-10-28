import React, { useState, useEffect, useContext } from "react"
import { Home } from "./Home"
import { TriviaProvider } from "./providers/TriviaProvider"
import "./css/Home.css"
import { CurrentQuestion } from "./trivia/CurrentQuestion"


export const Dashboard = () => {

    const [activeView, setActiveView] = useState("home")
    const [components, setComponents] = useState()
    const [userScore, setUserScore] = useState(0)
    const [roundEnded, setRoundEnded] = useState(false)
    // const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)

    const showHome = () => (
        <div className="homeContainer">
            <Home setActiveView={setActiveView} roundEnded={roundEnded}
                setRoundEnded={setRoundEnded} userScore={userScore} />
        </div>
    )

    const showQuestions = () => (
        <div className="questionsContainer">
            <CurrentQuestion setActiveView={setActiveView}
                setUserScore={setUserScore} setRoundEnded={setRoundEnded} />
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