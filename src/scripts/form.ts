/**
 * Formulario cualificado.
 * - Sin JS: POST nativo al endpoint (o mailto si no hay endpoint).
 * - Con JS: validación inline accesible, estado de envío, éxito y error con alternativa directa.
 */

type FieldEl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const MESSAGES: Record<string, string> = {
  valueMissing: 'Este campo es necesario.',
  typeMismatch: 'Revisa el formato.',
  tooShort: 'Cuéntame un poco más (mínimo {min} caracteres).',
};

// Más estricto que el validador nativo, que acepta "ana@empresa".
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function messageFor(el: FieldEl) {
  const v = el.validity;
  if (v.valueMissing) return el.dataset.required ?? MESSAGES.valueMissing;
  if (v.typeMismatch || (el.type === 'email' && el.value && !EMAIL.test(el.value.trim())))
    return el.type === 'email' ? 'Escribe un email válido, por ejemplo nombre@empresa.com.' : MESSAGES.typeMismatch;
  if (v.tooShort) return MESSAGES.tooShort.replace('{min}', String((el as HTMLTextAreaElement).minLength));
  return '';
}

function setError(el: FieldEl, msg: string) {
  const field = el.closest('.field');
  const out = field?.querySelector<HTMLElement>('.field__error');
  el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  field?.classList.toggle('has-error', Boolean(msg));
  if (out) out.textContent = msg;
}

function validateGroup(group: HTMLFieldSetElement) {
  const min = Number(group.dataset.minChecked ?? 0);
  if (!min) return true;
  const checked = group.querySelectorAll('input:checked').length;
  const ok = checked >= min;
  group.classList.toggle('has-error', !ok);
  const out = group.querySelector<HTMLElement>('.field__error');
  if (out) out.textContent = ok ? '' : 'Elige al menos una opción (vale "No lo tengo claro").';
  return ok;
}

function normaliseUrl(value: string) {
  const v = value.trim();
  if (!v) return v;
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

export function initForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;

  const email = form.dataset.email ?? '';
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const success = document.querySelector<HTMLElement>('[data-form-success]');
  const fields = [...form.querySelectorAll<FieldEl>('input:not([type="checkbox"]):not([type="hidden"]), select, textarea')].filter(
    (f) => !f.closest('.hp'),
  );
  const groups = [...form.querySelectorAll<HTMLFieldSetElement>('fieldset[data-min-checked]')];

  form.noValidate = true;

  // Validación: al salir del campo y, si ya tenía error, mientras se corrige.
  fields.forEach((el) => {
    el.addEventListener('blur', () => {
      if (el.value !== '' || el.hasAttribute('aria-invalid')) setError(el, messageFor(el));
    });
    el.addEventListener('input', () => {
      if (el.getAttribute('aria-invalid') === 'true') setError(el, messageFor(el));
    });
  });
  groups.forEach((g) => g.addEventListener('change', () => g.classList.contains('has-error') && validateGroup(g)));

  const web = form.querySelector<HTMLInputElement>('input[name="web"]');
  web?.addEventListener('blur', () => {
    if (web.value) web.value = normaliseUrl(web.value);
  });

  // Contador de caracteres del problema.
  const problem = form.querySelector<HTMLTextAreaElement>('textarea[name="problema"]');
  const count = form.querySelector<HTMLElement>('[data-count]');
  problem?.addEventListener('input', () => {
    if (count) count.textContent = String(problem.value.length);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const invalid = fields.filter((el) => {
      const msg = messageFor(el);
      setError(el, msg);
      return Boolean(msg);
    });
    const groupsOk = groups.map(validateGroup).every(Boolean);

    if (invalid.length || !groupsOk) {
      const first = invalid[0] ?? groups.find((g) => g.classList.contains('has-error'))?.querySelector('input');
      first?.focus();
      if (status) {
        const n = invalid.length + (groupsOk ? 0 : 1);
        status.textContent = `Revisa ${n === 1 ? '1 campo' : `${n} campos`} antes de enviar.`;
        status.dataset.tone = 'error';
      }
      return;
    }

    const data = new FormData(form);
    if (data.get('_gotcha')) return; // honeypot

    const payload: Record<string, string> = {};
    for (const [k, v] of data.entries()) {
      if (k === '_gotcha' || k === '_next') continue;
      payload[k] = payload[k] ? `${payload[k]}, ${v}` : String(v);
    }

    const endpoint = form.dataset.endpoint ?? '';

    // Sin endpoint configurado: abrir el correo con todo rellenado.
    if (!endpoint) {
      const body = Object.entries(payload)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        `Quiero hablar de mi negocio — ${payload.empresa ?? ''}`,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    submit?.setAttribute('aria-busy', 'true');
    submit?.setAttribute('disabled', '');
    if (status) {
      status.textContent = 'Enviando…';
      status.dataset.tone = 'info';
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));

      form.hidden = true;
      if (success) {
        const name = success.querySelector<HTMLElement>('[data-success-name]');
        if (name) {
          const first = (payload.nombre ?? '').trim().split(/\s+/)[0];
          name.textContent = first ? `, ${first}` : '';
        }
        success.hidden = false;
        success.focus();
      }
    } catch {
      if (status) {
        status.innerHTML = '';
        status.append(
          'No se ha podido enviar. Tus datos siguen aquí: prueba otra vez o escríbeme directamente a ',
          Object.assign(document.createElement('a'), { href: `mailto:${email}`, textContent: email }),
          '.',
        );
        status.dataset.tone = 'error';
      }
    } finally {
      submit?.removeAttribute('aria-busy');
      submit?.removeAttribute('disabled');
    }
  });
}
