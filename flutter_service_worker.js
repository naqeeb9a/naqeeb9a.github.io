'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "be5f94b02679f6c04a37352b2bbac1f6",
"index.html": "9e8883ea4abe9c6f5262be57f5deb466",
"/": "9e8883ea4abe9c6f5262be57f5deb466",
"main.dart.js": "e43133874e36c9a5ac2f7425bb43ab99",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "1738c089a126a565df510dd836d65f5a",
"assets/AssetManifest.json": "9ca01cc06661766fd2fac287e03ef998",
"assets/NOTICES": "9ff84fa47584f162e3135b6fca5e3132",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "515cc3290561892defd3f4f0a6abf365",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "a0ed5c05d4e4b4d7676fe430bd67b62f",
"assets/fonts/MaterialIcons-Regular.otf": "32fce58e2acb9c420eab0fe7b828b761",
"assets/assets/himalayan1.png": "4f4af0d091111bd98d7342a40b4dfb73",
"assets/assets/himalayan3.png": "7bddbddcb17c80f06106958e3ed7582b",
"assets/assets/himalayan2.png": "040518cc99edfa1fbfa2ad43fd723151",
"assets/assets/himalayan6.png": "8eeaca290f26725e1a77a9e06942a5ee",
"assets/assets/himalayan5.png": "ef92d522f2b841dd93ffcf8dc1cf52ed",
"assets/assets/himalayan4.png": "98101e966fbdc0c0fa051d7e174a6131",
"assets/assets/vernacular6.png": "be9473289801f6efd6a84688da44184d",
"assets/assets/timber6.png": "b60e04f60a0769d3e54dc9c767442bbe",
"assets/assets/map.png": "7b65030f56bb9038ae424ef721559687",
"assets/assets/timber4.png": "0bd810991ed464dde6abe3360e8432d9",
"assets/assets/vernacular4.png": "533e52ac7d6477078c4ae5f92b5536ca",
"assets/assets/vernacular5.png": "c19105e4cacbe27531bdec8be62ece45",
"assets/assets/timber5.png": "9a3eae8c6de52ddf2e2f1cbb1f367176",
"assets/assets/ccl_logo.png": "1771eb1ac470ad8a37f613b0f7f8f308",
"assets/assets/vernacular1.png": "e33ee48461423a260607991286ce93e7",
"assets/assets/timber1.png": "36c4e4f07f86e943454189fa4b96ec85",
"assets/assets/wood.png": "519c9571469ec716a1712ef7fceaed22",
"assets/assets/vernacular2.png": "21eef25182ff7c1b2d6bd01bbf4d9e76",
"assets/assets/timber2.png": "1656b13de984afd5460c2cba465a20a2",
"assets/assets/timber3.png": "452dbe7836e2674e088c1311133296ce",
"assets/assets/vernacular3.png": "7e97b71b9221507991df093eef217e00",
"assets/assets/earthing3.png": "01326cd2cb7ec9fb047accdccc369d44",
"assets/assets/earthing2.png": "167158c9fa72b2331203451a48a567c1",
"assets/assets/earthing1.png": "e57c5ce4664e2db301823891fdf077aa",
"assets/assets/image1.png": "ca0f376b64de47548fba066053cfdc2f",
"assets/assets/earthing5.png": "74517475c282c25ae70dd00b06a24891",
"assets/assets/earthing4.png": "1b8f10d9f229102ffb170a36dcd4b3f0",
"assets/assets/image2.png": "03983a0bb9aca049465a4b2b03c0c37d",
"assets/assets/earthing6.png": "7d401c6723294f249836b64c50d6b317",
"assets/assets/image3.png": "b1814f689961ac0f6ebcddf19d2f971b",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
