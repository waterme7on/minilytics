// Dropdowns for a site's timezone and currency, so they can't be mistyped.
import { SelectDropdown } from './SelectDropdown';

const FALLBACK_TIMEZONES = ['UTC', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'America/New_York', 'America/Chicago', 'America/Los_Angeles', 'America/Sao_Paulo', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney'];

let timezones: { value: string; label: string }[] | undefined;

/** Every IANA timezone the browser knows, labelled with its current UTC offset ("Europe/Paris (GMT+1)"). */
function timezoneOptions() {
  if (timezones) return timezones;
  let names: string[];
  try {
    names = Intl.supportedValuesOf('timeZone');
  } catch {
    names = FALLBACK_TIMEZONES;
  }
  if (!names.includes('UTC')) names = ['UTC', ...names];
  const now = new Date();
  timezones = names.map((tz) => {
    const offset = new Intl.DateTimeFormat('en', { timeZone: tz, timeZoneName: 'shortOffset' }).formatToParts(now).find((p) => p.type === 'timeZoneName')?.value;
    return { value: tz, label: offset ? `${tz.replace(/_/g, ' ')} (${offset})` : tz };
  });
  return timezones;
}

export function TimezoneSelect({ value, onChange }: { value: string; onChange: (tz: string) => void }) {
  const options = timezoneOptions();
  // Keep a saved value the browser doesn't list (old alias like "Asia/Calcutta").
  const list = options.some((o) => o.value === value) ? options : [{ value, label: value }, ...options];
  return (
    <SelectDropdown
      ariaLabel="Timezone"
      value={value}
      options={list}
      onChange={onChange}
      className="w-full"
      buttonClassName="input"
      align="right"
    />
  );
}

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD', 'SGD', 'JPY', 'BRL'];

export function CurrencySelect({ value, onChange }: { value: string; onChange: (currency: string) => void }) {
  const options = CURRENCIES.map((code) => ({ value: code, label: code }));
  const list = options.some((o) => o.value === value) ? options : [{ value, label: value }, ...options];
  return (
    <SelectDropdown
      ariaLabel="Revenue currency"
      value={value}
      options={list}
      onChange={onChange}
      className="w-full"
      buttonClassName="input"
      align="right"
    />
  );
}
