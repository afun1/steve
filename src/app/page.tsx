import { textingPlatforms, voiceServicePlatforms, esimProviders } from './data/platforms';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Texting & Voice Platform Comparison
          </h1>
          <p className="mt-2 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Compare texting and voice platforms with focus on custom &quot;from&quot; numbers, pricing, eSIM support, and business features. Perfect for switching from Google Workspace Voice or finding alternatives.
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

      {/* Voice Services Comparison Table */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Voice Service Platform Comparison</h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Compare voice calling platforms - perfect for switching from Google Workspace Voice or finding alternatives to traditional phone services.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-4 sm:mx-6 lg:mx-8">
          <div className="overflow-x-auto pr-10">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider w-32">
                    Voice Platform
                  </th>
                  <th className="px-3 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider w-40">
                    Custom Numbers
                  </th>
                  <th className="px-3 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider w-44">
                    Call Quality & eSIM
                  </th>
                  <th className="px-3 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Pricing & Plans
                  </th>
                  <th className="px-3 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Pros & Cons
                  </th>
                  <th className="px-3 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider pr-10">
                    Business Features
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {voiceServicePlatforms.map((platform, index) => (
                  <tr key={platform.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-3 py-4 w-32">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 break-words leading-tight">{platform.name}</h3>
                        <a 
                          href={platform.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-xs break-words"
                        >
                          Visit Website
                        </a>
                      </div>
                    </td>
                    
                    <td className="px-3 py-4 w-40">
                      <div className="space-y-1">
                        <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          platform.customNumber.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {platform.customNumber.available ? 'Available' : 'No'}
                        </div>
                        <p className="text-xs text-gray-600 leading-tight break-words">{platform.customNumber.details}</p>
                        {platform.customNumber.cost && (
                          <p className="text-xs font-medium text-gray-900 break-words">{platform.customNumber.cost}</p>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-3 py-4 w-44">
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-900 break-words">
                          {platform.callQuality}
                        </div>
                        <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          platform.esimSupport.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          eSIM: {platform.esimSupport.available ? 'Yes' : 'No'}
                        </div>
                        <p className="text-xs text-gray-600 leading-tight break-words">{platform.esimSupport.details}</p>
                      </div>
                    </td>
                    
                    <td className="px-3 py-4">
                      <div className="space-y-2">
                        {platform.pricing.freeTier && (
                          <div className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            Free Tier
                          </div>
                        )}
                        {platform.pricing.plans.map((plan, planIndex) => (
                          <div key={planIndex} className="border rounded-lg p-2 bg-gray-50">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold text-gray-900 text-sm break-words">{plan.name}</h4>
                              <span className="font-bold text-gray-900 text-sm break-words">{plan.price}</span>
                            </div>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {plan.features.slice(0, 3).map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start">
                                  <span className="text-green-500 mr-1 flex-shrink-0">•</span>
                                  <span className="break-words">{feature}</span>
                                </li>
                              ))}
                              {plan.features.length > 3 && (
                                <li className="text-gray-400 text-xs">+{plan.features.length - 3} more</li>
                              )}
                            </ul>
                          </div>
                        ))}
                        {platform.pricing.additionalCosts && (
                          <div className="text-xs text-red-600">
                            <strong>Additional Costs:</strong>
                            <ul className="mt-1">
                              {platform.pricing.additionalCosts.slice(0, 2).map((cost, costIndex) => (
                                <li key={costIndex} className="text-xs break-words">• {cost}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-3 py-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-green-700 mb-1 text-sm">Pros:</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {platform.pros.slice(0, 3).map((pro, proIndex) => (
                              <li key={proIndex} className="flex items-start">
                                <span className="text-green-500 mr-1 flex-shrink-0">+</span>
                                <span className="break-words">{pro}</span>
                              </li>
                            ))}
                            {platform.pros.length > 3 && (
                              <li className="text-gray-400 text-xs">+{platform.pros.length - 3} more</li>
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-700 mb-1 text-sm">Cons:</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {platform.cons.slice(0, 3).map((con, conIndex) => (
                              <li key={conIndex} className="flex items-start">
                                <span className="text-red-500 mr-1 flex-shrink-0">-</span>
                                <span className="break-words">{con}</span>
                              </li>
                            ))}
                            {platform.cons.length > 3 && (
                              <li className="text-gray-400 text-xs">+{platform.cons.length - 3} more</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-4 pr-10">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm break-words">Business Features:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {platform.businessFeatures.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <span className="text-blue-500 mr-1 flex-shrink-0">•</span>
                              <span className="break-words">{feature}</span>
                            </li>
                          ))}
                        </ul>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Google Workspace Voice Alternatives</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <strong>RingCentral:</strong> Similar enterprise features, better integrations
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <strong>GoTo Connect:</strong> User-friendly with good video integration
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <strong>Vonage:</strong> Strong international presence and API platform
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <strong>8x8:</strong> More affordable with good call center features
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <strong>Zoom Phone:</strong> Great if already using Zoom ecosystem
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <strong>Google Voice Personal:</strong> Free alternative for simple needs
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
                  <strong>Data-Only:</strong> Perfect for app-based texting/voice services
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Texting & Voice Platform Comparison. Built with Next.js and Tailwind CSS.</p>
          <p className="mt-2 text-gray-400 text-sm">
            Information is subject to change. Please verify current pricing and features with each provider.
          </p>
        </div>
      </footer>
    </main>
  );
}
