import React from 'react'
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const ServiceCard = ({ index, title, icon }) => {
  return(
   <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div 
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
          >
            <img src={icon} alt={title}
            className='w-16 h-16 object-contain' />
            <h3 className='text-white text-[20px] font-bold text-center'>
              {title}
            </h3>
          </div>
      </motion.div>
   </Tilt>
  )
}
const About = () => {
  return (
   <>
    <motion.dev variants={textVariant()}>
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>overview.</h2>
    </motion.dev>

    <motion.p
      variants={fadeIn('', '',0.1, 1)}
      className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a web developer with a passion for web technologies.I'm a quick learner and have hands-on experience with modern web technologies, including React, Next.js, and Tailwind CSS, as well as animation libraries like Framer Motion. I’ve also worked with backend technologies like Node.js and Express, and I’m comfortable with databases such as MongoDB.I’m always looking for opportunities to expand my skills and I enjoy collaborating with others and believe my adaptability and problem-solving mindset will help me contribute effectively to any team.I'm excited to continue growing in the field and to take on new challenges as I develop my career as a software developer.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
   </>
  )
}

export default About