import React, { useContext, useState, useEffect } from "react"
import { Button } from "semantic-ui-react"
import { shuffle } from "../helpers/Shuffle"
import { TriviaContext, TriviaProvider } from "../providers/TriviaProvider"
import { Trivia } from "./Trivia"

export const CurrentQuestion = ({ setActiveView }) => {

    const { trivia } = useContext(TriviaContext)
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)
    const [jumbledAnswers, setJumbledAnswers] = useState([])
    const [userAnswer, setUserAnswer] = useState("")
    const [answeredCorrectly, setAnsweredCorrectly] = useState()

    const currentQuestion = trivia[currentQuestionNumber]

    // Jumble all possible answers around
    useEffect(() => {
        if (!!trivia) {
            const allAnswers = []

            currentQuestion.incorrect.forEach(answer => {
                allAnswers.push(answer)
            });

            allAnswers.push(currentQuestion.correct)

            setJumbledAnswers(shuffle(allAnswers))
        }
    }, [currentQuestionNumber])

    const checkAnswer = (chosenAnswer) => {
        setUserAnswer(chosenAnswer)
        if (chosenAnswer === currentQuestion.correct) {
            setAnsweredCorrectly(true)
            console.log("true")
            //  Increment score here
        } else {
            setAnsweredCorrectly(false)
            console.log("false")
        }
    }

    const nextQuestion = () => {
        setUserAnswer("")
        setCurrentQuestionNumber(currentQuestionNumber + 1)
    }

    if (!trivia) {
        return null
    }

    return (
        <>
            <div className="questionContainer">
                <h3>{currentQuestion.question}</h3>

                <div className="answersContainer">
                    {/* Only let the user choose 1 option and colors answers */}
                    {
                        !userAnswer
                            ? jumbledAnswers.map(answer => {
                                return <Button basic onClick={() => checkAnswer(answer)}>{answer}</Button>
                            })
                            : jumbledAnswers.map(answer => {
                                return <Button basic className={answer === currentQuestion.correct
                                    ? "green correct"
                                    : "red incorrect"} >{answer}</Button>
                            })
                    }

                    {/* Ternaries to appear after a user has chosen an answer */}
                    {!!answeredCorrectly && userAnswer !== ""
                        ? <p>Correct, the answer was {userAnswer}.</p>
                        : ""
                    }

                    {
                        !answeredCorrectly && userAnswer !== ""
                            ? <p>Wrong! You chose {userAnswer} while the correct answer was {currentQuestion.correct}.</p>
                            : ""
                    }


                </div>

                {
                    !!userAnswer
                        ? <Button onClick={() => nextQuestion()}>Next Question</Button>
                        : ""
                }

            </div>
        </>
    )
}
