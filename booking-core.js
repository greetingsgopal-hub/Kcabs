(function (global) {
  'use strict';

  const ROUTES = {
    kgm: { label: 'Kathgodam Railway Station', fares: { sedan: 1499, suv: 2199, crysta: 2999 }, distance: '38 km', duration: '~1 hr 30 mins' },
    pgh: { label: 'Pantnagar Airport', fares: { sedan: 2399, suv: 3399, crysta: 4499 }, distance: '72 km', duration: '~2 hrs 30 mins' },
    del: { label: 'Delhi NCR Doorstep', fares: { sedan: 5499, suv: 7499, crysta: 9899 }, distance: '310 km', duration: '~7 hrs' },
    ntl: { label: 'Nainital Mall Road / Tallital', fares: { sedan: 1199, suv: 1799, crysta: 2499 }, distance: '21 km', duration: '~45 mins' },
    bly: { label: 'Bareilly Junction', fares: { sedan: 3799, suv: 4999, crysta: 6899 }, distance: '145 km', duration: '~4 hrs' }
  };
  const DESTINATIONS = {
    kainchi: 'Kainchi Dham Ashram Gate', bhowali: 'Bhowali Sanatorium Junction',
    almora: 'Almora / Kasar Devi Ridge', mukteshwar: 'Mukteshwar Dham Circuit',
    jageshwar: 'Jageshwar Dham Heritage Temple'
  };
  const VEHICLES = {
    sedan: { checkout: 'DZIRE', name: 'Swift Dzire / Etios', capacity: 4, desc: 'Sedan • 4 Seater • AC' },
    suv: { checkout: 'ERTIGA', name: 'Maruti Ertiga MPV', capacity: 6, desc: 'Family MPV • 6 Seater • Hill Clearance' },
    crysta: { checkout: 'INNOVA', name: 'Toyota Innova Crysta', capacity: 7, desc: 'Premium MPV • 7 Seater • Captain Seats' }
  };
  const TRIPS = { oneway: { checkout: 'ONE_WAY', label: 'One Way', multiplier: 1 }, roundtrip: { checkout: 'ROUND_TRIP', label: 'Round Trip', multiplier: 1.8 }, daytour: { checkout: 'DAY_TOUR', label: 'Day Tour', multiplier: 2.2 } };

  const today = () => new Date().toISOString().slice(0, 10);
  const validDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') && !Number.isNaN(new Date(`${value}T00:00:00`).getTime()) && value >= today();
  const validTime = value => /^([01]\d|2[0-3]):[0-5]\d$/.test(value || '');
  const resolveByLabel = (map, value) => Object.keys(map).find(key => map[key].label === value || map[key] === value);
  const formatTime = value => {
    const [h, m] = value.split(':').map(Number); const suffix = h >= 12 ? 'PM' : 'AM';
    return `${String((h % 12) || 12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`;
  };
  const formatFare = amount => `₹${amount.toLocaleString('en-IN')}`;
  const fare = ({ pickup, vehicle, trip }) => {
    if (!ROUTES[pickup] || !VEHICLES[vehicle] || !TRIPS[trip]) return null;
    return Math.round(ROUTES[pickup].fares[vehicle] * TRIPS[trip].multiplier);
  };
  const validateBooking = booking => {
    const errors = [];
    if (!ROUTES[booking.pickup]) errors.push('pickup');
    if (!DESTINATIONS[booking.destination]) errors.push('destination');
    if (!VEHICLES[booking.vehicle]) errors.push('vehicle');
    if (!TRIPS[booking.trip]) errors.push('trip');
    if (!validDate(booking.date)) errors.push('date');
    if (!validTime(booking.time)) errors.push('time');
    const passengers = Number(booking.passengers || 2);
    if (!Number.isInteger(passengers) || passengers < 1 || passengers > 7) errors.push('passengers');
    return { valid: errors.length === 0, errors, booking: { ...booking, passengers } };
  };
  const fromSearch = search => {
    const p = new URLSearchParams(search);
    return { pickup: p.get('pickup'), destination: p.get('destination'), date: p.get('date'), time: p.get('time'), vehicle: p.get('vehicle'), trip: p.get('trip'), passengers: p.get('passengers') || '2', landmark: p.get('landmark') || '' };
  };
  global.BookingCore = { ROUTES, DESTINATIONS, VEHICLES, TRIPS, today, validDate, validTime, formatTime, formatFare, fare, validateBooking, fromSearch, resolveByLabel };
})(window);
