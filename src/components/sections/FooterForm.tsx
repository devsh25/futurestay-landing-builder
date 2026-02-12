'use client';

import { usePageStore } from '@/store/pageStore';

export default function FooterForm() {
  const section = usePageStore((s) => s.footer);
  const updateSection = usePageStore((s) => s.updateSection);

  const updateSocialLink = (platform: keyof typeof section.socialLinks, value: string) => {
    updateSection('footer', {
      socialLinks: { ...section.socialLinks, [platform]: value },
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Footer</h3>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
        <input
          type="text"
          value={section.phone}
          onChange={(e) => updateSection('footer', { phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input
          type="text"
          value={section.email}
          onChange={(e) => updateSection('footer', { email: e.target.value })}
          placeholder="contact@example.com"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Copyright Text</label>
        <input
          type="text"
          value={section.copyrightText}
          onChange={(e) => updateSection('footer', { copyrightText: e.target.value })}
          placeholder="© 2026 Company Name. All rights reserved."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="border-t border-slate-200 pt-4">
        <label className="block text-sm font-medium text-slate-700 mb-3">Social Links</label>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Facebook</label>
            <input
              type="text"
              value={section.socialLinks.facebook}
              onChange={(e) => updateSocialLink('facebook', e.target.value)}
              placeholder="https://facebook.com/yourpage"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Instagram</label>
            <input
              type="text"
              value={section.socialLinks.instagram}
              onChange={(e) => updateSocialLink('instagram', e.target.value)}
              placeholder="https://instagram.com/yourpage"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Twitter / X</label>
            <input
              type="text"
              value={section.socialLinks.twitter}
              onChange={(e) => updateSocialLink('twitter', e.target.value)}
              placeholder="https://twitter.com/yourpage"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">YouTube</label>
            <input
              type="text"
              value={section.socialLinks.youtube}
              onChange={(e) => updateSocialLink('youtube', e.target.value)}
              placeholder="https://youtube.com/yourchannel"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn</label>
            <input
              type="text"
              value={section.socialLinks.linkedin}
              onChange={(e) => updateSocialLink('linkedin', e.target.value)}
              placeholder="https://linkedin.com/company/yourcompany"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
