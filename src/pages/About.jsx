const About = () => (
  <div className="about-container">
    <h1>About MEGGA</h1>
    <p>
      In today's fast-changing economy, rising prices and economic shifts impact every household.
      <p></p>
      <strong>MEGGA (Monitoring Economic Goods & Government Advocacy)</strong> empowers individuals to take action by automatically notifying elected representatives when economic thresholds are met. 
      By tracking key economic indicators—like the cost of everyday goods—you can <strong>automate advocacy efforts</strong> and ensure your voice is heard where it matters.
    </p>

    <h2>Why Use MEGGA?</h2>
    <ul>
      <li><strong>📈 Stay Informed:</strong> MEGGA continuously monitors economic data, so you don’t have to.</li>
      <li><strong>✊ Advocate Effortlessly:</strong> Set personal thresholds, and when economic changes exceed them, automatic emails are sent to your representatives.</li>
      <li><strong>📢 Amplify Your Impact:</strong> Engage policymakers with real-world data.</li>
      <li><strong>🔔 Get Notified:</strong> Opt-in for personal alerts when a threshold is triggered, so you can follow up and take additional action.</li>
      <li><strong>🌎 Make a Difference:</strong> Advocacy shouldn’t be a full-time job—MEGGA makes it <strong>easy, automated, and effective</strong>.</li>
    </ul>

    <h2>How It Works</h2>
    <ol>
      <li><strong>Create an Account</strong> – Securely log in with AWS Cognito.</li>
      <li><strong>Set Thresholds</strong> – Choose goods or economic indicators you care about and define when alerts should be triggered.</li>
      <li><strong>Automatic Email Notifications</strong> – When a threshold is met, MEGGA sends an email to your specified representatives.</li>
      <li><strong>Stay Engaged</strong> – Receive notifications so you can follow up, share, and make your voice even louder.</li>
    </ol>

    <h2>A Proof of Concept</h2>
    <p>
      MEGGA is a <strong>proof-of-concept project</strong> focused on <strong>demonstrating the power of automated advocacy.</strong>
      For security reasons, real-world emails are not sent to representatives. Instead, test emails are delivered via 
      <strong>Testmail.app</strong>, ensuring a <strong>safe, responsible testing environment</strong> while preserving MEGGA's core functionality.
    </p>

    <h2>Join the Movement</h2>
    <p>Every voice matters. MEGGA makes sure yours is heard.</p>
  </div>
);

export default About;