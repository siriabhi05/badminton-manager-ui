import "./Rule.css"

function Rule() {
    return (
        <div className="rulesContainer" >
            <div className="rules evenRule">
                <p className="rule">1. Each match will be best of three sets of 15 points.</p>
            </div>
            <div className="rules oddRule">
                <p className="rule">
                    2. Third set will be played only scores are level 1-1 after 2 sets.
                </p>
            </div>
            <div className="rules evenRule">
                <p className="rule">
                    3. If the set score is 14-14, it will be a deuce and the set winner will be decided by 2 points gap.
                </p>
            </div>
            <div className="rules oddRule">
                <p className="rule">
                    4. If the set score is 19-19, whoever gets the 20th point will win the set.
                </p>
            </div>
            <div className="rules evenRule">
                <p className="rule">
                    5. The court side will be changed after each set.
                </p>
            </div>
            <div className="rules oddRule">
                <p className="rule">
                    6. In the third set, the court side will be changed after any side reaches 8th point.
                </p>
            </div>
            <div className="rules evenRule">
                <p className="rule">
                    7. Everyone should try to respect the decision given by whoever is supervising the match.
                </p>
            </div>
            <div className="rules oddRule">
                <p className="rule">
                    8. All the other rules are standard BWF rules.
                </p>
            </div>

        </div>
    )
}

export default Rule