'use client'

import { useState, useRef, useEffect } from 'react'

interface CallParticipant {
  id: string
  name: string
  number: string
  status: 'idle' | 'dialing' | 'ringing' | 'connected' | 'disconnected'
}

export default function PhoneDialer() {
  const [participants, setParticipants] = useState<CallParticipant[]>([])
  const [currentNumber, setCurrentNumber] = useState('')
  const [isThreeWayCall, setIsThreeWayCall] = useState(false)
  const [dialToneEnabled, setDialToneEnabled] = useState(true)
  const [callStatus, setCallStatus] = useState<'idle' | 'active'>('idle')
  
  // Audio context for dial tones and ringing
  const audioContextRef = useRef<AudioContext | null>(null)
  const dialToneRef = useRef<OscillatorNode | null>(null)
  const ringToneRef = useRef<OscillatorNode | null>(null)

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playDialTone = () => {
    if (!dialToneEnabled || !audioContextRef.current) return
    
    // Create dual-tone dial tone (350Hz + 440Hz)
    const oscillator1 = audioContextRef.current.createOscillator()
    const oscillator2 = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()
    
    oscillator1.frequency.setValueAtTime(350, audioContextRef.current.currentTime)
    oscillator2.frequency.setValueAtTime(440, audioContextRef.current.currentTime)
    
    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)
    
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
    
    oscillator1.start()
    oscillator2.start()
    
    setTimeout(() => {
      oscillator1.stop()
      oscillator2.stop()
    }, 200)
  }

  const playRingTone = () => {
    if (!audioContextRef.current) return
    
    // Create ring tone (480Hz + 620Hz)
    const oscillator1 = audioContextRef.current.createOscillator()
    const oscillator2 = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()
    
    oscillator1.frequency.setValueAtTime(480, audioContextRef.current.currentTime)
    oscillator2.frequency.setValueAtTime(620, audioContextRef.current.currentTime)
    
    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)
    
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
    
    oscillator1.start()
    oscillator2.start()
    
    setTimeout(() => {
      oscillator1.stop()
      oscillator2.stop()
    }, 2000)
  }

  const handleDigitPress = (digit: string) => {
    setCurrentNumber(prev => prev + digit)
    playDialTone()
  }

  const handleCall = () => {
    if (!currentNumber) return
    
    const newParticipant: CallParticipant = {
      id: Date.now().toString(),
      name: `Contact ${participants.length + 1}`,
      number: currentNumber,
      status: 'dialing'
    }
    
    setParticipants(prev => [...prev, newParticipant])
    setCallStatus('active')
    
    // Simulate dialing process
    setTimeout(() => {
      setParticipants(prev => 
        prev.map(p => p.id === newParticipant.id ? { ...p, status: 'ringing' } : p)
      )
      playRingTone()
    }, 1000)
    
    // Simulate connection
    setTimeout(() => {
      setParticipants(prev => 
        prev.map(p => p.id === newParticipant.id ? { ...p, status: 'connected' } : p)
      )
    }, 4000)
    
    setCurrentNumber('')
    
    // Enable 3-way calling if we have 2 connected participants
    if (participants.filter(p => p.status === 'connected').length >= 1) {
      setIsThreeWayCall(true)
    }
  }

  const handleHangup = (participantId?: string) => {
    if (participantId) {
      setParticipants(prev => 
        prev.map(p => p.id === participantId ? { ...p, status: 'disconnected' } : p)
      )
      
      // Remove disconnected participants after animation
      setTimeout(() => {
        setParticipants(prev => prev.filter(p => p.id !== participantId))
      }, 1000)
    } else {
      // Hang up all
      setParticipants([])
      setCallStatus('idle')
      setIsThreeWayCall(false)
    }
  }

  const dialPad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          📞 Professional Phone Dialer
        </h2>
        <p className="text-gray-600">
          3-Way calling with shared dial tones - Both participants hear ringing
        </p>
        {isThreeWayCall && (
          <div className="mt-2 px-4 py-2 bg-green-100 text-green-800 rounded-full inline-block">
            🎉 3-Way Call Active - All participants can hear dial tones
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dialer Section */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center mb-4">
              <input
                type="text"
                value={currentNumber}
                onChange={(e) => setCurrentNumber(e.target.value)}
                className="text-2xl font-mono text-center bg-transparent border-none outline-none w-full"
                placeholder="Enter phone number"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {dialPad.map((row, i) => 
                row.map((digit) => (
                  <button
                    key={digit}
                    onClick={() => handleDigitPress(digit)}
                    className="aspect-square bg-white border-2 border-gray-300 rounded-lg text-xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    {digit}
                  </button>
                ))
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleCall}
                disabled={!currentNumber}
                className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                📞 Call
              </button>
              <button
                onClick={() => setCurrentNumber('')}
                className="px-4 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Call Controls */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Call Settings</h3>
            <label className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={dialToneEnabled}
                onChange={(e) => setDialToneEnabled(e.target.checked)}
                className="rounded"
              />
              <span>Enable Dial Tones (Shared in 3-way calls)</span>
            </label>
            
            {callStatus === 'active' && (
              <button
                onClick={() => handleHangup()}
                className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 mt-3"
              >
                📴 Hang Up All
              </button>
            )}
          </div>
        </div>

        {/* Active Calls Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Active Participants</h3>
          {participants.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">📵</div>
              <p>No active calls</p>
              <p className="text-sm">Dial a number to start a call</p>
            </div>
          ) : (
            <div className="space-y-3">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    participant.status === 'connected' 
                      ? 'bg-green-50 border-green-300' 
                      : participant.status === 'ringing'
                      ? 'bg-yellow-50 border-yellow-300 animate-pulse'
                      : participant.status === 'dialing'
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{participant.name}</div>
                      <div className="text-gray-600 font-mono">{participant.number}</div>
                      <div className="text-sm flex items-center space-x-1">
                        <span>
                          {participant.status === 'dialing' && '⏳ Dialing...'}
                          {participant.status === 'ringing' && '🔔 Ringing...'}
                          {participant.status === 'connected' && '✅ Connected'}
                          {participant.status === 'disconnected' && '❌ Disconnected'}
                        </span>
                        {participant.status === 'ringing' && dialToneEnabled && (
                          <span className="text-xs text-blue-600">(Dial tone shared)</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {participant.status === 'connected' && (
                        <button
                          onClick={() => handleHangup(participant.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Hang Up
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {isThreeWayCall && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-300 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-1">🎯 3-Way Call Features</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• All participants hear each other</li>
                <li>• Shared dial tones when adding new callers</li>
                <li>• Everyone hears ringing when connecting new participants</li>
                <li>• Professional conference calling experience</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Integration Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">🔌 Platform Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-900">GoTo Connect</h4>
            <p className="text-gray-600">Enterprise VoIP with 3-way calling API</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Go High Level</h4>
            <p className="text-gray-600">CRM integrated telephony with conference features</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * This is a demo interface. Real integration requires API keys and platform configuration.
        </p>
      </div>
    </div>
  )
}
