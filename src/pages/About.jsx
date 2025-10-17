import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <section className="text-center mb-12 bg-primaryBlue p-8 rounded-3xl shadow-xl md:p-12 lg:p-16 border-4 border-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-md">
          About Us: We Are The Church
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 text-white/90">
          A community of believers walking together in faith, guided by the Holy Spirit, and united in Christ's love.
        </p>
        <Link
          to="/"
          className="inline-block bg-primaryYellow text-textGray font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1 border-4 border-white"
        >
          Back to Home
        </Link>
      </section>

      {/* Our Story Section */}
      <section className="mb-12 bg-bgLightBlue p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue text-center">Our Story</h2>
        <p className="text-lg text-textGray mb-4">
          We Are the Church was founded by Zak Ward, a Senior Software Engineer, devoted father, loving husband, and firm believer in Christ as our Savior and God. Inspired by a vision of a "walking, breathing church" that embodies biblical truth through love and community, Zak created this platform and ministry in Ward, Arkansas. Drawing from non-denominational Christian principles and communal living reminiscent of the Essenes, our gatherings happen daily at the ranch, with guitar-led worship and Holy Spirit-guided leadership.
        </p>
        <p className="text-lg text-textGray mb-4">
          This isn't about buildings or hierarchies—it's about people coming together wherever they are, empowered by the Holy Spirit, to live out the Gospel in authenticity and grace.
        </p>
      </section>

      {/* Statement of Faith Section */}
      <section className="mb-12 bg-white p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-primaryBlue text-center">Our Statement of Faith</h2>
        <ul className="space-y-4 text-lg text-textGray">
          <li className="flex items-start">
            <span className="mr-2 text-2xl text-secondaryPink">•</span>
            <div>
              <strong>God is the Trinity:</strong> We believe in one eternal God who exists as three persons—Father, Son (Jesus Christ), and Holy Spirit—co-equal, co-eternal, and united in purpose, love, and holiness.
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-2xl text-secondaryPink">•</span>
            <div>
              <strong>Jesus is Divine:</strong> Jesus Christ is fully God and fully man, born of the virgin Mary, who lived a sinless life, died on the cross for our sins, rose bodily from the dead, ascended to heaven, and will return in glory to judge and reign.
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-2xl text-secondaryPink">•</span>
            <div>
              <strong>We Are the Church:</strong> The church isn't a building, priest, pastor, apostle, or bishop—it's wherever two or more gather in Jesus' name, and there He is among us (Matthew 18:20). No brick-and-mortar structures or formal hierarchies are needed; we are a living, breathing community led by the Holy Spirit.
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-2xl text-secondaryPink">•</span>
            <div>
              <strong>Jesus Meets You Where You Are:</strong> Jesus doesn't require you to change or give up anything to come to Him—He meets you exactly where and when you are, loving you unconditionally. It's not about your efforts, but His grace freely given.
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-2xl text-secondaryPink">•</span>
            <div>
              <strong>Salvation by Grace, Not Works:</strong> You don't have to earn God's favor or transform yourself first. Salvation is through faith in Jesus' finished work on the cross—His grace alone (Ephesians 2:8-9). Open your eyes and heart to Him, and let His convictions gently guide you.
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-2xl text-secondaryPink">•</span>
            <div>
              <strong>Empowered by the Holy Spirit:</strong> Once you choose to follow Jesus, the Holy Spirit dwells in you, granting authority and power far beyond what many religions acknowledge. You are equipped to live victoriously, discern truth, and impact the world.
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-2xl text-secondaryPink">•</span>
            <div>
              <strong>Spiritual Warfare is Real:</strong> We acknowledge the reality of spiritual battles—both good and evil forces at work (Ephesians 6:12). Through Christ, we have victory, but we must be vigilant, armed with prayer, Scripture, and faith.
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-2xl text-secondaryPink">•</span>
            <div>
              <strong>Our True Nature:</strong> We are eternal spiritual beings having a temporary human experience, not merely humans with occasional spiritual moments. This perspective shapes how we live, love, and pursue truth in Christ.
            </div>
          </li>
        </ul>
      </section>

      {/* Call to Action Section */}
      <section className="text-center mb-12 bg-secondaryPink p-8 rounded-3xl shadow-xl border-4 border-white">
        <h2 className="text-3xl font-bold mb-6 text-white">Join Us on This Journey</h2>
        <p className="text-lg mb-6 text-white/90">
          Whether you're seeking truth, exploring faith, or ready to dive deeper into a relationship with Jesus, We Are the Church welcomes you. No prerequisites, no judgments—just open hearts and the transforming power of God's love.
        </p>
        <Link
          to="/forum"
          className="inline-block bg-primaryBlue text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1 border-4 border-white"
        >
          Connect in Our Forum
        </Link>
      </section>
    </div>
  );
};

export default About;