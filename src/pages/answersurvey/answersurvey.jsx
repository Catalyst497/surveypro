import { Link, Form, useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuthStore from "../../store/useAuthStore";
import Complete from "../../components/completed/complete";
import config from "../../config/config";
import backaro from "../../assets/img/backaro.svg";
import "./answersurvey.css"

const answerSurvey = () => {

  const { id } = useParams(); // Get the survey ID from the URL
  const navigate = useNavigate();
  const authToken = useAuthStore((state) => state.authToken);
  const location = useLocation();
  // const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const { title, createdAt, points } = location.state || {};

  useEffect(() => {
    const fetchQuestions = async () => {
      const API_URL = `${config.API_URL}/surveys/${id}/questions`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };
      try {
        const response = await fetch(API_URL, options);
        const json = await response.json();
        if (!response.ok) throw new Error(json.msg || "Failed to fetch survey questions");
        setQuestions(json.questions || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [id, authToken]);

  const handleAnswerChange = (questionId, response) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: response,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Set submitting state to true

    const answerArray = Object.entries(answers).map(([questionId, response]) => ({
      questionId,
      response,
    }));


    const API_URL = `${config.API_URL}/surveys/${id}/submit`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ answers: answerArray }),
    };

    try {
      const response = await fetch(API_URL, options);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.msg || "Failed to submit survey");
      }
      // throw new Error(json.msg || "Failed to submit survey");
      setEarnedPoints(points); // Use points from location state
      setShowComplete(true);

    } catch (error) {
      console.error("Error submitting survey:", error);
      toast.error(error.message || "Error submitting survey!");
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };
  const handleDone = () => {
    navigate("/dashboard"); // Redirect to dashboard
  };

  if (loading) return <p className="ans-msg">Loading survey questions...</p>;
  if (questions.length === 0) return <p className="ans-msg">Opps! No questions found here, check other surveys.</p>;

  return (
    <>
      {showComplete ? (
        <Complete points={earnedPoints} onDone={handleDone} />
      ) : (
        <section className="fillsurvey">
          <div className="fillsurvey_inner wrap">
            <div className="survey-ans-details flex">
              <div className="flex ans-back-title">
                <Link to={`/expandsurvey/${id}`}> <img src={backaro} className="backaro" /></Link>
                <div>
                  <h3 className="survey_title_ans">{title || "Survey"}</h3>
                  <p className="ans-post-time">
                    Posted <span>{createdAt ? new Date(createdAt).toLocaleString() : "--"}</span>
                  </p>
                </div>
              </div>
              <div className="ans-point-earn flex">
                <h4 className="">Points to Earn</h4>
                <h5 className="ans-point">{points || "--"}</h5>
              </div>
            </div>
            <Form onSubmit={handleSubmit} className="ans-form">
              {questions.map((question, index) => (
                <div key={question._id} className="question-answer">
                  <p className="ans-question">
                    <span>{index + 1}.</span> {question.questionText}
                  </p>
                  {question.questionType === "multiple_choice" ? (
                    question.options.map((option, optIndex) => (
                      <label key={optIndex} className="answer-ques-opt">
                        <input
                          type="radio"
                          className="tick-ans"
                          name={`question-${question._id}`}
                          value={option.text}
                          onChange={(e) =>
                            handleAnswerChange(
                              question._id,
                              e.target.value
                            )
                          }
                        />
                        {option.text}
                      </label>
                    ))
                  ) : (
                    <input
                      className="fillin-ans"
                      type="text"
                      name={`question-${question._id}`}
                      placeholder="Your answer"
                      onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                      required

                    />
                  )}
                </div>
              ))}
              <div className="submit-div flex">
                <button type="submit"
                  className="submit-ans-btn"
                  disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          </div>
        </section>
      )}
    </>
  )
}
export default answerSurvey;