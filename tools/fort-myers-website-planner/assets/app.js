const form = document.querySelector('#planner-form');
const pageMap = document.querySelector('#page-map');
const summary = document.querySelector('#plan-summary');
const copyButton = document.querySelector('#copy-plan');
const copyStatus = document.querySelector('#copy-status');

const businessLabels = {
  'home-service': 'home-service',
  professional: 'professional-service',
  'health-wellness': 'health or wellness',
  b2b: 'B2B service'
};

const customerActions = {
  estimate: { task: 'request an estimate', summary: 'requesting an estimate' },
  call: { task: 'call the business', summary: 'generating phone calls' },
  appointment: { task: 'book an appointment', summary: 'booking an appointment' },
  consultation: { task: 'schedule a consultation', summary: 'scheduling a consultation' }
};

const areaPlans = {
  'fort-myers': {
    label: 'Fort Myers',
    pages: [{ title: 'Fort Myers service area', detail: 'Use truthful service-area information, local customer questions, and links to the relevant services.' }]
  },
  'fort-myers-cape-coral': {
    label: 'Fort Myers and Cape Coral',
    pages: [
      { title: 'Service areas overview', detail: 'Explain the operating area and help visitors choose their city without creating duplicate doorway pages.' },
      { title: 'Fort Myers service area', detail: 'Add city-relevant questions, service conditions, and links to the services people actually need.' },
      { title: 'Cape Coral service area', detail: 'Write distinct city context and keep claims limited to the real service area.' }
    ]
  },
  'southwest-florida': {
    label: 'multiple Southwest Florida cities',
    pages: [
      { title: 'Southwest Florida service areas', detail: 'Create one useful hub that explains coverage and routes visitors to supported cities.' },
      { title: 'Priority city pages', detail: 'Publish only cities with enough distinct demand, evidence, and customer context to deserve a page.' }
    ]
  }
};

function cleanServices(value) {
  const seen = new Set();
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => {
      const key = item.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 5);
}

function buildPlan(data) {
  const services = cleanServices(data.get('services'));
  const action = customerActions[data.get('customerAction')];
  const area = areaPlans[data.get('areaScope')];
  const business = businessLabels[data.get('businessType')];
  const servicePages = (services.length ? services : ['Primary service']).map((service) => ({
    title: service,
    detail: `Answer ${service.toLowerCase()} questions, show scope and evidence, and make it easy to ${action.task}.`
  }));

  return {
    summary: `A ${business} website focused on ${action.summary} across ${area.label}.`,
    pages: [
      { title: 'Homepage', detail: `Explain the strongest customer problem, the real service area, and the path to ${action.task}.` },
      { title: 'Services overview', detail: 'Help visitors compare needs and choose the right service before opening a detail page.' },
      ...servicePages,
      ...area.pages,
      { title: 'About and contact', detail: `Show who is responsible, how to ${action.task}, and what happens after the inquiry.` }
    ]
  };
}

function renderPlan(plan) {
  summary.textContent = plan.summary;
  pageMap.replaceChildren(...plan.pages.map((page) => {
    const item = document.createElement('li');
    const title = document.createElement('strong');
    const detail = document.createElement('span');
    title.textContent = page.title;
    detail.textContent = page.detail;
    item.append(title, detail);
    return item;
  }));
  copyStatus.textContent = '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPlan(buildPlan(new FormData(form)));
});

copyButton.addEventListener('click', async () => {
  const lines = [summary.textContent, '', ...Array.from(pageMap.children).map((item, index) => `${index + 1}. ${item.querySelector('strong').textContent} — ${item.querySelector('span').textContent}`)];
  try {
    await navigator.clipboard.writeText(lines.join('\n'));
    copyStatus.textContent = 'Plan copied to your clipboard.';
  } catch (error) {
    copyStatus.textContent = 'Copy is unavailable in this browser. Select the plan text manually.';
  }
});

const menuButton = document.querySelector('.hamburger');
const panel = document.querySelector('#mobile-panel');
const scrim = document.querySelector('.mobile-panel__scrim');
const panelLinks = Array.from(panel.querySelectorAll('a, button'));

function setMenu(open) {
  document.body.classList.toggle('nav-open', open);
  panel.classList.toggle('is-open', open);
  panel.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
  scrim.hidden = !open;
  requestAnimationFrame(() => scrim.classList.toggle('is-visible', open));
  panelLinks.forEach((element) => element.tabIndex = open ? 0 : -1);
  if (open) panel.querySelector('.mobile-panel__close').focus();
  else menuButton.focus();
}

menuButton.addEventListener('click', () => setMenu(true));
document.querySelectorAll('[data-nav-close]').forEach((element) => element.addEventListener('click', () => setMenu(false)));
panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && panel.classList.contains('is-open')) setMenu(false);
});
