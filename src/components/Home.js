import React, { useContext, useEffect, useState } from 'react'
import { Button, Icon, Modal } from "semantic-ui-react"
import { TriviaContext } from './providers/TriviaProvider'

export const Home = ({ setActiveView, roundEnded, setRoundEnded, userScore,
    setUserScore, numberOfQuestions }) => {

    const { getTrivia } = useContext(TriviaContext)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    useEffect(() => {
        if (roundEnded) {
            toggle()
        }
    }, [roundEnded])

    const restart = () => {
        toggle()
        setUserScore(0)
        setRoundEnded(false)
        getTrivia()
    }

    const message = () => {
        if (userScore / numberOfQuestions === 1) {
            return <p>Perfect score! You are a trivia master.</p>
        } else if ((userScore / numberOfQuestions) * 100 >= 70) {
            return <p>Great score, now push for 100%! </p>
        } else {
            return <p>Nice try but there's room for improvement.</p>
        }
    }

    return (
        <>
            <section className="startTriviaContainer">
                <p>Logo Here</p>
                <Button icon labelPosition='right' onClick={() => setActiveView("questions")}>
                    Start Round
                    <Icon name='right arrow' />
                </Button>

                <Modal size='mini' open={modal} toggle={toggle}>
                    <Modal.Header toggle={toggle}>
                        <p>Total Score: {Math.round((userScore / numberOfQuestions) * 100)}%</p>

                    </Modal.Header>
                    <Modal.Content>
                        {message()}
                    </Modal.Content>

                    <Modal.Actions>
                        <Button onClick={restart}>Done</Button>
                    </Modal.Actions>

                </Modal>

            </section>
        </>
    )
}