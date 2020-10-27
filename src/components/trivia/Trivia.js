import React, { useState } from "react"
import { Button } from "semantic-ui-react"

export const Trivia = ({ trivia }) => {
    return (
        <>
            <div className="questionContainer">
                <h3>{trivia.question}</h3>

                <div className="answersContainer">
                    <Button>Fake</Button>
                    <Button>Fake</Button>
                    <Button>Fake</Button>
                    <Button>Fake</Button>
                </div>

            </div>
        </>
    )
}