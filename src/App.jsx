import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Spline from '@splinetool/react-spline'

const Page = ({ title, children }) => (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white text-slate-800">
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-blue-700">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          NutriVibe
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <Link to="/about" className="hover:text-blue-700">About</Link>
          <Link to="/contact" className="hover:text-blue-700">Contact</Link>
          <Link to="/privacy" className="hover:text-blue-700">Privacy</Link>
          <Link to="/patient" className="hover:text-blue-700">Patient</Link>
          <Link to="/admin" className="hover:text-blue-700">Admin</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded-md border text-sm hover:bg-slate-50">Sign in</button>
          <button className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">Get Started</button>
        </div>
      </div>
    </header>
    <main className="flex-1">{children}</main>
    <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-600">© {new Date().getFullYear()} NutriVibe. All rights reserved.</footer>
  </div>
)

const Hero = () => (
  <section className="relative h-[70vh] w-full overflow-hidden">
    <div className="absolute inset-0">
      <Spline scene="https://prod.spline.design/5EwoDiC2tChvmy4K/scene.splinecode" style={{ width: '100%', height: '100%' }} />
    </div>
    <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex items-center">
      <div className="bg-white/70 backdrop-blur rounded-xl p-6 md:p-8 shadow-md max-w-xl">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">Personalized Nutrition Care, Powered by Science</h1>
        <p className="mt-4 text-slate-700">Book appointments, chat live with your nutritionist, and track your wellness journey. Built with 3D visuals for a delightful experience.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/patient" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Patient Dashboard</Link>
          <Link to="/admin" className="px-4 py-2 rounded-md border border-blue-600 text-blue-700 hover:bg-blue-50">Admin Dashboard</Link>
        </div>
      </div>
    </div>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/20" />
  </section>
)

const Home = () => (
  <Page>
    <Hero />
    <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
      {["Reserve Appointments", "Live Chat", "Diet Questionnaires"].map((t, i) => (
        <div key={i} className="rounded-xl border p-6 bg-white hover:shadow-md transition">
          <h3 className="font-semibold text-lg">{t}</h3>
          <p className="text-slate-600 mt-2">Streamlined tools designed for modern nutrition care.</p>
        </div>
      ))}
    </section>
  </Page>
)

const About = () => (
  <Page title="About">
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold">About Us</h2>
      <p className="mt-4 text-slate-700">We combine clinical expertise with engaging, 3D-first design to make healthy habits stick.</p>
    </section>
  </Page>
)

const Contact = () => (
  <Page title="Contact">
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold">Contact Us</h2>
      <p className="mt-4 text-slate-700">Reach us anytime. We usually reply within a day.</p>
      <form className="mt-6 grid gap-4">
        <input placeholder="Your name" className="border rounded-md px-3 py-2" />
        <input type="email" placeholder="Email" className="border rounded-md px-3 py-2" />
        <textarea placeholder="Message" className="border rounded-md px-3 py-2 min-h-[120px]" />
        <button type="button" className="px-4 py-2 rounded-md bg-blue-600 text-white w-fit">Send</button>
      </form>
    </section>
  </Page>
)

const Privacy = () => (
  <Page title="Privacy">
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold">Privacy Policy</h2>
      <p className="mt-4 text-slate-700">Your data is protected. We use industry-standard encryption and never sell your information.</p>
    </section>
  </Page>
)

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

const PatientDashboard = () => {
  const [form, setForm] = React.useState({ name: '', email: '', date: '', time: '', reason: '' })
  const [messages, setMessages] = React.useState([])

  const book = async () => {
    const res = await fetch(`${API_BASE}/api/appointments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ patient_email: form.email, patient_name: form.name, date: form.date, time: form.time, reason: form.reason }) })
    const data = await res.json()
    alert('Appointment created: ' + data.id)
  }

  const send = async (content) => {
    if (!content) return
    await fetch(`${API_BASE}/api/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ room: 'patient', sender: form.name || 'Guest', sender_email: form.email, content }) })
    loadMsgs()
  }
  const loadMsgs = async () => {
    const res = await fetch(`${API_BASE}/api/messages?room=patient`)
    const data = await res.json()
    setMessages(data.items || [])
  }
  React.useEffect(() => { loadMsgs() }, [])

  return (
    <Page title="Patient Dashboard">
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        <div className="border rounded-xl p-6 bg-white">
          <h3 className="font-semibold text-lg">Reserve Appointment</h3>
          <div className="grid gap-3 mt-4">
            <input className="border rounded-md px-3 py-2" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input className="border rounded-md px-3 py-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            <div className="grid grid-cols-2 gap-3">
              <input className="border rounded-md px-3 py-2" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
              <input className="border rounded-md px-3 py-2" type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} />
            </div>
            <input className="border rounded-md px-3 py-2" placeholder="Reason" value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} />
            <button onClick={book} className="px-4 py-2 rounded-md bg-blue-600 text-white w-fit">Reserve</button>
          </div>
        </div>
        <div className="border rounded-xl p-6 bg-white">
          <h3 className="font-semibold text-lg">Live Chat</h3>
          <div className="mt-4 h-64 overflow-auto space-y-2 border rounded-md p-3 bg-slate-50">
            {messages.map(m => (
              <div key={m.id} className="text-sm"><span className="font-medium">{m.sender}:</span> {m.content}</div>
            ))}
          </div>
          <ChatInput onSend={send} />
        </div>
      </section>
    </Page>
  )
}

const AdminDashboard = () => {
  const [presc, setPresc] = React.useState({ patient_email: '', patient_name: '', items: '', instructions: '' })
  const [invoice, setInvoice] = React.useState({ patient_email: '', patient_name: '', items: '', subtotal: 0, tax: 0, total: 0 })

  const savePresc = async () => {
    const payload = { ...presc, items: presc.items.split(',').map(s=>s.trim()).filter(Boolean) }
    const res = await fetch(`${API_BASE}/api/prescriptions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json(); alert('Prescription saved: ' + data.id)
  }
  const saveInvoice = async () => {
    const items = invoice.items.split(',').map(s => ({ name: s.trim(), price: 0, quantity: 1 }))
    const payload = { ...invoice, items, subtotal: Number(invoice.subtotal)||0, tax: Number(invoice.tax)||0, total: Number(invoice.total)||0 }
    const res = await fetch(`${API_BASE}/api/invoices`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json(); alert('Invoice created: ' + data.id)
  }

  return (
    <Page title="Admin Dashboard">
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        <div className="border rounded-xl p-6 bg-white">
          <h3 className="font-semibold text-lg">Create Prescription</h3>
          <div className="grid gap-3 mt-4">
            <input className="border rounded-md px-3 py-2" placeholder="Patient name" value={presc.patient_name} onChange={e=>setPresc({...presc,patient_name:e.target.value})} />
            <input className="border rounded-md px-3 py-2" placeholder="Patient email" value={presc.patient_email} onChange={e=>setPresc({...presc,patient_email:e.target.value})} />
            <input className="border rounded-md px-3 py-2" placeholder="Items (comma separated)" value={presc.items} onChange={e=>setPresc({...presc,items:e.target.value})} />
            <textarea className="border rounded-md px-3 py-2 min-h-[90px]" placeholder="Instructions" value={presc.instructions} onChange={e=>setPresc({...presc,instructions:e.target.value})} />
            <button onClick={savePresc} className="px-4 py-2 rounded-md bg-blue-600 text-white w-fit">Save</button>
          </div>
        </div>
        <div className="border rounded-xl p-6 bg-white">
          <h3 className="font-semibold text-lg">Generate Invoice</h3>
          <div className="grid gap-3 mt-4">
            <input className="border rounded-md px-3 py-2" placeholder="Patient name" value={invoice.patient_name} onChange={e=>setInvoice({...invoice,patient_name:e.target.value})} />
            <input className="border rounded-md px-3 py-2" placeholder="Patient email" value={invoice.patient_email} onChange={e=>setInvoice({...invoice,patient_email:e.target.value})} />
            <input className="border rounded-md px-3 py-2" placeholder="Items (comma separated)" value={invoice.items} onChange={e=>setInvoice({...invoice,items:e.target.value})} />
            <div className="grid grid-cols-3 gap-3">
              <input className="border rounded-md px-3 py-2" placeholder="Subtotal" value={invoice.subtotal} onChange={e=>setInvoice({...invoice,subtotal:e.target.value})} />
              <input className="border rounded-md px-3 py-2" placeholder="Tax" value={invoice.tax} onChange={e=>setInvoice({...invoice,tax:e.target.value})} />
              <input className="border rounded-md px-3 py-2" placeholder="Total" value={invoice.total} onChange={e=>setInvoice({...invoice,total:e.target.value})} />
            </div>
            <button onClick={saveInvoice} className="px-4 py-2 rounded-md bg-blue-600 text-white w-fit">Create</button>
          </div>
        </div>
      </section>
    </Page>
  )
}

const ChatInput = ({ onSend }) => {
  const [text, setText] = React.useState('')
  return (
    <div className="mt-3 flex gap-2">
      <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 border rounded-md px-3 py-2" placeholder="Type a message" />
      <button onClick={()=>{onSend(text); setText('')}} className="px-3 py-2 rounded-md bg-blue-600 text-white">Send</button>
    </div>
  )
}

const Questionnaire = () => {
  const [form, setForm] = React.useState({ email:'', goals:'', allergies:'', dietary_preferences:'', notes:'' })
  const submit = async () => {
    await fetch(`${API_BASE}/api/questionnaires`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ patient_email: form.email, goals: form.goals, allergies: form.allergies, dietary_preferences: form.dietary_preferences, notes: form.notes }) })
    alert('Submitted!')
  }
  return (
    <Page title="Questionnaire">
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-semibold">Nutrition Intake Questionnaire</h3>
        <div className="grid gap-3 mt-4">
          <input className="border rounded-md px-3 py-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <textarea className="border rounded-md px-3 py-2 min-h-[80px]" placeholder="Goals" value={form.goals} onChange={e=>setForm({...form,goals:e.target.value})} />
          <textarea className="border rounded-md px-3 py-2 min-h-[80px]" placeholder="Allergies" value={form.allergies} onChange={e=>setForm({...form,allergies:e.target.value})} />
          <textarea className="border rounded-md px-3 py-2 min-h-[80px]" placeholder="Dietary preferences" value={form.dietary_preferences} onChange={e=>setForm({...form,dietary_preferences:e.target.value})} />
          <textarea className="border rounded-md px-3 py-2 min-h-[80px]" placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
          <button onClick={submit} className="px-4 py-2 rounded-md bg-blue-600 text-white w-fit">Submit</button>
        </div>
      </section>
    </Page>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
      </Routes>
    </Router>
  )
}

export default App
