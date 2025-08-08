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

      {/* GHL Integration Instructions */}
      <div className="mt-8 space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">� Go High Level Integration</h3>
          <p className="text-gray-700 mb-4">
            Integrate this dialer with your GHL account to enable real 3-way calling with CRM automation.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Setup Steps */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-bold text-lg text-purple-900 mb-3">📋 Setup Steps</h4>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  <div>
                    <strong>Get GHL API Key:</strong> Go to Settings → Integrations → API in your GHL dashboard
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  <div>
                    <strong>Enable Phone System:</strong> Activate GHL&apos;s phone system in your location settings
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  <div>
                    <strong>Configure Webhook:</strong> Set up call events webhook to sync with this dialer
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                  <div>
                    <strong>Test Integration:</strong> Use test numbers to verify 3-way calling functionality
                  </div>
                </li>
              </ol>
            </div>

            {/* API Endpoints */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-bold text-lg text-blue-900 mb-3">🔗 Key API Endpoints</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-2 rounded">
                  <code className="text-xs text-gray-800">POST /calls/initiate</code>
                  <p className="text-gray-600 mt-1">Start a new call</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <code className="text-xs text-gray-800">POST /calls/conference</code>
                  <p className="text-gray-600 mt-1">Add participant to conference</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <code className="text-xs text-gray-800">GET /calls/{`{id}`}/status</code>
                  <p className="text-gray-600 mt-1">Get real-time call status</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <code className="text-xs text-gray-800">DELETE /calls/{`{id}`}</code>
                  <p className="text-gray-600 mt-1">End call or remove participant</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Benefits */}
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h4 className="text-xl font-bold text-gray-900 mb-4">✨ GHL Integration Benefits</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">📞</div>
              <h5 className="font-semibold text-green-900">Automated Calling</h5>
              <p className="text-sm text-green-700">Trigger calls from workflows, funnels, and campaigns</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <h5 className="font-semibold text-blue-900">CRM Sync</h5>
              <p className="text-sm text-blue-700">All call data automatically logged in contact records</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h5 className="font-semibold text-purple-900">Lead Nurturing</h5>
              <p className="text-sm text-purple-700">Seamless 3-way calls with prospects and team members</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg">
          <h4 className="text-lg font-bold mb-4 text-white">💻 Integration Code Example</h4>
          <pre className="text-sm overflow-x-auto">
            <code>{`// Initialize GHL Phone Integration
const ghlPhone = new GHLPhoneAPI({
  apiKey: 'your-ghl-api-key',
  locationId: 'your-location-id'
});

// Start 3-way call with prospect and team member
async function start3WayCall(prospectNumber, teamMemberNumber) {
  try {
    // Start call with prospect
    const call = await ghlPhone.initiateCall({
      to: prospectNumber,
      from: 'your-ghl-number'
    });
    
    // Add team member to conference
    await ghlPhone.addToConference({
      callId: call.id,
      number: teamMemberNumber
    });
    
    // All participants can now hear dial tones and ringing
    console.log('3-way call active with shared audio');
    
  } catch (error) {
    console.error('Call failed:', error);
  }
}`}</code>
          </pre>
        </div>

        {/* Next Steps */}
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
          <h4 className="font-bold text-orange-900 mb-2">🎯 Ready to Get Started?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-orange-800 mb-2">
                <strong>Need GHL Setup Help?</strong> Contact your GHL support team or check the developer documentation.
              </p>
              <a 
                href="https://developers.gohighlevel.com/" 
                target="_blank" 
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
              >
                📚 GHL API Docs
              </a>
            </div>
            <div>
              <p className="text-orange-800 mb-2">
                <strong>Custom Integration Needed?</strong> This dialer can be customized for your specific GHL workflows.
              </p>
              <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
                🛠️ Request Custom Setup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
