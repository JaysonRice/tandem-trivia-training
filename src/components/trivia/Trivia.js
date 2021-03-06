import React, { useContext, useState, useEffect } from "react"
import { Button, Message } from "semantic-ui-react"
import { shuffle } from "../helpers/Shuffle"
import { TriviaContext } from "../providers/TriviaProvider"

let score = 0;

export const Trivia = ({ setActiveView, setUserScore, setRoundEnded, numberOfQuestions }) => {

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
            score++
            setUserScore(score)
        } else {
            setAnsweredCorrectly(false)
        }
    }

    const nextQuestion = () => {
        setUserAnswer("")
        setCurrentQuestionNumber(currentQuestionNumber + 1)
    }

    const finishRound = () => {
        setRoundEnded(true)
        score = 0
        setActiveView("home")
    }

    if (!trivia) {
        return null
    }

    return (
        <>
            <div className="questionContainer">

                <div className="questionTitle">
                    <h3>{currentQuestion.question}</h3>
                </div>

                <div className="answersContainer">

                    {/* Only let the user choose 1 option and colors answers */}
                    {
                        !userAnswer
                            ? jumbledAnswers.map(answer => {
                                return <Button basic className="answerButtons" onClick={() => checkAnswer(answer)}>{answer}</Button>
                            })
                            : jumbledAnswers.map(answer => {
                                return <Button basic className={answer === currentQuestion.correct
                                    ? "green correct answerButtons"
                                    : "red incorrect answerButtons"} >{answer}</Button>
                            })
                    }

                </div>
                <p className="questionCounter">{currentQuestionNumber + 1} / {numberOfQuestions}</p>
                <div className="answerMessage">
                    {/* Ternaries to appear after a user has chosen an answer */}

                    {!!answeredCorrectly && userAnswer !== ""
                        ? <Message
                            className="positive"
                            icon='check circle outline'
                            header={'Correct, the answer was ' + userAnswer + '.'}
                        />
                        : ""
                    }

                    {
                        !answeredCorrectly && userAnswer !== ""
                            ? <Message
                                className="error"
                                icon='ban'
                                header={'Wrong! You chose ' + userAnswer +
                                    ' while the correct answer was ' + currentQuestion.correct + '.'}
                            />
                            : ""
                    }
                </div>
                {
                    !!userAnswer && currentQuestionNumber < numberOfQuestions - 1
                        ? <Button onClick={() => nextQuestion()}>Next Question</Button>
                        : ""
                }

                {
                    !!userAnswer && currentQuestionNumber >= numberOfQuestions - 1
                        ? <Button onClick={() => finishRound()}>See Results</Button>
                        : ""
                }

            </div>



        </>
    )
}
