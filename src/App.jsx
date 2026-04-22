
import './App.css'
import 'boxicons'
import { useState, useEffect, useRef } from "react";

function App() {
  const [isChatOpen, setChat] = useState(true)

  return (
    <div className='flex flex-col'>
      <Header />
      <div className='flex '>
        <Main />
        <ChatBot isChatOpen={isChatOpen} setChat={setChat} />
      </div>
      <Browse />
      <ContactInfo />
    </div>
  )
}


function ChatBot({ isChatOpen, setChat }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hey! This is Bistro Bliss's AI Chatbot. Let me know if you need any help!😊 If you have an issue please press Contact"
    }
  ]);

  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const options = [
    { question: "What are your hours?", answer: "We're open Monday to Sunday from 9 AM to 10 PM." },
    { question: "Where are you located?", answer: "We're located at 123 Main Street, Toronto." },
    { question: "Do you take reservations?", answer: "Yes! You can make a reservation through our website or by calling us." },
    { question: "What's on the menu?", answer: "We offer a variety of pastas, grilled dishes, desserts, and drinks!" },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isChatOpen) {
      setMessages([
        {
          sender: "bot",
          text: "Hey! This is Bistro Bliss's AI Chatbot. Let me know if you need any help!😊"
        }
      ]);
    }
  }, [isChatOpen]);

  const handleClick = (option) => {
    setMessages((prev) => [...prev, { sender: "user", text: option.question }]);
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: option.answer }]);
      setLoading(false);
    }, 800);
  };

  return (
    <>
      {/* ================= CLOSED STATE (ICON ONLY) ================= */}
      {!isChatOpen && (
        <div
          className="fixed bottom-5 right-5 w-14 h-14 cursor-pointer transition-transform hover:scale-110"
          onClick={() => setChat(true)}
        >
          <img
            src="src/images/images.jfif"
            alt="chat avatar"
            className="w-full h-full rounded-full border-2 border-red-400 shadow-lg"
          />
        </div>
      )}

      {/* ================= OPEN CHAT ================= */}
      <div
        className={`fixed bottom-0 right-0 w-70 h-120 flex flex-col bg-white overflow-hidden text-sm border-2 rounded-3xl transition-all duration-300 origin-bottom-right
        ${isChatOpen ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"}`}
      >
        {/* HEADER */}
        <header className="w-full bg-red-800 h-18 rounded-t-3xl flex gap-4 pl-5 items-center">
          <i
            className="bx bx-x text-3xl text-white hover:text-gray-500 transition-colors cursor-pointer"
            onClick={() => setChat(false)}
          />

          <div className="flex gap-4 items-center">
            <img className="rounded-full w-12 h-12" src="src/images/images.jfif" alt="Bot" />
            <div className="flex flex-col leading-tight">
              <h1 className="text-white text-sm">Bistro Bliss</h1>
              <p className="text-gray-200 text-xs">AI Assistant</p>
            </div>
          </div>
        </header>

        {/* MESSAGES */}
        <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {msg.sender === "bot" && (
                <img
                  src="src/images/images.jfif"
                  className="w-6 h-6 rounded-full"
                  alt="bot"
                />
              )}

              <div
                className={`max-w-[75%] px-3 py-1.5 rounded-xl ${msg.sender === "user"
                  ? "bg-red-800 text-white"
                  : "bg-gray-200 text-black"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2">
              <img src="src/images/images.jfif" className="w-6 h-6 rounded-full" />
              <i className="bx bx-dots-horizontal-rounded text-2xl animate-spin"></i>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* SUGGESTIONS */}
        <div className="p-2 border-t grid grid-cols-2 gap-2">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleClick(opt)}
              className="text-xs h-12 flex items-center justify-center text-center bg-gray-200 rounded-xl hover:bg-gray-300 px-2"
            >
              {opt.question}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function Header() {
  return (
    <header className='absolute bg-white  w-full flex justify-between items-center pl-20 pr-5'>
      <div className='flex items-center gap-5'>
        <img className='h-20' src="src/images/logo.png" alt="Logo" />
        <h1 className='title'>Bistro Bliss</h1>
      </div>

      <ul className='flex gap-5 items-center justify-center'>
        <li className='cursor-pointer headerBtn'>Home</li>
        <li className='cursor-pointer headerBtn'>About</li>
        <li className='cursor-pointer headerBtn'>Menu</li>
        <li className='cursor-pointer headerBtn'>Pages</li>
        <li className='cursor-pointer bg-gray-400 hover:bg-gray-800 headerBtn'>Contact</li>
      </ul>

      <button className='cursor-pointer border-2 text-sm rounded-full px-4 py-2 h-10 text-center'>Book a Table</button>
    </header>
  )
}

function Main() {
  return (
    <div className='mainImg w-full h-screen flex flex-col gap-4 items-center justify-center'>
      <h1 className='text-7xl fancy w-120 text-center '>Best food for your taste</h1>
      <p className='w-100 text-center'>Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven.</p>
      <div className='flex gap-5'>
        <button className='cursor-pointer bg-red-800  text-sm p-4 px-7 rounded-full text-white'>Book A Table</button>
        <button className='cursor-pointer text-sm border-2 rounded-full p-4 px-7'>Explore Menu</button>
      </div>
    </div>
  )
}


function Browse() {
  return (
    <div className='flex flex-col items-center justify-center gap-5 w-full h-100 mb-50'>
      <h1 className='fancy text-4xl p-20 mt-20'>Browse Our Menu</h1>
      <div className='flex justify-evenly items-center gap-5'>
        <div className='flex flex-col border-2 border-taupe-300  gap-2 pt-4 w-60 h-70 items-center  rounded-xl '>
          <img className='h-20' src="src/images/breakfast.png" alt="Coffee" />
          <h1 className='font-bold text-2xl'>Breakfast</h1>
          <p className='text-center w-50 text-sm'>In the new era of technology we look in the future with certainty and pride for our life.</p>
          <p className='text-red-800 pt-5'>Explore Menu</p>
        </div>
        <div className='flex flex-col gap-2 border-2 border-taupe-300 pt-4 w-60 h-70 items-center  rounded-xl '>
          <img className='h-20' src="src/images/rice.png" alt="Coffee" />
          <h1 className='font-bold text-2xl'>Main Dishes</h1>
          <p className='text-center w-50 text-sm'>In the new era of technology we look in the future with certainty and pride for our life.</p>
          <p className='text-red-800 pt-5'>Explore Menu</p>
        </div>
        <div className='flex flex-col gap-2 border-2 border-taupe-300 pt-4 w-60 h-70 items-center  rounded-xl '>
          <img className='h-20' src="src/images/cup.png" alt="Coffee" />
          <h1 className='font-bold text-2xl'>Drinks</h1>
          <p className='text-center w-50 text-sm'>In the new era of technology we look in the future with certainty and pride for our life.</p>
          <p className='text-red-800 pt-5'>Explore Menu</p>
        </div>
        <div className='flex flex-col  gap-2 border-2 border-taupe-300 pt-4 w-60 h-70 items-center  rounded-xl '>
          <img className='h-20' src="src/images/desserts.png" alt="Coffee" />
          <h1 className='font-bold text-2xl'>Desserts</h1>
          <p className='text-center w-50 text-sm'>In the new era of technology we look in the future with certainty and pride for our life.</p>
          <p className='text-red-800 pt-5'>Explore Menu</p>
        </div>


      </div>

     
    </div>
  )
}

function ContactInfo() {
  return (
    <div className='bg-olive-100 w-full h-200 flex items-center justify-center '>
      <div className='flex items-center justify-center w-120 gap-20'>


        <img src="src/images/food2.png" alt="Food" className='w-100' />
        <div className='flex flex-col items-center justify-center gap-5'>
          <h1 className='fancy text-5xl text-center w-120'>We provide healthy food for your family.</h1>
          <p className='text-center bold font-bold'>Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance. Rooted in city's rich culinary culture, we aim to honor our local roots while infusing a global palate.</p>
          <p className=' text-center'>At Bistro Bliss, we believe that dining is not just about food, but also about the overall experience. Our staff, renowned for their warmth and dedication, strives to make every visit an unforgettable event.</p>
          <button className='cursor-pointer text-sm border-2 rounded-full p-4 px-7 bg-white w-50'>More About Us</button>
        </div>
      </div>
    </div>
  )
}

export default App
