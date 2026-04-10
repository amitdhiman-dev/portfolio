import { useEffect, useRef, useState } from 'react'

const CHARSET =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function useTextScramble(targetText) {
    const [displayText, setDisplayText] = useState('')
    const revealedCountRef = useRef(0)

    useEffect(() => {
        revealedCountRef.current = 0

        const getRandomCharacter = () => {
            const randomIndex = Math.floor(Math.random() * CHARSET.length)
            return CHARSET[randomIndex]
        }

        const renderScrambledText = () => {
            const nextText = targetText
                .split('')
                .map((character, index) => {
                    if (index < revealedCountRef.current) {
                        return character
                    }

                    if (character === ' ') {
                        return ' '
                    }

                    return getRandomCharacter()
                })
                .join('')

            setDisplayText(nextText)
        }

        renderScrambledText()

        const scrambleInterval = window.setInterval(() => {
            renderScrambledText()
        }, 40)

        const revealInterval = window.setInterval(() => {
            revealedCountRef.current = Math.min(
                revealedCountRef.current + 1,
                targetText.length
            )

            if (revealedCountRef.current >= targetText.length) {
                setDisplayText(targetText)
                window.clearInterval(revealInterval)
                window.clearInterval(scrambleInterval)
            }
        }, 80)

        return () => {
            window.clearInterval(scrambleInterval)
            window.clearInterval(revealInterval)
        }
    }, [targetText])

    return displayText
}

export default useTextScramble