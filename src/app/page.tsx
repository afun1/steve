import PhoneDialer from '../components/PhoneDialer';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            📞 CommuCore Phone Dialer
          </h1>
          <p className="mt-2 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Professional 3-way calling with shared dial tones. Perfect for business calls where all participants need to hear connection status.
          </p>
          <div className="flex justify-center mt-4">
            <Link 
              href="/compare" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📊 Compare Voice Platforms
            </Link>
          </div>
        </div>
      </header>

      {/* Phone Dialer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PhoneDialer />
      </section>
    </main>
  );
}
