import { Link } from "react-router-dom";
import "./home.css";

const data = [
    { text: "Paid Surveys: Earn Money Online, Work From Home." },
    { text: "Earn Rewards For completing academic research questionnaires." },
    { text: "Fill questionnaires anonymously with 100% data privacy." }
];

const Home = () => {
    return (
        <section className="home">
            <div className="home-inner wrap">
                <h1 className="home-title">
                    <span className="home-text home-text-1">Text 1</span>
                    <span className="home-text home-text-2">Text 2</span>
                    <span className="home-text home-text-3">Text 3</span>
                </h1>
                <Link className="home-link" to="">
                    Get Started
                </Link>
            </div>
        </section>
    );
}

export default Home;