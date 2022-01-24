const Total = ({ exercises }) => {
    const total = exercises.reduce((s, p) => s + p)

    return (
        <b>total of {total} exercises</b>
    )
}

export default Total;