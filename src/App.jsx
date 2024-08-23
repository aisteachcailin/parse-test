import React, { useState } from 'react'
import Test from './components/Test.jsx'

export default function App() {
  const [test, setTest] = useState([])
  const [grade, setGrade] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [showAnswers, setShowAnswers] = useState()

  function parseFile() {
    const fileInput = document.getElementById('fileInput')
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {

        const fileContent = event.target.result
          .replace(/[a-zа-я0-9]+[).]/g, '')
          .split('\n')

        const parsedTest = []

        for (let i = 0; i < fileContent.length; i += 5) {
          parsedTest.push({
            arrQuestions: fileContent[i],
            arrAnswers: fileContent.slice(i + 1, i + 5)
          })
        }

        setTest(parsedTest);
      }

      reader.readAsText(file)
    }
    setShowResults(true)
  }

  function checkResults(e) {
    e.preventDefault()

    const checkedAnswers = [...document.querySelectorAll('.option:checked')].map(btn => btn.parentNode.textContent)
    const correctAnswers = test.flatMap(answer => answer.arrAnswers
      .filter(item => item.includes('*'))
      .map(item => item.replace('*', ''))
    )

    const results = []

    for (let i = 0; i < correctAnswers.length; i++) {
      correctAnswers[i] === checkedAnswers[i] ? results.push(1) : results.push(0)
    }

    setShowAnswers(`Правильные ответы: ${correctAnswers}`)

    const numbCorrectAnswers = results.reduce((acc, number) => acc + number, 0)
    const numbQuestions = correctAnswers.length

    if (numbQuestions <= 0) {
      setGrade('Максимальный балл должен быть больше 0')
    }

    const percentage = (numbCorrectAnswers / numbQuestions) * 100;

    if (percentage >= 90) {
      setGrade('Оценка 5')

    } else if (percentage >= 80) {
      setGrade('Оценка 4')

    } else if (percentage >= 70) {
      setGrade('Оценка 3')
      
    } else {
      setGrade('Оценка 2')
    }
  }

  return (
    <>
      <div className='wrapper'>
        <input type='file' id='fileInput' />
          <button onClick={parseFile}>Начать тестирование</button>
          <form onSubmit={checkResults}>
            {test.map((testItem, index) => (
              <Test key={index} arrQuestions={testItem.arrQuestions} arrAnswers={testItem.arrAnswers} />
            ))}
            {showResults && <button type='submit'>Завершить тестирование</button>}
            {showResults && <p>{grade}</p>}
            {showResults && <div>{showAnswers}</div>}
          </form>
      </div>
    </>
  )
}