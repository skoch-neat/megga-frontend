import { useAuth } from "react-oidc-context";

const About = () => {
  const auth = useAuth();

  return (
    <div className="about-container">
      <h1>About MEGGA</h1>
      <p>
        MEGGA is an application designed to track essential goods and economic indicators,
        sending notifications when thresholds are crossed.
      </p>
    </div>
  );
};

export default About;
