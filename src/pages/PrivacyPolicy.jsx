import React from 'react';
import { ArrowRight, Lock, Shield, Trash2, Bell, Code } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-blue-100 text-lg">Last Updated: November 24, 2025</p>
          <p className="text-blue-100 mt-2">Your privacy is our priority. Learn how NagTask protects your data.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Introduction */}
        <div className="mb-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <p className="text-gray-800 text-lg leading-relaxed">
            <strong>NagTask</strong> ("we", "our", or "us") is a personal productivity and reminder application designed to help users manage tasks through smart persistent notifications. This Privacy Policy explains how NagTask handles user data, notifications, permissions, and device information.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            We respect your privacy and ensure complete transparency in how your data is managed.
          </p>
        </div>

        {/* Section 1: Information We Collect */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">1. Information We Collect</h2>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg mb-6 border border-green-200">
            <p className="text-gray-800 font-semibold text-lg mb-4">
              NagTask is designed with privacy-first architecture.
            </p>
            <p className="text-gray-700 text-base font-bold text-green-700 mb-4">
              ✔ We DO NOT collect, store, share, or upload any personal data to any server.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-bold text-red-800 mb-4">❌ We DO NOT Collect:</h3>
              <ul className="space-y-3">
                {['Your name', 'Your email', 'Phone number', 'Contacts', 'Location', 'Files', 'Photos', 'Any sensitive data'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
              <h3 className="text-xl font-bold text-amber-800 mb-4">⚠️ Additional Privacy Measures:</h3>
              <ul className="space-y-3">
                {['No analytics tracking', 'No behavioral tracking', 'No advertisements', 'No third-party cookies', 'No profiling', 'No data selling'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="text-amber-600 font-bold mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Data Stored on Your Device */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-600 p-3 rounded-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">2. Data Stored on Your Device</h2>
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            All your task-related data is stored locally on your device through AsyncStorage. The app stores the following information only on your device:
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg border border-purple-200 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Task Title',
                'Description',
                'Due Date & Time',
                'Status (pending, completed, overdue)',
                'Nag Mode status',
                'Notification ID',
                'Reminder interval',
                'Reminder count',
                'Timestamps (created, updated, completed)',
                'App settings (theme, intervals)'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="font-bold text-green-900 mb-4 text-lg">🔐 Local-Only Storage</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span> No cloud storage
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span> No external database
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span> No third-party data sharing
              </li>
            </ul>
          </div>

          <div className="mt-6 bg-slate-100 p-6 rounded-lg">
            <p className="font-semibold text-gray-900 mb-3">Your data is deleted automatically when:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-gray-600" />
                You uninstall the app
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-gray-600" />
                You clear app data manually
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: How We Use Data */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">3. How We Use Data</h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            The data stored in NagTask is used only for functionality, such as:
          </p>

          <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
            <div className="space-y-4">
              {[
                'Scheduling notifications (Expo Notifications)',
                'Checking task completion status',
                'Triggering persistent reminders',
                'Organizing tasks (pending, completed, overdue)',
                'Displaying your dashboard and task list'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
                  <span className="text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-700 mt-6 font-semibold text-lg">
            ➜ No data is ever transmitted to us or third parties.
          </p>
        </section>

        {/* Section 4: Permissions */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-600 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">4. Permissions We Use and Why</h2>
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            NagTask requires certain permissions only for core app functionality.
          </p>

          <div className="bg-orange-50 p-8 rounded-lg border-l-4 border-orange-600">
            <h3 className="text-2xl font-bold text-orange-900 mb-4">🔔 Notification Permission</h3>
            <p className="text-gray-800 font-semibold mb-4">Used to:</p>
            <ul className="space-y-3">
              {[
                'Send initial reminders',
                'Send persistent "nag" notifications',
                'Trigger overdue reminders'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700">
                  <span className="text-orange-600 font-bold">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-800 mt-6 font-semibold text-lg">
              ⚠️ We never send notifications without user consent.
            </p>
          </div>
        </section>

        {/* Section 5: Third-Party Services */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-600 p-3 rounded-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">5. Third-Party Services</h2>
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            NagTask uses the following open-source libraries:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h3 className="font-bold text-indigo-900 mb-3">✓ Libraries Used:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Expo Notifications</li>
                <li>• AsyncStorage</li>
                <li>• React Native DateTimePicker</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4 italic">
                These libraries do NOT access or upload your personal data.
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="font-bold text-red-900 mb-3">❌ NagTask Does NOT Use:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Firebase</li>
                <li>• Google Analytics</li>
                <li>• Crashlytics</li>
                <li>• Ad networks</li>
                <li>• Cloud servers</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-600 text-gray-700">
            <p><strong>Note:</strong> Unless added in future updates.</p>
          </div>
        </section>

        {/* Section 6: Children's Privacy */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Children's Privacy</h2>
          
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <p className="text-gray-800 leading-relaxed">
              NagTask does not collect personal data and is safe for all ages. However, it is not specifically targeted toward children under 13.
            </p>
          </div>
        </section>

        {/* Section 7: Data Security */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-600 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">7. Data Security</h2>
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Although all data stays on your device, we ensure safety by:
          </p>

          <div className="bg-green-50 p-8 rounded-lg border border-green-200">
            <div className="space-y-4">
              {[
                'Using secure AsyncStorage',
                'Not storing passwords or sensitive information',
                'Not connecting to any remote server'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-800 mt-6 font-semibold text-lg">
            Your privacy is fully controlled by you.
          </p>
        </section>

        {/* Section 8: Data Deletion */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-600 p-3 rounded-lg">
              <Trash2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">8. Data Deletion</h2>
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            You can delete your data anytime by:
          </p>

          <div className="bg-red-50 p-8 rounded-lg border border-red-200 mb-6">
            <ul className="space-y-4">
              {[
                'Deleting tasks manually inside the app',
                'Clearing app storage',
                'Uninstalling the app (removes all data automatically)'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-800">
                  <span className="text-red-600 font-bold text-lg">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600">
            <p className="text-gray-800">
              <strong>Important:</strong> We cannot recover your data, because we do not store anything on servers.
            </p>
          </div>
        </section>

        {/* Section 9: Policy Changes */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Changes to This Privacy Policy</h2>
          
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-4">
            <p className="text-gray-800 leading-relaxed mb-4">
              We may update this Privacy Policy when adding new features such as:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-blue-600" />
                Cloud sync
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-blue-600" />
                Task sharing
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-blue-600" />
                User accounts
              </li>
            </ul>
          </div>

          <p className="text-gray-700 font-semibold">
            Any update will be shown inside the app or published online.
          </p>
        </section>

        {/* Section 10: Contact Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">10. Contact Us</h2>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
            <p className="mb-6 text-lg">
              If you have any questions, suggestions, or concerns about this Privacy Policy, you may contact us at:
            </p>
            <div className="text-2xl font-bold mb-2">
              📧 Email: <a href="mailto:logisaar@gmail.com" className="hover:underline">logisaar@gmail.com</a>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t-2 border-gray-200">
          <div className="bg-slate-50 p-6 rounded-lg text-center">
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>All data is present and stored locally on your device.</strong>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Last Updated: November 24, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component
function CheckIcon() {
  return (
    <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-sm font-bold">
      ✓
    </div>
  );
}
