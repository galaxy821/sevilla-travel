import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

/* ── Tile helpers ─────────────────────────────────────────────────────── */
const TILE_SIZE = 256;
const tileUrl = (z, x, y) =>
  `https://basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}.png`;

function lon2f(lon, z) { return ((lon + 180) / 360) * Math.pow(2, z); }
function lat2f(lat, z) {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * Math.pow(2, z);
}

async function buildTileCanvas({ minLat, maxLat, minLon, maxLon }, zoom) {
  const tXs = Math.floor(lon2f(minLon, zoom));
  const tXe = Math.ceil(lon2f(maxLon, zoom));
  const tYs = Math.floor(lat2f(maxLat, zoom)); // north = small y
  const tYe = Math.ceil(lat2f(minLat, zoom));  // south = large y
  const nX = tXe - tXs, nY = tYe - tYs;

  const canvas = document.createElement('canvas');
  canvas.width = nX * TILE_SIZE;
  canvas.height = nY * TILE_SIZE;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f5ede6'; ctx.fillRect(0, 0, canvas.width, canvas.height);

  await Promise.all(
    Array.from({ length: nX }, (_, xi) =>
      Array.from({ length: nY }, (_, yi) =>
        new Promise((res) => {
          const img = new window.Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => { ctx.drawImage(img, xi * TILE_SIZE, yi * TILE_SIZE); res(); };
          img.onerror = res;
          img.src = tileUrl(zoom, tXs + xi, tYs + yi);
        })
      )
    ).flat()
  );

  return { canvas, tXs, tYs, nX, nY };
}

// lat/lon → normalised [0..1] on the canvas
function toNorm(lat, lon, zoom, tXs, tYs, nX, nY) {
  return { nx: (lon2f(lon, zoom) - tXs) / nX, ny: (lat2f(lat, zoom) - tYs) / nY };
}
// norm → position on a plane of size (PW × PH) centred at origin
function toPlane(nx, ny, PW, PH) {
  return { x: (nx - 0.5) * PW, y: -(ny - 0.5) * PH };
}

/* ── Static data ──────────────────────────────────────────────────────── */
const VIEWS = {
  city: {
    bounds: { minLat: 37.348, maxLat: 37.422, minLon: -6.030, maxLon: -5.945 },
    zoom: 14,
  },
  regional: {
    bounds: { minLat: 35.8, maxLat: 38.5, minLon: -7.5, maxLon: -2.8 },
    zoom: 8,
  },
};

const CITY_PINS = [
  { id: 'mushroom',   name: 'MUSH ROOM APARTAMENTOS', emoji: '🏨', cat: 'accommodation', lat: 37.3886, lon: -5.9945, hex: 0xC65D3E, desc: '세비야 최고 가성비 숙소' },
  { id: 'espana',     name: '스페인 광장',              emoji: '🏛️', cat: 'attraction',    lat: 37.3774, lon: -5.9867, hex: 0x3D9B6A, desc: '세비야 대표 랜드마크 · 무료' },
  { id: 'setas',      name: '메트로폴 파라솔',           emoji: '🍄', cat: 'attraction',    lat: 37.3928, lon: -5.9923, hex: 0x3D9B6A, desc: '라스 세타스 · 전망대' },
  { id: 'catedral',   name: '세비야 대성당',             emoji: '⛪', cat: 'attraction',    lat: 37.3856, lon: -5.9928, hex: 0x3D9B6A, desc: '세계 최대 고딕 성당' },
  { id: 'alcazar',    name: '알카사르',                 emoji: '👑', cat: 'attraction',    lat: 37.3834, lon: -5.9902, hex: 0x3D9B6A, desc: '무데하르 양식 왕궁' },
  { id: 'bendala',    name: 'Bendala Braseria',         emoji: '🍽️', cat: 'restaurant',    lat: 37.3841, lon: -5.9836, hex: 0xD4A04A, desc: '참치 타르타르 · €20~30' },
  { id: 'delicias',   name: 'Uno de Delicias',          emoji: '🍔', cat: 'restaurant',    lat: 37.3773, lon: -5.9872, hex: 0xD4A04A, desc: '수제 버거 · €10~20' },
  { id: 'comercio',   name: 'Bar El Comercio',          emoji: '🥐', cat: 'restaurant',    lat: 37.3845, lon: -5.9900, hex: 0xD4A04A, desc: '츄러스 맛집' },
  { id: 'kukuchurro', name: 'Kukuchurro',               emoji: '🍩', cat: 'restaurant',    lat: 37.3896, lon: -5.9916, hex: 0xD4A04A, desc: '추로스 전문점' },
  { id: 'helados',    name: 'Helados La Abuela',        emoji: '🍦', cat: 'restaurant',    lat: 37.3921, lon: -5.9924, hex: 0xD4A04A, desc: '아이스크림 맛집' },
  { id: 'orangetree', name: 'Orange Tree Sevilla',      emoji: '🍊', cat: 'shopping',      lat: 37.3837, lon: -5.9887, hex: 0xE07A5C, desc: '오렌지 기념품점' },
];

const REGIONAL_PINS = [
  { id: 'sevilla',  name: '세비야',   emoji: '⭐', cat: 'home',    lat: 37.3891, lon: -5.9845, hex: 0xC65D3E, desc: '베이스캠프' },
  { id: 'granada',  name: '그라나다', emoji: '🏰', cat: 'daytrip', lat: 37.1773, lon: -3.5986, hex: 0x3A6EC4, desc: '알람브라 궁전 · 기차 약 3시간' },
  { id: 'ronda',    name: '론다',    emoji: '🌉', cat: 'daytrip', lat: 36.7446, lon: -5.1652, hex: 0x3A6EC4, desc: '누에보 다리 · 버스 약 2.5시간' },
  { id: 'cadiz',    name: '카디스',  emoji: '🌊', cat: 'daytrip', lat: 36.5271, lon: -6.2886, hex: 0x3A6EC4, desc: '대서양 해안 · 기차 약 2시간' },
  { id: 'cordoba',  name: '코르도바', emoji: '🕌', cat: 'daytrip', lat: 37.8882, lon: -4.7794, hex: 0x3A6EC4, desc: '메스키타 · 고속열차 45분' },
];

/* ── Category colours (for legend) ───────────────────────────────────── */
const CAT_COLOR = {
  accommodation: '#C65D3E',
  attraction:    '#3D9B6A',
  restaurant:    '#D4A04A',
  shopping:      '#E07A5C',
  home:          '#C65D3E',
  daytrip:       '#3A6EC4',
};
const LEGEND_CITY = [
  { cat: 'accommodation', label: '숙소' },
  { cat: 'attraction',    label: '가볼만한 곳' },
  { cat: 'restaurant',    label: '식당' },
  { cat: 'shopping',      label: '쇼핑' },
];
const LEGEND_REGIONAL = [
  { cat: 'home',    label: '세비야 (베이스)' },
  { cat: 'daytrip', label: '근교 도시' },
];

/* ── Component ────────────────────────────────────────────────────────── */
export default function MapScene() {
  const mountRef = useRef(null);
  const destroyRef = useRef(null);
  const [view, setView] = useState('city');
  const [tooltip, setTooltip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const mount = mountRef.current;
    if (!mount) return;

    setLoading(true);
    setTooltip(null);

    // tear down previous scene
    if (destroyRef.current) { destroyRef.current(); destroyRef.current = null; }

    const pins    = view === 'city' ? CITY_PINS : REGIONAL_PINS;
    const viewCfg = VIEWS[view];

    buildTileCanvas(viewCfg.bounds, viewCfg.zoom).then(({ canvas, tXs, tYs, nX, nY }) => {
      if (cancelled) return;
      setLoading(false);

      const W = mount.clientWidth;
      const H = mount.clientHeight || 560;

      /* renderer */
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.shadowMap.enabled = true;
      mount.appendChild(renderer.domElement);

      /* scene */
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0ebe4);
      scene.fog = new THREE.FogExp2(0xf0ebe4, 0.08);

      /* camera */
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.01, 40);
      camera.position.set(0, 1.6, 3.8);
      camera.lookAt(0, -0.2, 0);

      /* lights */
      scene.add(new THREE.AmbientLight(0xfff8f0, 1.1));
      const sun = new THREE.DirectionalLight(0xfffaf0, 0.6);
      sun.position.set(3, 6, 4);
      sun.castShadow = true;
      scene.add(sun);
      // soft fill from below
      const fill = new THREE.DirectionalLight(0xd0e8ff, 0.2);
      fill.position.set(-2, -1, 2);
      scene.add(fill);

      /* map plane */
      const aspect = canvas.width / canvas.height;
      const PW = 4.6, PH = PW / aspect;
      const mapGeo  = new THREE.PlaneGeometry(PW, PH, 1, 1);
      const mapTex  = new THREE.CanvasTexture(canvas);
      mapTex.needsUpdate = true;
      const mapMat  = new THREE.MeshLambertMaterial({ map: mapTex });
      const mapMesh = new THREE.Mesh(mapGeo, mapMat);
      mapMesh.rotation.x = -Math.PI * 0.10; // subtle 3D tilt
      mapMesh.receiveShadow = true;
      scene.add(mapMesh);

      /* thin frame around the map */
      const frameGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(PW + 0.04, PH + 0.04));
      const frameMat = new THREE.LineBasicMaterial({ color: 0xc8b8a8, linewidth: 1 });
      const frame    = new THREE.LineSegments(frameGeo, frameMat);
      frame.rotation.x = mapMesh.rotation.x;
      frame.position.z = 0.001;
      scene.add(frame);

      /* pins */
      const hitTargets = [];
      const SH = view === 'city' ? 0.11 : 0.17;
      const HR = view === 'city' ? 0.038 : 0.058;

      pins.forEach((pin, i) => {
        const { nx, ny } = toNorm(pin.lat, pin.lon, viewCfg.zoom, tXs, tYs, nX, nY);
        const { x: bx, y: by } = toPlane(nx, ny, PW, PH);

        const group = new THREE.Group();
        group.position.set(bx, by, 0);
        mapMesh.add(group); // child of tilted plane → correct world position

        /* stem */
        const stem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.006, 0.009, SH, 8),
          new THREE.MeshLambertMaterial({ color: pin.hex })
        );
        stem.position.set(0, SH / 2 + 0.008, 0.001);
        stem.castShadow = true;
        group.add(stem);

        /* head sphere */
        const headGeo = new THREE.SphereGeometry(HR, 16, 12);
        const headMat = new THREE.MeshLambertMaterial({ color: pin.hex });
        const head    = new THREE.Mesh(headGeo, headMat);
        head.position.set(0, SH + HR + 0.008, 0.001);
        head.castShadow = true;
        head.userData  = { pin, baseY: SH + HR + 0.008, phase: i * 1.3 };
        group.add(head);
        hitTargets.push(head);

        /* shadow disc */
        const disc = new THREE.Mesh(
          new THREE.CircleGeometry(HR * 0.85, 16),
          new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.14, transparent: true })
        );
        disc.position.set(0, 0, 0.0005);
        group.add(disc);

        /* label ring highlight on the head */
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(HR * 1.18, HR * 0.12, 8, 24),
          new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.55, transparent: true })
        );
        ring.position.copy(head.position);
        group.add(ring);
      });

      /* raycaster / hover */
      const raycaster = new THREE.Raycaster();
      const mouse     = new THREE.Vector2();
      let   hoverId   = null;
      let   raf;

      const onMove = (e) => {
        const rect = mount.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width)  *  2 - 1;
        mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(hitTargets);
        if (hits.length > 0) {
          const { pin } = hits[0].object.userData;
          if (hoverId !== pin.id) {
            hoverId = pin.id;
            mount.style.cursor = 'pointer';
            setTooltip({ pin, x: e.clientX - rect.left, y: e.clientY - rect.top });
          }
        } else if (hoverId) {
          hoverId = null;
          mount.style.cursor = '';
          setTooltip(null);
        }
      };

      const onTouch = (e) => {
        if (!e.touches[0]) return;
        onMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
      };

      mount.addEventListener('mousemove', onMove);
      mount.addEventListener('touchmove',  onTouch, { passive: true });

      /* animate */
      const animate = () => {
        raf = requestAnimationFrame(animate);
        const t = performance.now() * 0.001;
        hitTargets.forEach((h) => {
          h.position.y = h.userData.baseY + Math.sin(t * 1.6 + h.userData.phase) * 0.009;
        });
        renderer.render(scene, camera);
      };
      animate();

      /* resize */
      const onResize = () => {
        const nW = mount.clientWidth, nH = mount.clientHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
      };
      window.addEventListener('resize', onResize);

      destroyRef.current = () => {
        cancelAnimationFrame(raf);
        mount.removeEventListener('mousemove', onMove);
        mount.removeEventListener('touchmove',  onTouch);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    });

    return () => {
      cancelled = true;
      if (destroyRef.current) { destroyRef.current(); destroyRef.current = null; }
    };
  }, [view]);

  const legend = view === 'city' ? LEGEND_CITY : LEGEND_REGIONAL;

  return (
    <div style={{
      position: 'relative', width: '100%',
      height: 'clamp(420px, 62vh, 640px)',
      borderRadius: 18, overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(28,43,74,.14)',
    }}>
      {/* loading overlay */}
      {loading && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#f0ebe4', zIndex: 10, gap: 12,
        }}>
          <div style={{ fontSize: 36 }}>🗺️</div>
          <div style={{ color: '#C65D3E', fontWeight: 700, fontSize: 15 }}>지도 불러오는 중...</div>
        </div>
      )}

      {/* Three.js canvas host */}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* view toggle */}
      <div style={{
        position: 'absolute', top: 14, left: 14, zIndex: 20,
        display: 'flex', gap: 6,
      }}>
        {[
          { key: 'city',     label: '🏙️ 세비야 시내' },
          { key: 'regional', label: '🚌 근교 안달루시아' },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setView(key)} style={{
            padding: '8px 14px', borderRadius: 20,
            background: view === key ? '#C65D3E' : 'rgba(255,255,255,.92)',
            color:      view === key ? '#fff'    : '#333',
            border: 'none', fontWeight: 600, cursor: 'pointer',
            fontSize: 12.5, boxShadow: '0 2px 8px rgba(0,0,0,.15)',
            fontFamily: 'inherit', transition: 'all .18s',
          }}>{label}</button>
        ))}
      </div>

      {/* tooltip */}
      {tooltip && (
        <div style={{
          position: 'absolute',
          left: tooltip.x + 14,
          top:  Math.max(10, tooltip.y - 58),
          background: 'rgba(255,255,255,.97)',
          borderRadius: 11, padding: '10px 15px',
          boxShadow: '0 4px 20px rgba(0,0,0,.18)',
          pointerEvents: 'none', zIndex: 30,
          minWidth: 160, maxWidth: 220,
          borderLeft: `4px solid ${CAT_COLOR[tooltip.pin.cat]}`,
        }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#1C2B4A', lineHeight: 1.3 }}>
            {tooltip.pin.emoji}&nbsp;{tooltip.pin.name}
          </div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4, lineHeight: 1.5 }}>
            {tooltip.pin.desc}
          </div>
        </div>
      )}

      {/* legend */}
      <div style={{
        position: 'absolute', bottom: 14, right: 14, zIndex: 20,
        background: 'rgba(255,255,255,.92)', borderRadius: 11,
        padding: '10px 14px', boxShadow: '0 2px 14px rgba(0,0,0,.1)',
        fontSize: 12,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 7, color: '#1C2B4A', fontSize: 12.5 }}>범례</div>
        {legend.map(({ cat, label }) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: CAT_COLOR[cat], flexShrink: 0 }} />
            <span style={{ color: '#444' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* credits */}
      <div style={{
        position: 'absolute', bottom: 8, left: 12, zIndex: 20,
        fontSize: 10, color: 'rgba(0,0,0,.35)',
        background: 'rgba(255,255,255,.6)', padding: '2px 6px', borderRadius: 4,
      }}>
        © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>OpenStreetMap</a> contributors
        &nbsp;© <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>CARTO</a>
      </div>
    </div>
  );
}
