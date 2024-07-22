import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function SpaceFact() {
    const [fact, setFact] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showFullFact, setShowFullFact] = useState(false)
    const [inProp, setInProp] = useState(true)
    const MAX_LENGTH = 200; 

    const fetchFact = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en')
            const data = await res.json()
            setFact(data.text)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFact()
        const interval = setInterval(() => {
            setInProp(false);
            setTimeout(() => {
                fetchFact();
                setInProp(true);
            }, 500);
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    const handleReadMore = (e) => {
        e.preventDefault()
        setShowFullFact(true)
    }

    const handleShowLess = (e) => {
        e.preventDefault()
        setShowFullFact(false)
    }

    const handleFactChanges = (e) =>  {
        e.preventDefault()
        setInProp(false);
        setTimeout(() => {
            fetchFact();
            setInProp(true);
        }, 500);
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    const renderFact = () => {
        if (fact.length <= MAX_LENGTH) {
            return fact;
        }

        if (showFullFact) {
            return (
                <>
                    {fact}
                    <a href="#" onClick={handleShowLess}> Show less</a>
                </>
            );
        }

        return (
            <>
                {fact.substring(0, MAX_LENGTH)}...
                <a href="#" onClick={handleReadMore}> Read more</a>
            </>
        );
    };

    return (
        <>
            <div className="fact_container">
                <h2>Random Fact</h2>
                <TransitionGroup>
                    <CSSTransition
                        in={inProp}
                        timeout={500}
                        classNames="fade"
                        key={fact}
                        unmountOnExit
                    >
                        <p id="fact-text">{renderFact()}</p>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <button id="refreshBtn" onClick={handleFactChanges}>Refresh the fact</button>
        </>
        
    );
}
