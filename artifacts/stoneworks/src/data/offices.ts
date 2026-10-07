import { studio } from './gallery';

export const OFFICE_IDS = ['karachi', 'new-york', 'barcelona', 'kuala-lumpur', 'dubai'] as const;

export type OfficeId = (typeof OFFICE_IDS)[number];

export type OfficeRole = 'studio' | 'desk';

export type Office = {
  id: OfficeId;
  city: string;
  country: string;
  address: string;
  role: OfficeRole;
};

/** Neighbourhood-level desks. Karachi is the studio; no invented phones or emails. */
export const offices: readonly Office[] = [
  {
    id: 'karachi',
    city: 'Karachi',
    country: 'Pakistan',
    address: studio.address,
    role: 'studio',
  },
  {
    id: 'new-york',
    city: 'New York',
    country: 'United States',
    address: 'Long Island',
    role: 'desk',
  },
  {
    id: 'barcelona',
    city: 'Barcelona',
    country: 'Spain',
    address: 'Passeig de Gràcia',
    role: 'desk',
  },
  {
    id: 'kuala-lumpur',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    address: '',
    role: 'desk',
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    address: '',
    role: 'desk',
  },
];

export const studioOffice = offices.find((office) => office.role === 'studio')!;
export const internationalOffices = offices.filter((office) => office.role === 'desk');
