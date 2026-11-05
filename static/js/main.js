// Aurora Telemetry SaaS Landing Interactivity

document.addEventListener('DOMContentLoaded', () => {
  // 1. Pricing Toggle (Monthly vs Annual)
  const toggleBtn = document.getElementById('pricing-toggle');
  let isAnnual = false;

  const prices = {
    starter: { monthly: 29, annual: 23 },
    scale: { monthly: 89, annual: 71 },
    enterprise: { monthly: 'Custom', annual: 'Custom' }
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isAnnual = !isAnnual;
      toggleBtn.classList.toggle('active', isAnnual);

      const starterEl = document.getElementById('price-starter');
      const scaleEl = document.getElementById('price-scale');
      const periodEls = document.querySelectorAll('.billing-period');

      if (starterEl) {
        starterEl.textContent = isAnnual ? `$${prices.starter.annual}` : `$${prices.starter.monthly}`;
      }
      if (scaleEl) {
        scaleEl.textContent = isAnnual ? `$${prices.scale.annual}` : `$${prices.scale.monthly}`;
      }

      periodEls.forEach(el => {
        el.textContent = isAnnual ? '/ month (billed annually)' : '/ month (billed monthly)';
      });
    });
  }

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 3. Live Telemetry Stream Simulator
  const valRps = document.getElementById('stream-rps');
  const valP99 = document.getElementById('stream-p99');
  const valTokens = document.getElementById('stream-tokens');
  const valCost = document.getElementById('stream-cost');
  const logSpan = document.getElementById('stream-latest-span');

  const spanEndpoints = [
    'POST /v1/chat/completions (model: claude-3-5-sonnet)',
    'POST /v1/embeddings (batch_size: 64, dim: 1536)',
    'GET /v1/agents/memory-graph/search?k=5',
    'POST /v1/workflow/eval/guardrail-check',
    'POST /v1/rerank (items: 20, latency: 18ms)'
  ];

  function jitterTelemetry() {
    if (!valRps) return;
    const rps = Math.floor(14200 + Math.random() * 850);
    const p99 = (18.4 + (Math.random() * 2.2 - 1.1)).toFixed(1);
    const tokens = (4.82 + (Math.random() * 0.15 - 0.05)).toFixed(2);
    const cost = (0.0014 + (Math.random() * 0.0003 - 0.0001)).toFixed(4);

    valRps.textContent = `${rps.toLocaleString()} req/s`;
    valP99.textContent = `${p99} ms`;
    valTokens.textContent = `${tokens}M / hr`;
    valCost.textContent = `$${cost} / k`;

    const randomEndpoint = spanEndpoints[Math.floor(Math.random() * spanEndpoints.length)];
    if (logSpan) {
      logSpan.innerHTML = `<span>[TRACE] ${randomEndpoint}</span><span style="color: #34D399;">✓ 200 OK (${Math.floor(12 + Math.random() * 15)}ms)</span>`;
    }
  }

  // Run initial jitter
  jitterTelemetry();
  setInterval(jitterTelemetry, 3500);

  // 4. Interactive Ping Button
  const pingBtn = document.getElementById('trigger-ping-btn');
  if (pingBtn) {
    pingBtn.addEventListener('click', () => {
      pingBtn.textContent = 'Traced in 14.2ms ✓';
      pingBtn.style.background = '#10B981';
      jitterTelemetry();
      setTimeout(() => {
        pingBtn.textContent = 'Simulate Trace Ping';
        pingBtn.style.background = '';
      }, 1500);
    });
  }
});
