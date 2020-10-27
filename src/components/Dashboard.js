import React, { useState, useEffect } from "react"
import { TriviaProvider } from "./providers/TriviaProvider"

export const Dashboard = () => {

    const [activeView, setActiveView] = useState("home")
    const [components, setComponents] = useState()

    const showHome = () => (
        <div className="homeContainer">
            <p>Rendering</p>
            {/* <Home setActiveView={setActiveView} /> */}
        </div>
    )

    const showQuestions = () => (
        <div className="questionsContainer">
            <p>Questions</p>
            {/* <QuestionList setActiveView={setActiveView} /> */}
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
    }, [])

    return (
        <div className="mainContainer">
            <TriviaProvider>
                {components}
            </TriviaProvider>
        </div>
    )
}