import './App.css'
import 'boxicons'
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

function App() {
  const [isChatOpen, setChat] = useState(false)

  return (
    <div className='flex flex-col bg-white'>
      <Header />
      <Main />
      <Browse />
      <ContactInfo />
      <ChatBot isChatOpen={isChatOpen} setChat={setChat} />
    </div>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-8 py-3 flex justify-between items-center
        bg-white shadow-md`}
    >
      <div className='flex items-center gap-3'>
        <img className='h-14' src="src/images/logo.png" alt="Logo" />
        <h1 className='text-2xl font-black text-red-700 tracking-tight'>Bistro Bliss</h1>
      </div>

      <ul className='hidden md:flex gap-8 items-center text-sm font-medium'>
        {["Home", "About", "Menu", "Pages"].map(item => (
          <li key={item} className='cursor-pointer text-gray-700 hover:text-red-600 transition-colors'>{item}</li>
        ))}
        <li className='cursor-pointer text-red-600 font-semibold hover:text-red-800 transition-colors'>Contact</li>
      </ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='cursor-pointer bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full px-5 py-2.5 transition-colors shadow-lg shadow-red-200'
      >
        Book a Table
      </motion.button>
    </motion.header>
  )
}

function Main() {
  return (
    <div className='relative mainImg w-full h-screen flex flex-col gap-6 items-center justify-center text-center px-4 overflow-hidden'>
      {/* Colorful blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-red-500 text-sm font-bold tracking-widest uppercase"
      >
        🍽️ Welcome to Bistro Bliss
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className='text-5xl sm:text-7xl font-black text-gray-900 leading-tight max-w-3xl'
      >
        Best Food For <span className="text-red-600">Your Taste</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className='text-gray-500 max-w-md text-base'
      >
        Discover delectable cuisine and unforgettable moments in our welcoming culinary haven.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className='flex gap-4'
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-red-200 transition-colors'
        >
          Book A Table
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='cursor-pointer border-2 border-gray-300 hover:border-red-400 font-semibold px-8 py-3.5 rounded-full transition-colors'
        >
          Explore Menu
        </motion.button>
      </motion.div>

   
    </div>
  )
}

function Browse() {
  const categories = [
    { img: "src/images/breakfast.png", name: "Breakfast" },
    { img: "src/images/rice.png", name: "Main Dishes"},
    { img: "src/images/cup.png", name: "Drinks"},
    { img: "src/images/desserts.png", name: "Desserts"},
  ]

  return (
    <div className='flex flex-col items-center gap-12 w-full py-24 px-4 bg-gray-50'>
      <div className="text-center">
        <p className="text-red-500 text-sm font-bold tracking-widest uppercase mb-2">What we offer</p>
        <h1 className='text-4xl sm:text-5xl font-black text-gray-900'>Browse Our Menu</h1>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl'>
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className='flex flex-col items-center gap-3 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-red-100 transition-all cursor-pointer'
          >
            <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center">
              <img className='h-12 w-12 object-contain' src={cat.img} alt={cat.name} />
            </div>
            <h2 className='font-bold text-lg text-gray-900'>{cat.name}</h2>
            <p className='text-center text-gray-400 text-xs leading-relaxed'>
              Fresh ingredients, bold flavors, made with love every day.
            </p>
            <p className='text-red-600 text-sm font-semibold hover:text-red-800 transition-colors mt-1'>
              Explore Menu →
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ContactInfo() {
  return (
    <div className='w-full py-24 px-4 flex items-center justify-center bg-white'>
      <div className='flex flex-col lg:flex-row items-center gap-16 max-w-5xl w-full'>
        <motion.img
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          src="src/images/food2.png"
          alt="Food"
          className='w-full max-w-sm rounded-3xl shadow-2xl'
        />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col gap-5 max-w-lg'
        >
          <p className="text-red-500 text-sm font-bold tracking-widest uppercase">Our Story</p>
          <h2 className='text-4xl sm:text-5xl font-black text-gray-900 leading-tight'>
            Healthy Food For Your <span className="text-red-600">Family</span>
          </h2>
          <p className='text-gray-500 leading-relaxed text-sm'>
            Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance. Rooted in the city's rich culinary culture, we aim to honor our local roots while infusing a global palate.
          </p>
          <p className='text-gray-400 text-sm leading-relaxed'>
            At Bistro Bliss, dining is not just about food — it's about the overall experience. Our staff strives to make every visit an unforgettable event.
          </p>

          <div className="flex gap-8 py-2">
            {[["12+", "Years"], ["50k+", "Customers"], ["200+", "Menu Items"]].map(([num, label]) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-black text-red-600">{num}</span>
                <span className="text-xs text-gray-400 font-medium">{label}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-8 py-3 w-fit transition-colors shadow-lg shadow-red-100'
          >
            More About Us
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

function ChatBot({ isChatOpen, setChat }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey! 👋 Welcome to Bistro Bliss! How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const options = [
    { question: "What are your hours?", answer: "We're open Monday to Sunday from 9 AM to 10 PM! 🕘" },
    { question: "Where are you located?", answer: "We're at 123 Main Street, Toronto. Come visit us! 📍" },
    { question: "Take reservations?", answer: "Yes! Reserve through our website or call us. 📞" },
    { question: "What's on the menu?", answer: "Pastas, grilled dishes, desserts, drinks and more! 🍝" },
  ]

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleClick = (option) => {
    setMessages(prev => [...prev, { sender: "user", text: option.question }]);
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: option.answer }]);
      setLoading(false);
    }, 800);
  }

  return (
    <>
      {/* Closed button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-5 right-5 w-14 h-14 cursor-pointer z-50"
            onClick={() => setChat(true)}
          >
            <img src="src/images/images.jfif" alt="chat" className="w-full h-full rounded-full border-2 border-red-500 shadow-lg shadow-red-200" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed bottom-5 right-5 w-72 h-[480px] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden z-50 border border-gray-100"
          >
            {/* Header */}
            <div className="bg-red-600 px-4 py-3 flex items-center gap-3">
              <button onClick={() => setChat(false)} className="text-white/60 hover:text-white transition-colors mr-1">
                <i className="bx bx-x text-2xl" />
              </button>
              <img className="rounded-full w-9 h-9 border-2 border-white/30" src="src/images/images.jfif" alt="Bot" />
              <div>
                <p className="text-white text-sm font-bold leading-none">Bistro Bliss</p>
                <p className="text-red-200 text-xs">AI Assistant • Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2 bg-gray-50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <img src="src/images/images.jfif" className="w-6 h-6 rounded-full flex-shrink-0" alt="bot" />
                  )}
                  <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs leading-relaxed
                    ${msg.sender === "user"
                      ? "bg-red-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex items-center gap-2">
                  <img src="src/images/images.jfif" className="w-6 h-6 rounded-full" alt="bot" />
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1 shadow-sm">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-red-400"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Options */}
            <div className="p-2 border-t border-gray-100 bg-white grid grid-cols-2 gap-1.5">
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(opt)}
                  className="text-xs h-10 flex items-center justify-center text-center bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-xl px-2 transition-colors"
                >
                  {opt.question}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App