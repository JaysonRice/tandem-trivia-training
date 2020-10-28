import React, { useContext, useEffect, useState } from 'react'
import { Button, Icon, Modal, ModalHeader } from "semantic-ui-react"
import { TriviaContext } from './providers/TriviaProvider'

export const Home = ({ setActiveView, roundEnded, setRoundEnded, userScore }) => {

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
        setRoundEnded(false)
        getTrivia()
    }

    return (
        <>
            <section className="startTriviaContainer">
                <p>Logo Here</p>
                <Button icon labelPosition='right' onClick={() => setActiveView("questions")}>
                    Start Trivia
                    <Icon name='right arrow' />
                </Button>

                <Modal open={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        <p>{userScore * 10}</p>
                        <Button onClick={restart}>Done</Button>
                    </ModalHeader>
                </Modal>

            </section>
        </>
    )
}