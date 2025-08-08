import Link from 'next/link';

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Dialer
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-gray-900">
                Voice Platform Comparison
              </h1>
              <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
                Compare GoTo Connect and Go High Level for 3-way calling functionality
              </p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* GoTo vs GHL Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            🎯 Best Options for 3-Way Calling
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Focused comparison for your 3-way calling needs - both platforms support conference calling where participants can hear dial tones and ringing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* GoTo Connect */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">GoTo Connect</h3>
              <p className="text-gray-600">Enterprise VoIP Solution</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🎯 3-Way Calling Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Conference calling with up to 25 participants</li>
                  <li>• Shared dial tones during connection</li>
                  <li>• All participants hear ringing status</li>
                  <li>• Professional call management</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">💰 Pricing</h4>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">Basic Plan: $19/user/month</div>
                  <p className="text-xs text-gray-600">Unlimited calling, voicemail, mobile apps</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">✅ Best For</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Teams focused on calling & video</li>
                  <li>• Need reliable dial tone sharing</li>
                  <li>• Reliable enterprise-grade calling</li>
                  <li>• Professional 3-way calling</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">⚠️ Consider</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Focused on calling, limited CRM</li>
                  <li>• No marketing automation</li>
                  <li>• Separate system from sales tools</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Go High Level */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Go High Level</h3>
              <p className="text-gray-600">All-in-One CRM + Phone System</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🎯 3-Way Calling Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Conference calling with CRM integration</li>
                  <li>• Shared dial tones in multi-party calls</li>
                  <li>• Call recording with CRM sync</li>
                  <li>• Automated call logging</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">💰 Pricing</h4>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">Starter: $97/month</div>
                  <p className="text-xs text-gray-600">3 sub-accounts, CRM, calling, SMS, websites</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">✅ Best For</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Need CRM + calling integration</li>
                  <li>• Marketing automation required</li>
                  <li>• Multi-client agency work</li>
                  <li>• Complete business solution</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">⚠️ Consider</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Higher monthly cost</li>
                  <li>• Learning curve for full features</li>
                  <li>• May be overkill for simple calling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Decision Guide */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Quick Decision Guide for 3-Way Calling</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">Choose GoTo Connect if:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You primarily need reliable calling/video</li>
                <li>• Want professional 3-way calling features</li>
                <li>• Need shared dial tones for participants</li>
                <li>• Have existing CRM/business tools</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-900 mb-2">Choose Go High Level if:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• You need CRM + calling integration</li>
                <li>• Want call data synced with customer records</li>
                <li>• Need marketing automation too</li>
                <li>• Manage multiple clients/locations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Dialer */}
        <div className="text-center mt-8">
          <Link 
            href="/" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            📞 Try the Phone Dialer
          </Link>
        </div>
      </section>
    </main>
  );
}
