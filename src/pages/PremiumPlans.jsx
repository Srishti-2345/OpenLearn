function PremiumPlans({ isPremium = false, onSelectPlan = () => { }, onCancelSubscription = () => { }, onBack = () => { } }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 text-white">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-[var(--color-neonBlue)]">Choose Your Premium Plan</h1>
        <p className="mt-3 text-gray-300">
          Unlock Contribute access and advanced creator tools with a premium subscription.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-cyan-400/30 bg-[#071827] p-6 shadow-[0_0_25px_rgba(34,211,238,0.15)]">
          <p className="text-sm uppercase tracking-wider text-cyan-300">Monthly</p>
          <h2 className="mt-2 text-3xl font-bold">$9.99<span className="text-base font-medium text-gray-300"> / month</span></h2>
          <ul className="mt-5 space-y-2 text-sm text-gray-200">
            <li>Contribute tab access</li>
            <li>Create and upload challenges</li>
            <li>Priority visibility in community</li>
          </ul>
          <button
            className="mt-6 w-full rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 font-semibold text-cyan-200 hover:bg-cyan-500/20"
            onClick={() => onSelectPlan('monthly')}
          >
            {isPremium ? 'Switch to Monthly' : 'Buy Monthly'}
          </button>
        </div>

        <div className="rounded-2xl border border-emerald-400/40 bg-[#071f1a] p-6 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
          <p className="text-sm uppercase tracking-wider text-emerald-300">Yearly</p>
          <h2 className="mt-2 text-3xl font-bold">$79.99<span className="text-base font-medium text-gray-300"> / year</span></h2>
          <p className="mt-1 text-sm text-emerald-200">Best value: save 33%</p>
          <ul className="mt-5 space-y-2 text-sm text-gray-200">
            <li>Everything in Monthly</li>
            <li>Early access to new features</li>
            <li>Premium badge for profile</li>
          </ul>
          <button
            className="mt-6 w-full rounded-lg border border-emerald-400/50 bg-emerald-500/15 px-4 py-2 font-semibold text-emerald-200 hover:bg-emerald-500/25"
            onClick={() => onSelectPlan('yearly')}
          >
            {isPremium ? 'Switch to Yearly' : 'Buy Yearly'}
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        {isPremium && (
          <button
            className="rounded-lg border border-red-500/30 bg-red-500/5 px-6 py-2.5 text-sm font-medium text-red-400 opacity-60 transition-all hover:bg-red-500/10 hover:opacity-100 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            onClick={onCancelSubscription}
          >
            Cancel Subscription
          </button>
        )}
        <button
          className="rounded-lg border border-gray-500/40 bg-gray-500/10 px-8 py-2 text-sm font-medium text-gray-400 transition-all hover:bg-gray-500/20 hover:text-gray-200"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </section>
  )
}

export default PremiumPlans
