import React from 'react';


const testimonialsData = [
  {
    name: 'Aryan Mehta',
    feedback: "“I've tried several Mental health platforms, but Mind Haven truly stands out. The resources are so practical and insightful. I feel supported and empowered every time I use it.”",
    image: '/img/img1.jpg', // Replace with actual image URL
  },
  {
    name: 'Neha Sharma',
    feedback: "“This website is like a safe retreat for my mind. Mind Haven offers guided meditations, mood tracking tools that have helped me navigate my emotions better. It feels like a community that genuinely cares.”",
    image: '/img/img2.png', // Replace with actual image URL
  },
  {
    name: 'Priya Nair',
    feedback: "“Mind Haven has been a game-changer for my mental health journey. The articles are relatable, it's a one-stop shop for anyone looking to prioritize their mental well-being.”",
    image: '/img/img3.jpg', // Replace with actual image URL
  },
  {
    name: 'Kunal Verma',
    feedback: "“Mind Haven is a breath of fresh air in the crowded mental health space. I love how user-friendly and thoughtful this app is. Whenever I feel overwhelmed, I just open the app, and it helps me regain my calm.”",
    image: '/img/img4.jpg', // Replace with actual image URL
  },
];

const Testimonials = () => {
  return (
    <section className="bg-blue-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-gray-600 mt-2">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
