import React, { useContext, useState, useEffect } from "react"
import { Button } from "semantic-ui-react"
import { TriviaContext, TriviaProvider } from "../providers/TriviaProvider"
import { Trivia } from "./Trivia"


export const CurrentQuestion = ({ setActiveView }) => {

    const { trivia } = useContext(TriviaContext)
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1)
    const [jumbledAnswers, setJumbledAnswers] = useState([])
    const [questionAnswered, setQuestionAnswered] = useState(false)
    const [answeredCorrectly, setAnsweredCorrectly] = useState()

    const currentQuestion = trivia.find(question => question.id === currentQuestionNumber);

    const shuffle = (arra1) => {
        let ctr = arra1.length;
        let temp;
        let index;
        // While there are elements in the array
        while (ctr > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * ctr);
            // Decrease ctr by 1
            ctr--;
            // And swap the last element with it
            temp = arra1[ctr];
            arra1[ctr] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    }

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
        setQuestionAnswered(true)
        if (chosenAnswer.answer === currentQuestion.correct) {
            setAnsweredCorrectly(true)
            //  Increment score here
        } else {
            setAnsweredCorrectly(false)
        }
    }

    const nextQuestion = () => {
        setQuestionAnswered(false)
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
                    {/* Only let the user choose 1 option */}
                    {
                        questionAnswered === false
                            ? jumbledAnswers.map(answer => {
                                return <Button basic onClick={() => checkAnswer({ answer })}>{answer}</Button>
                            })
                            : jumbledAnswers.map(answer => {
                                return <Button basic className={answer === currentQuestion.correct
                                    ? "green correct"
                                    : "red incorrect"} >{answer}</Button>

                                // {
                                //     answeredCorrectly === true
                                //         ? <p>The answer was not {}</p>
                                //         : <p>Correct, the answer was {}</p>
                                // }

                            })

                    }



                </div>

                {
                    questionAnswered === true
                        ? <Button onClick={() => nextQuestion()}>Next Question</Button>
                        : ""
                }

            </div>
        </>
    )
}
