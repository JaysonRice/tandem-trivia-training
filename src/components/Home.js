import React from 'react'
import { Button, Icon } from "semantic-ui-react"

export const Home = ({ setActiveView }) => {

    return (
        <>
            <section className="startTriviaContainer">
                <p>Logo Here</p>
                <Button icon labelPosition='right' onClick={() => setActiveView("questions")}>
                    Start Trivia
                    <Icon name='right arrow' />
                </Button>

            </section>
        </>
    )
}