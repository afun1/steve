import { textingPlatforms, esimProviders } from './data/platforms';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Texting Platform Comparison
          </h1>
          <p className="mt-2 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Compare texting platforms with focus on custom &quot;from&quot; numbers, pricing, eSIM support, and features.
          </p>
        </div>
      </header>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Platform
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Custom From Number
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                    eSIM Support
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Pricing
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Pros & Cons
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {textingPlatforms.map((platform, index) => (
                  <tr key={platform.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
                        <a 
                          href={platform.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Visit Website
                        </a>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          platform.customFromNumber.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {platform.customFromNumber.available ? 'Available' : 'Not Available'}
                        </div>
                        <p className="text-sm text-gray-600">{platform.customFromNumber.details}</p>
                        {platform.customFromNumber.cost && (
                          <p className="text-sm font-medium text-gray-900">Cost: {platform.customFromNumber.cost}</p>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          platform.esimSupport.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {platform.esimSupport.available ? 'Supported' : 'Not Supported'}
                        </div>
                        <p className="text-sm text-gray-600">{platform.esimSupport.details}</p>
                        {platform.esimSupport.providers && (
                          <div className="text-sm text-gray-500">
                            Providers: {platform.esimSupport.providers.join(', ')}
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-3">
                        {platform.pricing.freeTier && (
                          <div className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            Free Tier Available
                          </div>
                        )}
                        {platform.pricing.plans.map((plan, planIndex) => (
                          <div key={planIndex} className="border rounded-lg p-3 bg-gray-50">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                              <span className="font-bold text-gray-900">{plan.price}</span>
                            </div>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start">
                                  <span className="text-green-500 mr-2">•</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {platform.pricing.additionalCosts && (
                          <div className="text-sm text-red-600">
                            <strong>Additional Costs:</strong>
                            <ul className="mt-1 space-y-1">
                              {platform.pricing.additionalCosts.map((cost, costIndex) => (
                                <li key={costIndex}>• {cost}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {platform.pros.map((pro, proIndex) => (
                              <li key={proIndex} className="flex items-start">
                                <span className="text-green-500 mr-2">+</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {platform.cons.map((con, conIndex) => (
                              <li key={conIndex} className="flex items-start">
                                <span className="text-red-500 mr-2">-</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* eSIM Providers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular eSIM Data Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {esimProviders.map((provider, index) => (
            <div key={provider.name} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{provider.name}</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Coverage:</span>
                  <span className="text-gray-600 ml-1">{provider.coverage}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Data Plans:</span>
                  <span className="text-gray-600 ml-1">{provider.dataPlans}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Features:</span>
                  <ul className="mt-1 space-y-1">
                    {provider.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a 
                href={provider.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Visit Website
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Key Considerations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Considerations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom &quot;From&quot; Numbers</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <strong>True Virtual Numbers:</strong> Google Voice, TextNow, Sideline provide actual phone numbers
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <strong>Device-Based:</strong> MightyText uses your existing phone number
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <strong>Programmable:</strong> Twilio offers the most flexibility for developers
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">eSIM Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>No Physical SIM:</strong> Instant activation and switching
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>Multiple Plans:</strong> Have multiple carriers on one device
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>Travel-Friendly:</strong> Easy international data access
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>Data-Only:</strong> Perfect for app-based texting services
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Texting Platform Comparison. Built with Next.js and Tailwind CSS.</p>
          <p className="mt-2 text-gray-400 text-sm">
            Information is subject to change. Please verify current pricing and features with each provider.
          </p>
        </div>
      </footer>
    </main>
  );
}
