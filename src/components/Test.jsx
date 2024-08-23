export default function Test({ arrQuestions, arrAnswers}) {
    return (
        <div key={arrQuestions}>
        <h3>{arrQuestions}</h3>
        {arrAnswers.map((answer, answerIndex) => (
          <div key={answerIndex}>
            <input type='radio' name={arrQuestions} className='option' required/>
            {answer.replace(/\*/g, '')}
          </div>
        ))}
      </div>
    )
}