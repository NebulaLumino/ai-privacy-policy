"use client";

import { useState } from "react";

export default function PrivacyPolicy() {
  const [form, setForm] = useState({
    companyType: "",
    dataCollected: "",
    usersGeography: "",
    thirdParties: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="border-b border-teal-500/20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">AI Privacy Policy & DPA Generator</h1>
          </div>
          <p className="text-gray-400 text-sm">Generate privacy policies, DPAs, cookie policies, and CCPA/GDPR notices</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Company Type</label>
              <select
                name="companyType"
                value={form.companyType}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors"
              >
                <option value="">Select company type…</option>
                <option value="SaaS / B2B Tech">SaaS / B2B Tech</option>
                <option value="E-Commerce / Retail">E-Commerce / Retail</option>
                <option value="Mobile App (Consumer)">Mobile App (Consumer)</option>
                <option value="FinTech">FinTech</option>
                <option value="HealthTech / MedTech">HealthTech / MedTech</option>
                <option value="EdTech">EdTech</option>
                <option value="AdTech / MarTech">AdTech / MarTech</option>
                <option value="IoT / Hardware">IoT / Hardware</option>
                <option value="Marketplace">Marketplace</option>
                <option value="Media / Content Platform">Media / Content Platform</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Data Collected</label>
              <textarea
                name="dataCollected"
                value={form.dataCollected}
                onChange={handleChange}
                required
                rows={4}
                placeholder="e.g. Name, email, phone, billing address, IP address, device IDs&#10;Payment card info (via Stripe)&#10;Usage analytics (page views, clicks, session duration)&#10;Location data (coarse, city-level)&#10;Social media handles&#10;Health/fitness data (if applicable)..."
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Users Geography</label>
              <textarea
                name="usersGeography"
                value={form.usersGeography}
                onChange={handleChange}
                required
                rows={2}
                placeholder="e.g. Primarily US users; EU/UK users (~15%); some Canada and Australia users..."
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Third-Party Services</label>
              <textarea
                name="thirdParties"
                value={form.thirdParties}
                onChange={handleChange}
                required
                rows={3}
                placeholder="e.g. AWS (cloud hosting), Stripe (payments), Google Analytics, Intercom (support), Segment (data pipeline), Twilio (SMS), Mixpanel (analytics), Meta Pixel, TikTok Pixel..."
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors resize-none"
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-xl px-4 py-3 text-red-300 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Generating Privacy Documents…
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Generate Privacy Suite
                </>
              )}
            </button>
          </form>

          <div>
            {loading && (
              <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  <svg className="animate-spin w-10 h-10 text-teal-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Drafting privacy policy and compliance documents…</p>
              </div>
            )}

            {!loading && !result && !error && (
              <div className="bg-gray-800/20 border border-dashed border-gray-700 rounded-xl p-12 text-center">
                <div className="text-4xl mb-4">🔒📋</div>
                <p className="text-gray-500 text-sm">Privacy policy, DPA, and notices will appear here</p>
              </div>
            )}

            {result && (
              <div className="bg-gray-800/40 border border-teal-500/30 rounded-xl">
                <div className="px-5 py-3 border-b border-gray-700 flex items-center justify-between">
                  <span className="text-sm font-semibold text-teal-400">Privacy Suite</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <div className="px-5 py-4 overflow-auto max-h-[600px]">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {result}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
