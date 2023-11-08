import React from 'react';
import '../../style.css';
const About = () => {
  return (
    <main className='content'>
      <section id='about-section' className='aboutDetails'>
        <div className='about-us-left'>
          <div className='left'>
            <img src="../../assets/dua-hands_84660.png" alt="" />
            <p>DAILY PRAYERS</p>
          </div>
          <div className="left">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fVoIhgnvvuZpffPthWwimolCf45VseOl8vSFch79JkHoaPaMOKbsewQMIHw2HELboOw&usqp=CAU" alt="" />
            <p>CONTINUOUS TEACHING</p>
          </div>
        </div>
        <div className='about-us-center'>
          <h2>About</h2>
          <h1>Our Church</h1>
          <blockquote class="blockquote">In a special sense Seventh-day Adventists have been set in the world as watchmen and light bearers. To them has been entrusted the last warning for a  perishing world. On them is shining wonderful light from the Word of God. They have been given a work of the most solemn import—the proclamation of the first, second, and third angels’ messages. There is no other work of so great importance. They are to allow nothing else to absorb their attention. LDE 45.3</blockquote>
        </div>
        <div className='about-us-right'>
          <div className='right'>
            <img src="https://media.istockphoto.com/id/1343496367/vector/team-work-concept-five-hands-connection.jpg?s=612x612&w=0&k=20&c=RqEaBlKIba3b43vEZL9xId9o10Vnr8Fcl8aq6Y0WvxA=" alt="" />
            <p>community helpers</p>
          </div>
          <div class="right">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ErKnDZLzZLcE3A42pwGedtOFq9AlINDTuw&usqp=CAU" alt="" />
            <p>Sabbath worship</p>
          </div>
        </div>
      </section>
    </main>
    // <>


    // </>
  );
};

export default About