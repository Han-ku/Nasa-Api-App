import { useState, useEffect } from "react";

export default function SpaceFact() {
    const [fact, setFact] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFullFact, setShowFullFact] = useState(false);
    const MAX_LENGTH = 200; // Максимальное количество символов

    const fetchFact = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
            const data = await res.json();
            setFact(data.text);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFact();
        const interval = setInterval(() => {
            fetchFact();
        }, 60000); 

        return () => clearInterval(interval); 
    }, []);

    const handleReadMore = (e) => {
        e.preventDefault();
        setShowFullFact(true);
    };

    const handleShowLess = (e) => {
        e.preventDefault();
        setShowFullFact(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
        <div>
            <h2>Random Fact</h2>
            <p>{renderFact()}</p>
        </div>
    );
}
