import { ImageResponse } from 'next/og';
import { canonicalBase } from '@/lib/site';

export function socialImage({ title, description, label = 'Selected work / Field notes' }: {
  title: string;
  description: string;
  label?: string;
}) {
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#f5f1e8', color: '#1c2029', padding: '48px 64px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #b9b8af', paddingBottom: 24 }}>
        <div style={{ display: 'flex', fontSize: 36, fontWeight: 700, letterSpacing: -2 }}>nikema<span style={{ color: '#315f88', marginLeft: 14 }}>/</span></div>
        <div style={{ fontSize: 22, color: '#545751' }}>works in progress</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
        <div style={{ fontSize: 18, color: '#315f88', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>{label}</div>
        <div style={{ fontSize: title.length > 65 ? 50 : 62, fontWeight: 700, letterSpacing: -2, lineHeight: 1.08, maxWidth: 1000 }}>{title}</div>
        <div style={{ width: 130, height: 5, background: '#315f88', marginTop: 22, marginBottom: 20, borderRadius: 4 }} />
        <div style={{ fontSize: 25, lineHeight: 1.4, color: '#545751', maxWidth: 1000 }}>{description}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #b9b8af', paddingTop: 20, fontSize: 18, color: '#545751' }}>
        <span>{new URL(canonicalBase()!).hostname}</span><span style={{ color: '#98442e' }}>Build. Test. Learn.</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
