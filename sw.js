self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map(k => caches.delete(k)));
  const regs = await self.registration.unregister();
  const clientsArr = await self.clients.matchAll({ type: 'window' });
  clientsArr.forEach(c => c.navigate(c.url));
});
self.addEventListener('fetch', e => fetch(e.request));
