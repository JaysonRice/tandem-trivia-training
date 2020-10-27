import React, { useState, useEffect } from "react"
import { Home } from "./Home"
import { TriviaProvider } from "./providers/TriviaProvider"
import "./css/Home.css"
import { CurrentQuestion } from "./trivia/CurrentQuestion"

export const Dashboard = () => {

    const [activeView, setActiveView] = useState("home")
    const [components, setComponents] = useState()

    const showHome = () => (
        <div className="homeContainer">
            <Home setActiveView={setActiveView} />
        </div>
    )

    const showQuestions = () => (
        <div className="questionsContainer">
            <p>Questions</p>
            <CurrentQuestion setActiveView={setActiveView} />
        </div>
    )

    const showResults = () => (
        <div className="resultsContainer">
            <p>Results</p>
            {/* <QuestionList setActiveView={setActiveView} /> */}
        </div>
    )

    useEffect(() => {
        if (activeView === "home") {
            setComponents(showHome)
        }
        else if (activeView === "questions") {
            setComponents(showQuestions)
        } else {
            setComponents(showResults)
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