import React, { useState, useEffect } from "react"
import { shuffle } from "../helpers/Shuffle"

export const TriviaContext = React.createContext()

export const TriviaProvider = (props) => {
    const [trivia, setTrivia] = useState([])

    const getTrivia = () => {
        return fetch("http://localhost:8088/trivia")
            .then(res => res.json())
            .then(setTrivia)
    }

    useEffect(() => {
        getTrivia()
    }, [])

    useEffect(() => {
        setTrivia(shuffle(trivia))
    }, [trivia])


    return (
        <TriviaContext.Provider value={{
            trivia
        }}>
            {props.children}
        </TriviaContext.Provider>
    )
}