import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../config/config";
import useAuthStore from "../../components/store/useAuthStore";

import backaro from "../../assets/img/backaro.svg";
import dept from "../../assets/img/blu-dept.svg";
import partps from "../../assets/img/partps.svg";

import "./expandsurvey.css"

const expandsurvey = () =>{
   // Temporary navigate
   const { id } = useParams();
const navigate = useNavigate();
const authToken = useAuthStore((state) => state.authToken);
const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveyInfo = async () => {
const API_URl =  `${config.API_URL}/surveys/${id}/info`;
const options ={
  method: "GET",
  headers:{
    "Content-Type": "applictions/json",
    Authorization: `Bearer ${authToken}`,
  },
};

const response = await fetch(API_URl, options);
const json = await response.json();

try {
  if(!response.ok)
    throw new Error(json.msg || "Failed to fectch survey details");
  setSurvey(json.survey);

}catch(error){
  toast.error(error.msg || "Error fetching survey details")
  console.error("Error:", error);
}finally {
  setLoading(false);
}
    };
    fetchSurveyInfo();
  }, [id, authToken]);
  
  // Show loading state while fetching
  if (loading) {
    return <p className="loading_survey">Loading survey details...</p>;
  }

  // Show error message if survey data is not available
  if (!survey) {
    return <p>Survey not found.</p>;
  }
  
return(
    <section className="expand">
 <div className="dashboard_inner wrap">
    <Link to="/dashboard"> <img src={backaro} className="backaro" /></Link>
    <div className="post_time flex">
    <p className="posted">Posted {new Date(survey.createdAt).toLocaleString()}</p>
    <p className="duration">points to earn</p>
  </div>
  <div className="survey_details flex">
    <h3 className="survey_title">{survey.title}</h3>
    <h4 className="point">{survey.point || 0} points</h4>
  </div>
  <div className="description">
    <h4>Description</h4>
    <p>{survey.description}
    </p>
  </div>
  <div className="pre_participants">
  <h4>Preferred participants</h4>
  <ul>
    {survey.preferred_participants}
  </ul>
  </div>
  <div className="activities">
  <h4>Activities on this survey</h4>
  <div className="activity_row center flex">
  <li className="">Total participant required</li>
    <p className="required_no"> <span className="participant_no">{survey.max_participant}</span> Participants</p>
  </div>
  <div className="activity_row center flex">
  <li className="">Participated</li>
    <p className="required_no"><span className="participant_no">{survey.current_participants || 0}</span> Participated</p>
  </div>
  <div className="activity_row center flex">
    <li className="">No. of participants left</li>
    <p className="required_no"> <span className="participant_no"> {survey.max_participant - (survey.current_participants || 0)}</span>{" "} Left</p>
  </div>
  </div>
  
<div className="survey_class flex">
  <div className="dept flex">
    <img src={dept} alt="" />
    <h4 className="department">Inst. of <span className="dept">{survey.institution || "N/A"}</span></h4>
  </div>
  <div className="participants flex">
<img src={partps} alt="" />
<p> <span className="num_participant">{survey.current_participants || 0}</span> Participants</p>
  </div>
</div>
<div className="flex btn_div">
  <button className="start-btn btn" onClick={() => navigate('/surveyform/${id}')}>
                    Start survey
                </button>
</div>

 </div>
    </section>
)
}
export default expandsurvey;