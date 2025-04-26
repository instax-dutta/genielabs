// This component renders a 'Powered by Mistral' badge with the Mistral logo and accessible text.
export default function PoweredByMistral() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2 text-white/90 text-lg font-semibold" style={{ fontFamily: 'inherit' }}>
      <span className="font-bold">Powered by</span>
      <img src="https://docs.mistral.ai/img/logo-dark.svg" alt="Mistral AI logo" className="h-6 w-auto ml-2" style={{ display: 'inline' }} />
    </div>
  )
}
