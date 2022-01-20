import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(questions => setQuestions(questions))
  }, [])

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(question => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
    console.log(deletedQuestion)
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map(question => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions)
  }

  function handleCorrectAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correctIndex })
    })
    .then(r => r.json())
    .then(updatedQuestion => handleUpdateQuestion(updatedQuestion))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm questions={questions} setQuestions={setQuestions} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onCorrectAnswerChange={handleCorrectAnswerChange} />
      )}
    </main>
  );
}

export default App;
