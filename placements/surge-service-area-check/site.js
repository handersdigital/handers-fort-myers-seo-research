const inputs = [...document.querySelectorAll('input[name="signal"]')];
const count = document.querySelector('[data-count]');
const status = document.querySelector('[data-status]');
const guidance = document.querySelector('[data-guidance]');

const messages = [
  ['Document the page before changing it.', 'Verify the service boundary, offer, proof, action path, and follow-up owner one at a time.'],
  ['One signal is visible.', 'Keep it, then work through the five missing handoffs instead of adding more location copy.'],
  ['Two signals are visible.', 'The page has a start, but a visitor still has to infer too much about relevance or the next step.'],
  ['Three signals are visible.', 'Half of the path is observable. Verify the remaining gaps on the live mobile journey.'],
  ['Four signals are visible.', 'The page explains most of the path. Test the two unchecked items with real evidence.'],
  ['Five signals are visible.', 'The page is close to a complete handoff. Confirm the final missing signal before expansion.'],
  ['All six signals are visible.', 'Preserve the evidence and re-check the page when the offer, service area, form, or follow-up process changes.']
];

function updateResult() {
  const total = inputs.filter((input) => input.checked).length;
  count.textContent = total;
  status.textContent = messages[total][0];
  guidance.textContent = messages[total][1];
}

inputs.forEach((input) => input.addEventListener('change', updateResult));
updateResult();
