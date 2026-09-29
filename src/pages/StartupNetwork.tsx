import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, Button } from '../components/ui';
import {
  Globe,
  MapPin,
  Compass,
  Search,
  ExternalLink,
  Building2,
  Sparkles,
  Maximize2,
  Minimize2,
  Zap,
  Activity,
  ArrowUpRight,
  Filter,
  Layers,
  X,
  Radio,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  Navigation,
  ZoomIn,
  ZoomOut,
  Plus,
  Minus,
  Move,
  Scan,
  Radar,
  Target,
  LocateFixed,
  Route,
  Milestone,
  Crosshair,
  MapPinned,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NETWORK_CITIES,
  NETWORK_CONNECTIONS,
  NetworkCity,
  projectWorldCoordinates,
  projectIndiaCoordinates,
  calculateDistanceKm,
  getCompassBearing,
  NEARBY_LOCAL_MUNICIPALITIES,
  CHALLENGE_LOCATIONS,
  ChallengeLocationMeta,
  NearbyMunicipality
} from '../data/networkData';
import { WorldMapSvg, IndiaMapSvg } from '../components/WorldMapSvg';

type MapViewMode = 'world' | 'india';
type NodeTypeFilter = 'all' | 'startup_hub' | 'gov_challenge' | 'global_partner' | 'hybrid';

// Dimensions for coordinate projection
const WORLD_WIDTH = 1000;
const WORLD_HEIGHT = 500;
const INDIA_WIDTH = 900;
const INDIA_HEIGHT = 650;

export default function StartupNetwork() {
  const navigate = useNavigate();

  // State Management
  const [viewMode, setViewMode] = useState<MapViewMode>('world');
  const [selectedCityId, setSelectedCityId] = useState<string | null>('pune');
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>('CH-001');
  const [showDistanceRadar, setShowDistanceRadar] = useState(true);
  const [activeInspectorTab, setActiveInspectorTab] = useState<'proximity' | 'profile'>('proximity');
  const [distanceCategory, setDistanceCategory] = useState<'all' | 'city' | 'state' | 'country' | 'world'>('all');
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);
  const [nodeFilter, setNodeFilter] = useState<NodeTypeFilter>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showArcs, setShowArcs] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  // Zoom & Pan State Management
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const currentPanRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const mapViewportRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Wheel zoom handler with passive: false to allow preventDefault
  useEffect(() => {
    const viewport = mapViewportRef.current;
    if (!viewport) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY < 0 ? 0.12 : -0.12;
      setZoomLevel(prev => {
        const next = Math.round((prev + zoomDelta) * 100) / 100;
        return Math.max(0.4, Math.min(3.0, next));
      });
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      viewport.removeEventListener('wheel', onWheel);
    };
  }, []);

  // Zoom control helpers
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(3.0, Math.round((prev + 0.15) * 100) / 100));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(0.4, Math.round((prev - 0.15) * 100) / 100));
  };

  const handleResetZoom = () => {
    setZoomLevel(1.0);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoomPreset = (preset: number) => {
    setZoomLevel(preset);
    if (preset <= 0.6) {
      setPanOffset({ x: 0, y: 0 });
    }
  };

  const handleSwitchView = (mode: MapViewMode) => {
    setViewMode(mode);
    setZoomLevel(1.0);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleFocusCity = (cityId: string) => {
    setSelectedCityId(cityId);
    // If this city hosts a challenge, sync challenge selector
    const challengeMatch = CHALLENGE_LOCATIONS.find(c => c.cityId === cityId);
    if (challengeMatch) {
      setSelectedChallengeId(challengeMatch.id);
    }
    const city = NETWORK_CITIES.find(c => c.id === cityId);
    if (city) {
      if (viewMode === 'world') {
        const coords = projectWorldCoordinates(city.lat, city.lng, WORLD_WIDTH, WORLD_HEIGHT);
        const targetX = (WORLD_WIDTH / 2 - coords.x) * 0.7;
        const targetY = (WORLD_HEIGHT / 2 - coords.y) * 0.7;
        setPanOffset({ x: targetX, y: targetY });
        setZoomLevel(Math.max(1.2, zoomLevel));
      } else {
        const coords = projectIndiaCoordinates(city.lat, city.lng, INDIA_WIDTH, INDIA_HEIGHT);
        const targetX = (INDIA_WIDTH / 2 - coords.x) * 0.6;
        const targetY = (INDIA_HEIGHT / 2 - coords.y) * 0.6;
        setPanOffset({ x: targetX, y: targetY });
        setZoomLevel(Math.max(1.2, zoomLevel));
      }
    }
  };

  const handleBeamToChallenge = (ch: ChallengeLocationMeta) => {
    setSelectedChallengeId(ch.id);
    setActiveInspectorTab('proximity');
    if (ch.country !== 'India' && viewMode === 'india') {
      setViewMode('world');
    }
    const isWorld = viewMode === 'world' || ch.country !== 'India';
    const coords = isWorld
      ? projectWorldCoordinates(ch.lat, ch.lng, WORLD_WIDTH, WORLD_HEIGHT)
      : projectIndiaCoordinates(ch.lat, ch.lng, INDIA_WIDTH, INDIA_HEIGHT);
    const width = isWorld ? WORLD_WIDTH : INDIA_WIDTH;
    const height = isWorld ? WORLD_HEIGHT : INDIA_HEIGHT;

    if (selectedCity) {
      const cityCoords = isWorld
        ? projectWorldCoordinates(selectedCity.lat, selectedCity.lng, WORLD_WIDTH, WORLD_HEIGHT)
        : projectIndiaCoordinates(selectedCity.lat, selectedCity.lng, INDIA_WIDTH, INDIA_HEIGHT);
      const midX = (cityCoords.x + coords.x) / 2;
      const midY = (cityCoords.y + coords.y) / 2;
      setPanOffset({
        x: (width / 2 - midX) * 0.65,
        y: (height / 2 - midY) * 0.65
      });
      setZoomLevel(Math.max(1.1, Math.min(1.8, zoomLevel)));
    } else {
      setPanOffset({
        x: (width / 2 - coords.x) * 0.7,
        y: (height / 2 - coords.y) * 0.7
      });
      setZoomLevel(Math.max(1.2, zoomLevel));
    }
  };

  const handleSelectChallenge = (challengeId: string) => {
    setSelectedChallengeId(challengeId);
    setActiveInspectorTab('proximity');
    const meta = CHALLENGE_LOCATIONS.find(c => c.id === challengeId);
    if (meta) {
      handleBeamToChallenge(meta);
    }
  };

  // Drag-to-pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, input')) return;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    currentPanRef.current = { ...panOffset };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMovedRef.current = true;
    }
    setPanOffset({
      x: currentPanRef.current.x + dx,
      y: currentPanRef.current.y + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button, a, input')) return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      hasMovedRef.current = false;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      currentPanRef.current = { ...panOffset };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMovedRef.current = true;
    }
    setPanOffset({
      x: currentPanRef.current.x + dx,
      y: currentPanRef.current.y + dy
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Compute City Point Coordinates
  const getCityCoordinates = useCallback((city: NetworkCity) => {
    if (viewMode === 'world') {
      return projectWorldCoordinates(city.lat, city.lng, WORLD_WIDTH, WORLD_HEIGHT);
    } else {
      return projectIndiaCoordinates(city.lat, city.lng, INDIA_WIDTH, INDIA_HEIGHT);
    }
  }, [viewMode]);

  // Compute Challenge Point Coordinates
  const getChallengeCoordinates = useCallback((ch: ChallengeLocationMeta) => {
    if (viewMode === 'world') {
      return projectWorldCoordinates(ch.lat, ch.lng, WORLD_WIDTH, WORLD_HEIGHT);
    } else {
      return projectIndiaCoordinates(ch.lat, ch.lng, INDIA_WIDTH, INDIA_HEIGHT);
    }
  }, [viewMode]);

  // Selected City Entity
  const selectedCity = useMemo(() => {
    return NETWORK_CITIES.find(c => c.id === selectedCityId) || null;
  }, [selectedCityId]);

  // Active Challenge associated with current selection or context
  const selectedChallenge = useMemo(() => {
    if (selectedChallengeId) {
      const match = CHALLENGE_LOCATIONS.find(c => c.id === selectedChallengeId);
      if (match) return match;
    }
    if (selectedCity) {
      return CHALLENGE_LOCATIONS.find(c => c.cityId === selectedCity.id) || null;
    }
    return CHALLENGE_LOCATIONS[0];
  }, [selectedChallengeId, selectedCity]);

  // Challenges with real-time geodesic distances from selectedCity across 4 tiers: City, State, Country, World
  const challengesWithDistance = useMemo(() => {
    if (!selectedCity) return [];
    return CHALLENGE_LOCATIONS.map(c => {
      const dist = calculateDistanceKm(selectedCity.lat, selectedCity.lng, c.lat, c.lng);
      const bearing = getCompassBearing(selectedCity.lat, selectedCity.lng, c.lat, c.lng);
      const isSameCity = c.cityId === selectedCity.id || dist <= 5;

      let tier: 'city' | 'state' | 'country' | 'world' = 'world';
      let tierLabel = 'Global World Hub';
      let tierColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';

      if (c.country === selectedCity.country) {
        if (dist <= 65 || isSameCity) {
          tier = 'city';
          tierLabel = isSameCity ? 'Immediate Municipal Ward' : 'Near City (<65 km)';
          tierColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
        } else if (dist <= 550 || c.state === selectedCity.region) {
          tier = 'state';
          tierLabel = c.state === selectedCity.region ? `Same State (${c.state})` : 'Near State (<550 km)';
          tierColor = 'text-amber-500 bg-amber-500/10 border-amber-500/30';
        } else {
          tier = 'country';
          tierLabel = 'National Grid (India)';
          tierColor = 'text-orange-500 bg-orange-500/10 border-orange-500/30';
        }
      } else {
        tier = 'world';
        tierLabel = 'International World Corridor';
        tierColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      }

      return {
        ...c,
        distanceKm: dist,
        bearing,
        tier,
        tierLabel,
        tierColor,
        isSameCity
      };
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [selectedCity]);

  // Counts by proximity tier
  const nearCityChallengesCount = useMemo(() => challengesWithDistance.filter(c => c.tier === 'city').length, [challengesWithDistance]);
  const nearStateChallengesCount = useMemo(() => challengesWithDistance.filter(c => c.tier === 'state').length, [challengesWithDistance]);
  const countryChallengesCount = useMemo(() => challengesWithDistance.filter(c => c.tier === 'country').length, [challengesWithDistance]);
  const worldChallengesCount = useMemo(() => challengesWithDistance.filter(c => c.tier === 'world').length, [challengesWithDistance]);

  // Filtered challenges by selected distance category
  const filteredChallengesByProximity = useMemo(() => {
    if (distanceCategory === 'all') return challengesWithDistance;
    return challengesWithDistance.filter(c => c.tier === distanceCategory);
  }, [challengesWithDistance, distanceCategory]);

  // Proximity distances computed for selectedCity across 4 tiers: Near City, State, Country, World
  const proximityData = useMemo(() => {
    if (!selectedCity) return { nearCity: [], nearState: [], country: [], world: [] };

    // 1. Near City / Metro (< 250 km, including sister cities)
    const localSister = NEARBY_LOCAL_MUNICIPALITIES[selectedCity.id] || [];

    const otherCloseCities = NETWORK_CITIES
      .filter(c => c.id !== selectedCity.id)
      .map(c => {
        const dist = calculateDistanceKm(selectedCity.lat, selectedCity.lng, c.lat, c.lng);
        const bearing = getCompassBearing(selectedCity.lat, selectedCity.lng, c.lat, c.lng);
        return { city: c, distanceKm: dist, bearing };
      })
      .filter(item => item.distanceKm <= 260)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    const nearCityList = [
      ...localSister.map(m => ({
        id: m.name,
        name: m.name,
        type: m.type,
        region: selectedCity.region,
        country: selectedCity.country,
        distanceKm: m.distanceKm,
        bearing: m.bearing,
        flag: selectedCity.flag,
        relevance: m.relevance,
        tier: 'city' as const,
        isNetworkNode: NETWORK_CITIES.some(nc => nc.name.toLowerCase().includes(m.name.split(' ')[0].toLowerCase()))
      })),
      ...otherCloseCities
        .filter(oc => !localSister.some(ls => ls.name.toLowerCase().includes(oc.city.name.toLowerCase())))
        .map(oc => ({
          id: oc.city.id,
          name: oc.city.name,
          type: oc.city.type === 'gov_challenge' ? 'Gov Challenge Host' : 'Startup Cluster',
          region: oc.city.region,
          country: oc.city.country,
          distanceKm: oc.distanceKm,
          bearing: oc.bearing,
          flag: oc.city.flag,
          relevance: `Connected testbed with ${oc.city.startupCount} startups.`,
          tier: 'city' as const,
          isNetworkNode: true
        }))
    ].sort((a, b) => a.distanceKm - b.distanceKm);

    // 2. Near State / Regional (< 650 km or same region)
    const nearStateList = NETWORK_CITIES
      .filter(c => c.id !== selectedCity.id && (c.region === selectedCity.region || (c.countryCode === selectedCity.countryCode && calculateDistanceKm(selectedCity.lat, selectedCity.lng, c.lat, c.lng) <= 650)))
      .map(c => {
        const dist = calculateDistanceKm(selectedCity.lat, selectedCity.lng, c.lat, c.lng);
        const bearing = getCompassBearing(selectedCity.lat, selectedCity.lng, c.lat, c.lng);
        const isSameState = c.region === selectedCity.region;
        return {
          id: c.id,
          name: c.name,
          type: isSameState ? `${c.region} State Cluster` : 'Adjacent State Hub',
          region: c.region,
          country: c.country,
          distanceKm: dist,
          bearing,
          flag: c.flag,
          relevance: isSameState
            ? `Same state governance framework (${c.region}) — accelerated replication.`
            : `Regional innovation corridor node with ${c.startupCount} startups.`,
          tier: 'state' as const,
          isNetworkNode: true
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);

    // 3. Country / National India
    const countryList = NETWORK_CITIES
      .filter(c => c.id !== selectedCity.id && c.countryCode === 'IN')
      .map(c => {
        const dist = calculateDistanceKm(selectedCity.lat, selectedCity.lng, c.lat, c.lng);
        const bearing = getCompassBearing(selectedCity.lat, selectedCity.lng, c.lat, c.lng);
        return {
          id: c.id,
          name: c.name,
          type: c.type === 'gov_challenge' ? 'Civic Challenge Host' : 'National DPIIT Hub',
          region: c.region,
          country: c.country,
          distanceKm: dist,
          bearing,
          flag: c.flag,
          relevance: `National smart city network: ${c.domain.slice(0, 2).join(', ')}.`,
          tier: 'country' as const,
          isNetworkNode: true
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);

    // 4. World / Global
    const worldList = NETWORK_CITIES
      .filter(c => c.countryCode !== 'IN')
      .map(c => {
        const dist = calculateDistanceKm(selectedCity.lat, selectedCity.lng, c.lat, c.lng);
        const bearing = getCompassBearing(selectedCity.lat, selectedCity.lng, c.lat, c.lng);
        return {
          id: c.id,
          name: c.name,
          type: 'Global Partner Hub',
          region: c.region,
          country: c.country,
          distanceKm: dist,
          bearing,
          flag: c.flag,
          relevance: `Bilateral Tech Bridge: ${c.domain.slice(0, 2).join(', ')} benchmark.`,
          tier: 'world' as const,
          isNetworkNode: true
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return {
      nearCity: nearCityList,
      nearState: nearStateList,
      country: countryList,
      world: worldList
    };
  }, [selectedCity]);

  // Distance Rays on Map from selectedCity to surrounding nodes
  const distanceRays = useMemo(() => {
    if (!selectedCity || !showDistanceRadar) return [];
    const sourceCoords = getCityCoordinates(selectedCity);

    const candidates = NETWORK_CITIES
      .filter(c => c.id !== selectedCity.id)
      .filter(c => viewMode === 'world' || c.countryCode === 'IN')
      .map(c => {
        const dist = calculateDistanceKm(selectedCity.lat, selectedCity.lng, c.lat, c.lng);
        const bearing = getCompassBearing(selectedCity.lat, selectedCity.lng, c.lat, c.lng);
        const targetCoords = getCityCoordinates(c);
        return {
          city: c,
          distanceKm: dist,
          bearing,
          sourceCoords,
          targetCoords
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);

    if (viewMode === 'world') {
      const closestDomestic = candidates.filter(c => c.city.countryCode === 'IN').slice(0, 3);
      const closestGlobal = candidates.filter(c => c.city.countryCode !== 'IN').slice(0, 3);
      return [...closestDomestic, ...closestGlobal];
    }
    return candidates.slice(0, 5);
  }, [selectedCity, showDistanceRadar, viewMode]);

  // Direct Laser Ray to Active Selected Challenge with Live Kilometers
  const activeChallengeRay = useMemo(() => {
    if (!selectedCity || !selectedChallenge || !showDistanceRadar) return null;
    const sourceCoords = getCityCoordinates(selectedCity);
    let targetCoords;
    if (viewMode === 'world') {
      targetCoords = projectWorldCoordinates(selectedChallenge.lat, selectedChallenge.lng, WORLD_WIDTH, WORLD_HEIGHT);
    } else {
      if (selectedChallenge.country !== 'India') return null;
      targetCoords = projectIndiaCoordinates(selectedChallenge.lat, selectedChallenge.lng, INDIA_WIDTH, INDIA_HEIGHT);
    }
    const dist = calculateDistanceKm(selectedCity.lat, selectedCity.lng, selectedChallenge.lat, selectedChallenge.lng);
    const bearing = getCompassBearing(selectedCity.lat, selectedCity.lng, selectedChallenge.lat, selectedChallenge.lng);
    return {
      sourceCoords,
      targetCoords,
      distanceKm: dist,
      bearing,
      challenge: selectedChallenge
    };
  }, [selectedCity, selectedChallenge, showDistanceRadar, viewMode]);

  // Hovered City Entity
  const hoveredCity = useMemo(() => {
    return NETWORK_CITIES.find(c => c.id === hoveredCityId) || null;
  }, [hoveredCityId]);

  // All unique domains across cities
  const availableDomains = useMemo(() => {
    const domains = new Set<string>();
    NETWORK_CITIES.forEach(c => c.domain.forEach(d => domains.add(d)));
    return ['All', 'WaterTech', 'AI & IoT', 'CivicTech', 'Computer Vision', 'GovTech', 'Clean Energy', 'DeepTech', 'FinTech'];
  }, []);

  // Filtered Cities
  const filteredCities = useMemo(() => {
    return NETWORK_CITIES.filter(city => {
      // If India mode, only show Indian cities
      if (viewMode === 'india' && city.countryCode !== 'IN') {
        return false;
      }

      // Filter by Node Type
      if (nodeFilter !== 'all') {
        if (nodeFilter === 'startup_hub' && city.type !== 'startup_hub' && city.type !== 'hybrid') return false;
        if (nodeFilter === 'gov_challenge' && city.type !== 'gov_challenge' && city.type !== 'hybrid') return false;
        if (nodeFilter === 'global_partner' && city.type !== 'global_partner') return false;
      }

      // Filter by Domain
      if (selectedDomain !== 'All') {
        const matchesDomain = city.domain.some(d => d.toLowerCase().includes(selectedDomain.toLowerCase()));
        if (!matchesDomain) return false;
      }

      // Filter by Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = city.name.toLowerCase().includes(q);
        const matchesCountry = city.country.toLowerCase().includes(q);
        const matchesDomain = city.domain.some(d => d.toLowerCase().includes(q));
        const matchesInitiatives = city.keyInitiatives.some(i => i.toLowerCase().includes(q));
        if (!matchesName && !matchesCountry && !matchesDomain && !matchesInitiatives) return false;
      }

      return true;
    });
  }, [viewMode, nodeFilter, selectedDomain, searchQuery]);

  // Filtered Connections (Arcs)
  const activeConnections = useMemo(() => {
    if (!showArcs) return [];

    return NETWORK_CONNECTIONS.filter(conn => {
      // In India mode, only show domestic connections
      if (viewMode === 'india' && conn.type === 'international') {
        return false;
      }

      // If a city is selected, highlight its connections or show all if none selected
      const sourceCity = NETWORK_CITIES.find(c => c.id === conn.from);
      const targetCity = NETWORK_CITIES.find(c => c.id === conn.to);

      if (!sourceCity || !targetCity) return false;

      // Filter by visibility of both cities in current mode
      if (viewMode === 'india' && (sourceCity.countryCode !== 'IN' || targetCity.countryCode !== 'IN')) {
        return false;
      }

      return true;
    });
  }, [showArcs, viewMode]);

  // Node Color Helper
  const getNodeColor = (type: NetworkCity['type'], isSelected: boolean) => {
    if (isSelected) return 'ring-4 ring-white shadow-xl scale-125 z-30';
    switch (type) {
      case 'gov_challenge':
        return 'bg-emerald-500 shadow-emerald-500/50';
      case 'hybrid':
        return 'bg-amber-500 shadow-amber-500/50';
      case 'global_partner':
        return 'bg-cyan-500 shadow-cyan-500/50';
      case 'startup_hub':
      default:
        return 'bg-orange-500 shadow-orange-500/50';
    }
  };

  // Quick stats
  const totalStartups = useMemo(() => NETWORK_CITIES.reduce((acc, c) => acc + c.startupCount, 0), []);
  const totalChallenges = useMemo(() => NETWORK_CITIES.reduce((acc, c) => acc + c.challengeCount, 0), []);
  const totalPilots = useMemo(() => NETWORK_CITIES.reduce((acc, c) => acc + c.pilotCount, 0), []);

  return (
    <div className={`flex-1 w-full p-4 sm:p-6 space-y-5 max-w-7xl mx-auto flex flex-col transition-all duration-300 ${isExpanded ? 'fixed inset-0 z-50 bg-[#0B1329] p-6 max-w-none' : ''}`}>
      {/* Top Header & Network Statistics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Globe className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Global & National Startup Network
                </h1>
                <Badge variant="warning" className="text-xs bg-orange-50 text-orange-700 border-orange-200 font-mono">
                  SIH 2026 Innovation Map
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Geographic cross-city innovation corridors matching municipal challenges with Indian and global tech solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Global Network Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl shadow-xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Connected Cities</div>
            <div className="text-lg font-extrabold text-slate-800 dark:text-white flex items-center space-x-1.5 mt-0.5">
              <span>{NETWORK_CITIES.length}</span>
              <span className="text-[10px] font-normal text-emerald-500 font-mono">(13 IN + 12 Intl)</span>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl shadow-xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Startups Mapped</div>
            <div className="text-lg font-extrabold text-orange-600 dark:text-orange-400 mt-0.5">
              {totalStartups}+
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl shadow-xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Govt Challenges</div>
            <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {totalChallenges} Live
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl shadow-xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Corridors</div>
            <div className="text-lg font-extrabold text-cyan-600 dark:text-cyan-400 mt-0.5">
              {NETWORK_CONNECTIONS.length} Arcs
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: View Switcher, Search, Domain Pills, and Map Options */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: View Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => handleSwitchView('world')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'world'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>World Map (Global Corridors)</span>
            </button>
            <button
              onClick={() => handleSwitchView('india')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'india'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>India Network (Deep Dive)</span>
            </button>
          </div>

          {/* Quick Zoom Out Button */}
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.4}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors shadow-xs"
            title="Zoom Out (View broader world area)"
          >
            <ZoomOut className="w-3.5 h-3.5 text-cyan-500" />
            <span className="hidden sm:inline">Zoom Out</span>
          </button>

          {/* Toggle Arc Lines */}
          <button
            onClick={() => setShowArcs(!showArcs)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
              showArcs
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                : 'text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Toggle Innovation Corridor Arcs"
          >
            <Zap className={`w-3.5 h-3.5 ${showArcs ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Corridor Arcs</span>
          </button>

          {/* Toggle Distance Radar */}
          <button
            onClick={() => setShowDistanceRadar(!showDistanceRadar)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
              showDistanceRadar
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Toggle Concentric Distance Radar & Kilometer Rays"
          >
            <Radar className={`w-3.5 h-3.5 ${showDistanceRadar ? 'text-emerald-500 animate-spin-slow' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Distance Radar</span>
          </button>
        </div>

        {/* Center: Location Anchor, Challenge Selector & Search */}
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl">
          {/* Location Anchor Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-xl shrink-0">
            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="text-[11px] font-bold text-slate-400 uppercase hidden md:inline">Near Location:</span>
            <select
              value={selectedCityId || 'pune'}
              onChange={e => handleFocusCity(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer max-w-[130px] truncate"
              title="Select reference location to calculate nearby challenge distances"
            >
              {NETWORK_CITIES.map(c => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                  {c.flag} {c.name} ({c.countryCode})
                </option>
              ))}
            </select>
          </div>

          {/* Challenge Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-xl shrink-0">
            <Target className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-[11px] font-bold text-slate-400 uppercase hidden md:inline">Challenge:</span>
            <select
              value={selectedChallengeId || ''}
              onChange={e => handleSelectChallenge(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer max-w-[160px] truncate"
              title="Select challenge to highlight distance and corridor on map"
            >
              {CHALLENGE_LOCATIONS.map(c => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                  {c.id}: {c.cityName} ({c.title})
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search city, country, or tech..."
              className="w-full pl-9 pr-8 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Node Type Filter Buttons */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0">
          <span className="text-[11px] text-slate-400 font-semibold mr-1 flex items-center">
            <Filter className="w-3 h-3 mr-1" /> Type:
          </span>
          {[
            { id: 'all', label: 'All' },
            { id: 'startup_hub', label: 'Startups' },
            { id: 'gov_challenge', label: 'Gov Challenges' },
            { id: 'global_partner', label: 'Global' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setNodeFilter(f.id as NodeTypeFilter)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                nodeFilter === f.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Interactive Canvas and City Detail Panel */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[560px]">
        {/* Map Viewport Card */}
        <Card className={`lg:col-span-8 relative overflow-hidden bg-[#070D1E] border-slate-800 flex flex-col shadow-2xl rounded-2xl group min-h-[480px] lg:min-h-[580px]`}>
          {/* Map Top Status Bar */}
          <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl flex items-center space-x-2 text-xs text-slate-200 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono uppercase text-[11px] font-semibold text-slate-300">
                {viewMode === 'world' ? 'Global Innovation Mesh • 24 Cities' : 'Bharat National Proving Grounds'}
              </span>
            </div>

            <div className="hidden sm:flex items-center space-x-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-2.5 py-1.5 rounded-xl text-slate-300 text-xs font-mono">
              <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>LIVE TELEMETRY</span>
            </div>
          </div>

          {/* Map Top-Right Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-wrap items-center justify-end gap-1.5">
            {/* Quick Zoom Out Button */}
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.4}
              className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white disabled:opacity-40 border border-slate-700/80 px-2.5 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-md"
              title="Zoom Out to view full globe (-)"
            >
              <ZoomOut className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-[11px]">Zoom Out</span>
            </button>

            {/* Quick Zoom In Button */}
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3.0}
              className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white disabled:opacity-40 border border-slate-700/80 px-2 py-1.5 rounded-xl text-xs flex items-center space-x-1 transition-all shadow-md"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            {/* Reset Zoom Button */}
            <button
              onClick={handleResetZoom}
              className="bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 p-1.5 rounded-xl text-xs transition-all shadow-md"
              title="Reset View to 100%"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
            </button>

            {/* Focus Pune */}
            <button
              onClick={() => handleFocusCity('pune')}
              className="bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 px-2.5 py-1.5 rounded-xl text-xs flex items-center space-x-1 transition-all shadow-md"
              title="Focus on Core Innovation Hub (Pune)"
            >
              <Navigation className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">Pune</span>
            </button>

            {/* Focus Bengaluru */}
            <button
              onClick={() => handleFocusCity('bengaluru')}
              className="bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 px-2.5 py-1.5 rounded-xl text-xs flex items-center space-x-1 transition-all shadow-md"
              title="Focus on Bengaluru DeepTech Hub"
            >
              <span className="hidden sm:inline">Bengaluru</span>
            </button>

            {/* Expand Fullscreen */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 p-1.5 rounded-xl transition-all shadow-md"
              title={isExpanded ? 'Collapse' : 'Expand full screen'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Interactive SVG Map Outer Viewport Container (Drag-to-pan & Wheel Zoom) */}
          <div
            ref={mapViewportRef}
            className={`relative flex-1 w-full h-full flex items-center justify-center overflow-hidden select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Inner Pan & Zoom Canvas */}
            <div
              ref={mapContainerRef}
              className="relative w-full h-full flex items-center justify-center will-change-transform"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
            {/* SVG Base Coastlines & Landmass */}
            {viewMode === 'world' ? (
              <WorldMapSvg width={WORLD_WIDTH} height={WORLD_HEIGHT} className="absolute inset-0" />
            ) : (
              <IndiaMapSvg width={INDIA_WIDTH} height={INDIA_HEIGHT} className="absolute inset-0" />
            )}

            {/* SVG Curved Flight / Innovation Corridor Arcs */}
            <svg
              viewBox={`0 0 ${viewMode === 'world' ? WORLD_WIDTH : INDIA_WIDTH} ${viewMode === 'world' ? WORLD_HEIGHT : INDIA_HEIGHT}`}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            >
              <defs>
                <linearGradient id="domesticArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#EAB308" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id="intlArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#818CF8" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#F97316" stopOpacity="0.85" />
                </linearGradient>

                <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {activeConnections.map(conn => {
                const source = NETWORK_CITIES.find(c => c.id === conn.from);
                const target = NETWORK_CITIES.find(c => c.id === conn.to);
                if (!source || !target) return null;

                const p1 = getCityCoordinates(source);
                const p2 = getCityCoordinates(target);

                const isCityConnected = selectedCityId && (conn.from === selectedCityId || conn.to === selectedCityId);

                // Quadratic Bezier Control Point to give realistic arc curvature
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Arc altitude proportional to distance
                const curveFactor = Math.min(dist * 0.25, 90);
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2 - curveFactor;

                const pathData = `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;

                return (
                  <g key={conn.id} className="transition-all duration-300">
                    {/* Shadow / Glow line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={conn.type === 'international' ? '#38BDF8' : '#F97316'}
                      strokeWidth={isCityConnected ? 3 : 1.2}
                      strokeOpacity={isCityConnected ? 0.7 : 0.25}
                      filter="url(#arcGlow)"
                    />

                    {/* Animated Pulsing Arc Line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={conn.type === 'international' ? 'url(#intlArcGrad)' : 'url(#domesticArcGrad)'}
                      strokeWidth={isCityConnected ? 2.5 : 1.5}
                      strokeDasharray={isCityConnected ? '8 4' : '5 6'}
                      className="animate-dash"
                      opacity={isCityConnected ? 1 : 0.65}
                    />

                    {/* Moving Light Particle along the arc */}
                    {isCityConnected && (
                      <circle r="3.5" fill="#FFFFFF" filter="url(#arcGlow)">
                        <animateMotion path={pathData} dur={`${Math.max(2, dist / 80)}s`} repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Concentric Proximity Distance Rings & Distance Rays */}
              {showDistanceRadar && selectedCity && (() => {
                const center = getCityCoordinates(selectedCity);
                const isIndia = viewMode === 'india';
                return (
                  <g className="proximity-distance-layer pointer-events-none">
                    {/* Concentric Distance Radar Rings */}
                    {isIndia ? (
                      <>
                        {/* 150 km Ring (Near City / Local Metro) */}
                        <circle cx={center.x} cy={center.y} r={46} stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" fill="rgba(56, 189, 248, 0.05)" />
                        <rect x={center.x + 38} y={center.y - 12} width="88" height="14" rx="4" fill="#0B1329" stroke="#38BDF8" strokeWidth="0.8" opacity="0.95" />
                        <text x={center.x + 82} y={center.y - 2} fill="#38BDF8" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">150 km (Near City)</text>

                        {/* 400 km Ring (Near State / Regional Cluster) */}
                        <circle cx={center.x} cy={center.y} r={120} stroke="#EAB308" strokeWidth="1" strokeDasharray="4 4" fill="rgba(234, 179, 8, 0.03)" />
                        <rect x={center.x + 105} y={center.y - 12} width="96" height="14" rx="4" fill="#0B1329" stroke="#EAB308" strokeWidth="0.8" opacity="0.95" />
                        <text x={center.x + 153} y={center.y - 2} fill="#EAB308" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">400 km (State Hubs)</text>

                        {/* 1,000 km Ring (Country / Inter-State Network) */}
                        <circle cx={center.x} cy={center.y} r={285} stroke="#10B981" strokeWidth="1" strokeDasharray="5 5" fill="none" opacity="0.55" />
                        <rect x={center.x + 265} y={center.y - 12} width="112" height="14" rx="4" fill="#0B1329" stroke="#10B981" strokeWidth="0.8" opacity="0.95" />
                        <text x={center.x + 321} y={center.y - 2} fill="#10B981" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">1,000 km (National Grid)</text>
                      </>
                    ) : (
                      <>
                        {/* 1,500 km Subcontinent Ring */}
                        <circle cx={center.x} cy={center.y} r={32} stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" fill="rgba(56, 189, 248, 0.05)" />
                        <rect x={center.x + 26} y={center.y - 11} width="90" height="13" rx="3" fill="#0B1329" stroke="#38BDF8" strokeWidth="0.8" opacity="0.95" />
                        <text x={center.x + 71} y={center.y - 2} fill="#38BDF8" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">1,500 km (Subcontinent)</text>

                        {/* 4,500 km Middle East / SE Asia */}
                        <circle cx={center.x} cy={center.y} r={82} stroke="#EAB308" strokeWidth="1" strokeDasharray="4 4" fill="rgba(234, 179, 8, 0.03)" />
                        <rect x={center.x + 72} y={center.y - 11} width="96" height="13" rx="3" fill="#0B1329" stroke="#EAB308" strokeWidth="0.8" opacity="0.95" />
                        <text x={center.x + 120} y={center.y - 2} fill="#EAB308" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">4,500 km (West/SE Asia)</text>

                        {/* 9,000 km Europe / East Asia */}
                        <circle cx={center.x} cy={center.y} r={165} stroke="#10B981" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5" />
                        <rect x={center.x + 150} y={center.y - 11} width="108" height="13" rx="3" fill="#0B1329" stroke="#10B981" strokeWidth="0.8" opacity="0.95" />
                        <text x={center.x + 204} y={center.y - 2} fill="#10B981" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">9,000 km (Europe/Asia)</text>
                      </>
                    )}

                    {/* Rotating Radar Scanner Sweep */}
                    <line
                      x1={center.x}
                      y1={center.y}
                      x2={center.x + (isIndia ? 285 : 165)}
                      y2={center.y}
                      stroke="#F97316"
                      strokeWidth="1.6"
                      strokeOpacity="0.75"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${center.x} ${center.y}`}
                        to={`360 ${center.x} ${center.y}`}
                        dur="7s"
                        repeatCount="indefinite"
                      />
                    </line>

                    {/* Distance Rays to Nearest Hubs with Real Kilometers */}
                    {distanceRays.map(ray => {
                      const mx = (ray.sourceCoords.x + ray.targetCoords.x) / 2;
                      const my = (ray.sourceCoords.y + ray.targetCoords.y) / 2;
                      return (
                        <g key={`ray-${ray.city.id}`}>
                          {/* Dotted Ray Line */}
                          <line
                            x1={ray.sourceCoords.x}
                            y1={ray.sourceCoords.y}
                            x2={ray.targetCoords.x}
                            y2={ray.targetCoords.y}
                            stroke={ray.city.countryCode === 'IN' ? '#EAB308' : '#38BDF8'}
                            strokeWidth="1.4"
                            strokeDasharray="4 3"
                            strokeOpacity="0.8"
                          />
                          {/* Distance Tag Box */}
                          <rect
                            x={mx - 25}
                            y={my - 7}
                            width="50"
                            height="14"
                            rx="4"
                            fill="#0B1329"
                            stroke={ray.city.countryCode === 'IN' ? '#EAB308' : '#38BDF8'}
                            strokeWidth="1"
                            opacity="0.95"
                          />
                          <text
                            x={mx}
                            y={my + 3}
                            fill="#FFFFFF"
                            fontSize="8"
                            fontWeight="bold"
                            fontFamily="monospace"
                            textAnchor="middle"
                          >
                            {ray.distanceKm.toLocaleString()} km
                          </text>
                        </g>
                      );
                    })}

                    {/* Active Challenge Direct Laser Beam with High-Visibility Distance Tag */}
                    {activeChallengeRay && (
                      <g key="active-challenge-beam">
                        {/* Glow halo */}
                        <line
                          x1={activeChallengeRay.sourceCoords.x}
                          y1={activeChallengeRay.sourceCoords.y}
                          x2={activeChallengeRay.targetCoords.x}
                          y2={activeChallengeRay.targetCoords.y}
                          stroke="#10B981"
                          strokeWidth="3.5"
                          strokeOpacity="0.4"
                          filter="url(#arcGlow)"
                        />
                        {/* Laser dash */}
                        <line
                          x1={activeChallengeRay.sourceCoords.x}
                          y1={activeChallengeRay.sourceCoords.y}
                          x2={activeChallengeRay.targetCoords.x}
                          y2={activeChallengeRay.targetCoords.y}
                          stroke="#34D399"
                          strokeWidth="2.2"
                          strokeDasharray="6 3"
                          className="animate-dash"
                        />
                        {/* Midpoint Distance Badge */}
                        {(() => {
                          const mx = (activeChallengeRay.sourceCoords.x + activeChallengeRay.targetCoords.x) / 2;
                          const my = (activeChallengeRay.sourceCoords.y + activeChallengeRay.targetCoords.y) / 2;
                          return (
                            <g>
                              <rect
                                x={mx - 62}
                                y={my - 12}
                                width="124"
                                height="22"
                                rx="6"
                                fill="#070D1E"
                                stroke="#10B981"
                                strokeWidth="1.5"
                                opacity="0.98"
                              />
                              <text
                                x={mx}
                                y={my + 3}
                                fill="#34D399"
                                fontSize="9"
                                fontWeight="bold"
                                fontFamily="monospace"
                                textAnchor="middle"
                              >
                                ⚡ {activeChallengeRay.distanceKm.toLocaleString()} km ({activeChallengeRay.bearing})
                              </text>
                            </g>
                          );
                        })()}
                      </g>
                    )}
                  </g>
                );
              })()}
            </svg>

            {/* City Point Markers (Rendered over map at exact geographic coordinates) */}
            {filteredCities.map(city => {
              const coords = getCityCoordinates(city);
              const isSelected = selectedCityId === city.id;
              const isHovered = hoveredCityId === city.id;

              // Percentage placement for responsive layout
              const mapWidth = viewMode === 'world' ? WORLD_WIDTH : INDIA_WIDTH;
              const mapHeight = viewMode === 'world' ? WORLD_HEIGHT : INDIA_HEIGHT;

              const leftPct = (coords.x / mapWidth) * 100;
              const topPct = (coords.y / mapHeight) * 100;

              return (
                <div
                  key={city.id}
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="absolute z-20 cursor-pointer"
                  onClick={(e) => {
                    if (hasMovedRef.current) return;
                    e.stopPropagation();
                    setSelectedCityId(city.id);
                  }}
                  onMouseEnter={() => setHoveredCityId(city.id)}
                  onMouseLeave={() => setHoveredCityId(null)}
                >
                  <motion.div
                    className="relative flex flex-col items-center group/node"
                    initial={{ scale: 0 }}
                    animate={{ scale: isSelected ? 1.3 : 1 }}
                    whileHover={{ scale: 1.25 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  >
                    {/* Animated Ripple Beacon on selected/hovered or challenge nodes */}
                    {(isSelected || isHovered || city.challengeCount > 0) && (
                      <div
                        className={`absolute w-9 h-9 rounded-full animate-ping opacity-40 ${
                          city.type === 'gov_challenge'
                            ? 'bg-emerald-400'
                            : city.type === 'global_partner'
                            ? 'bg-cyan-400'
                            : 'bg-orange-400'
                        }`}
                      />
                    )}

                    {/* Central Point Location Dot */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg transition-all duration-200 ${getNodeColor(
                        city.type,
                        isSelected
                      )}`}
                    >
                      {city.challengeCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-black" />
                      )}
                    </div>

                    {/* City Name Label Pill */}
                    <div
                      className={`mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-tight whitespace-nowrap backdrop-blur-md shadow-md border transition-all flex items-center space-x-1 ${
                        isSelected
                          ? 'bg-orange-500 text-white border-orange-400 shadow-orange-500/30'
                          : isHovered
                          ? 'bg-slate-800 text-white border-slate-600 scale-105'
                          : 'bg-slate-900/80 text-slate-300 border-slate-700/80'
                      }`}
                    >
                      <span>{city.flag}</span>
                      <span>{city.name}</span>
                    </div>

                    {/* Fast Hover Tooltip */}
                    {isHovered && !isSelected && (
                      <div className="absolute bottom-full mb-2 z-40 bg-slate-900 text-white border border-slate-700 p-2.5 rounded-xl shadow-2xl text-[11px] whitespace-nowrap min-w-[160px] pointer-events-none">
                        <div className="font-bold flex items-center justify-between text-slate-100">
                          <span>{city.name}, {city.countryCode}</span>
                          <span className="text-[10px] text-orange-400 font-mono">
                            {city.lat.toFixed(1)}°, {city.lng.toFixed(1)}°
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {city.startupCount} Startups • {city.challengeCount} Challenges
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {city.domain.slice(0, 2).map(d => (
                            <span key={d} className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] text-slate-300 font-mono">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}

            {/* Challenge Geo-Pins plotted on Map */}
            {CHALLENGE_LOCATIONS.filter(ch => viewMode === 'world' || ch.country === 'India').map(ch => {
              const coords = getChallengeCoordinates(ch);
              const isSelectedChallenge = selectedChallengeId === ch.id;
              const mapWidth = viewMode === 'world' ? WORLD_WIDTH : INDIA_WIDTH;
              const mapHeight = viewMode === 'world' ? WORLD_HEIGHT : INDIA_HEIGHT;
              const leftPct = (coords.x / mapWidth) * 100;
              const topPct = (coords.y / mapHeight) * 100;

              const dist = selectedCity ? calculateDistanceKm(selectedCity.lat, selectedCity.lng, ch.lat, ch.lng) : null;
              const bearing = selectedCity ? getCompassBearing(selectedCity.lat, selectedCity.lng, ch.lat, ch.lng) : '';

              return (
                <div
                  key={`ch-pin-${ch.id}`}
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: 'translate(-50%, -100%)'
                  }}
                  className="absolute z-25 cursor-pointer pointer-events-auto"
                  onClick={(e) => {
                    if (hasMovedRef.current) return;
                    e.stopPropagation();
                    handleBeamToChallenge(ch);
                  }}
                >
                  <div className="relative flex flex-col items-center group/ch">
                    {isSelectedChallenge && (
                      <div className="absolute -inset-2 rounded-full bg-emerald-400/40 animate-ping pointer-events-none" />
                    )}

                    {/* Challenge Pin Badge */}
                    <div className={`px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold flex items-center space-x-1 shadow-lg border transition-all ${
                      isSelectedChallenge
                        ? 'bg-emerald-500 text-white border-emerald-300 scale-110 ring-2 ring-white/70 shadow-emerald-500/50'
                        : 'bg-slate-900/90 text-emerald-400 border-emerald-500/50 hover:bg-emerald-950 hover:border-emerald-300 hover:scale-105'
                    }`}>
                      <Target className="w-2.5 h-2.5 text-emerald-400" />
                      <span>{ch.id}</span>
                    </div>

                    {/* Pin Stem */}
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow ring-1 ring-black" />

                    {/* Hover Tooltip with Live Distance */}
                    <div className="hidden group-hover/ch:flex flex-col absolute bottom-full mb-1 z-40 bg-slate-950 text-white border border-emerald-500/50 p-2 rounded-xl shadow-2xl text-[10px] whitespace-nowrap pointer-events-none min-w-[170px]">
                      <div className="font-bold text-emerald-400 flex items-center justify-between">
                        <span>{ch.id}: {ch.cityName}</span>
                        {dist !== null && (
                          <span className="text-[9px] font-mono text-white bg-emerald-600/50 px-1 py-0.2 rounded ml-1">
                            {dist.toLocaleString()} km ({bearing})
                          </span>
                        )}
                      </div>
                      <div className="text-slate-200 font-semibold truncate max-w-[190px] mt-0.5">{ch.title}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">{ch.department}</div>
                      <div className="text-[9px] text-orange-400 font-mono mt-0.5">{ch.tech} • {ch.budget}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>

          {/* Map Bottom Legend */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700/80 text-xs shadow-xl flex flex-wrap items-center gap-3.5 max-w-[calc(100%-250px)]">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-emerald-500/20 border border-emerald-500/40 rounded text-[9px] font-mono text-emerald-400 font-bold">
                <Target className="w-2.5 h-2.5" />
                <span>CH</span>
              </div>
              <span className="text-slate-300 font-medium text-[11px]">Civic Challenge Pin</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 shadow-xs"></div>
              <span className="text-slate-300 font-medium text-[11px]">Startup Hub (DPIIT)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs"></div>
              <span className="text-slate-300 font-medium text-[11px]">Govt Challenge Host</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-xs"></div>
              <span className="text-slate-300 font-medium text-[11px]">Hybrid Testbed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-xs"></div>
              <span className="text-slate-300 font-medium text-[11px]">Global Partner Corridor</span>
            </div>
          </div>

          {/* Map Bottom-Right Floating Zoom & Navigation HUD */}
          <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end space-y-2 pointer-events-auto">
            <div className="bg-slate-900/95 backdrop-blur-md p-2.5 rounded-2xl border border-slate-700/80 text-xs shadow-2xl flex flex-col space-y-2 min-w-[215px]">
              {/* HUD Header */}
              <div className="flex items-center justify-between px-1 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1.5">
                <div className="flex items-center space-x-1.5">
                  <Move className="w-3 h-3 text-cyan-400" />
                  <span>Zoom System</span>
                </div>
                <button
                  onClick={handleResetZoom}
                  className="hover:text-white transition-colors flex items-center space-x-1 text-slate-400 hover:text-cyan-400"
                  title="Reset zoom to 100% & center map"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span className="text-[9px]">Reset</span>
                </button>
              </div>

              {/* Primary Zoom Buttons Row */}
              <div className="flex items-center justify-between space-x-1.5 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.4}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-1 px-2.5"
                  title="Zoom Out (-)"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">Out</span>
                </button>

                {/* Clickable Zoom Percentage Badge */}
                <button
                  onClick={handleResetZoom}
                  className="px-2 py-0.5 rounded-md hover:bg-slate-800 transition-colors text-center"
                  title="Click to reset to 100%"
                >
                  <span className="font-mono font-bold text-xs text-orange-400">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                </button>

                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3.0}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-1 px-2.5"
                  title="Zoom In (+)"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">In</span>
                </button>
              </div>

              {/* Quick Presets Pills */}
              <div className="grid grid-cols-4 gap-1 pt-0.5">
                <button
                  onClick={() => handleZoomPreset(0.5)}
                  className={`px-1.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all ${
                    zoomLevel <= 0.55
                      ? 'bg-cyan-500 text-white shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                  title="50% Wide View (Zoom Out to see full world)"
                >
                  50%
                </button>
                <button
                  onClick={() => handleZoomPreset(0.75)}
                  className={`px-1.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all ${
                    zoomLevel > 0.55 && zoomLevel <= 0.85
                      ? 'bg-cyan-500 text-white shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                  title="75% Global View"
                >
                  75%
                </button>
                <button
                  onClick={() => handleZoomPreset(1.0)}
                  className={`px-1.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all ${
                    zoomLevel > 0.85 && zoomLevel <= 1.2
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                  title="100% Default Scale"
                >
                  100%
                </button>
                <button
                  onClick={() => handleZoomPreset(1.6)}
                  className={`px-1.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all ${
                    zoomLevel > 1.2
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                  title="160% Deep Inspection"
                >
                  160%
                </button>
              </div>

              {/* Micro Tip */}
              <div className="text-[9px] text-slate-500 font-mono text-center flex items-center justify-center space-x-1">
                <span>Scroll to zoom</span>
                <span>•</span>
                <span>Drag to pan</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Selected City Details Drawer / Interactive Panel */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <Card className="flex-1 p-4 sm:p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between overflow-y-auto max-h-[620px]">
            {selectedCity ? (
              <div className="space-y-4">
                {/* City Card Header & Anchor Indicator */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex-1 mr-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{selectedCity.flag}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                            {selectedCity.name}
                          </h2>
                          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            ANCHOR
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-0.5">
                          <span>{selectedCity.region}, {selectedCity.country}</span>
                          <span>•</span>
                          <span className="font-mono text-[11px] text-slate-400">
                            {selectedCity.lat.toFixed(2)}°N, {selectedCity.lng.toFixed(2)}°E
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={
                      selectedCity.type === 'gov_challenge'
                        ? 'success'
                        : selectedCity.type === 'global_partner'
                        ? 'info'
                        : 'warning'
                    }
                    className="text-[10px] uppercase font-bold tracking-wider shrink-0"
                  >
                    {selectedCity.type === 'hybrid'
                      ? 'Hybrid Testbed'
                      : selectedCity.type === 'gov_challenge'
                      ? 'Gov Challenge'
                      : selectedCity.type === 'global_partner'
                      ? 'Global Partner'
                      : 'Startup Hub'}
                  </Badge>
                </div>

                {/* Primary Inspector Tab Switcher */}
                <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                  <button
                    onClick={() => setActiveInspectorTab('proximity')}
                    className={`py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                      activeInspectorTab === 'proximity'
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Radar className="w-3.5 h-3.5" />
                    <span>Nearby Challenges</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      activeInspectorTab === 'proximity' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {challengesWithDistance.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveInspectorTab('profile')}
                    className={`py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                      activeInspectorTab === 'profile'
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>City Profile & Startups</span>
                  </button>
                </div>

                {/* TAB 1: NEARBY CHALLENGES WITH REAL-TIME DISTANCES ACROSS CITY, STATE, COUNTRY, WORLD */}
                {activeInspectorTab === 'proximity' && (
                  <div className="space-y-3.5">
                    {/* Proximity Distance Range Summary Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        onClick={() => setDistanceCategory('city')}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          distanceCategory === 'city'
                            ? 'bg-emerald-500/15 border-emerald-500 ring-1 ring-emerald-500/50'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70 hover:border-emerald-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">City</span>
                          <span className="text-[9px] font-mono text-slate-400">&lt;65km</span>
                        </div>
                        <div className="text-base font-extrabold text-slate-800 dark:text-white mt-0.5">
                          {nearCityChallengesCount}
                        </div>
                        <div className="text-[9px] text-slate-500 truncate">Immediate Wards</div>
                      </button>

                      <button
                        onClick={() => setDistanceCategory('state')}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          distanceCategory === 'state'
                            ? 'bg-amber-500/15 border-amber-500 ring-1 ring-amber-500/50'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70 hover:border-amber-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">State</span>
                          <span className="text-[9px] font-mono text-slate-400">&lt;550km</span>
                        </div>
                        <div className="text-base font-extrabold text-slate-800 dark:text-white mt-0.5">
                          {nearStateChallengesCount}
                        </div>
                        <div className="text-[9px] text-slate-500 truncate">Regional Hubs</div>
                      </button>

                      <button
                        onClick={() => setDistanceCategory('country')}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          distanceCategory === 'country'
                            ? 'bg-orange-500/15 border-orange-500 ring-1 ring-orange-500/50'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70 hover:border-orange-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase">Country</span>
                          <span className="text-[9px] font-mono text-slate-400">Bharat</span>
                        </div>
                        <div className="text-base font-extrabold text-slate-800 dark:text-white mt-0.5">
                          {countryChallengesCount}
                        </div>
                        <div className="text-[9px] text-slate-500 truncate">National Grid</div>
                      </button>

                      <button
                        onClick={() => setDistanceCategory('world')}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          distanceCategory === 'world'
                            ? 'bg-cyan-500/15 border-cyan-500 ring-1 ring-cyan-500/50'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70 hover:border-cyan-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-cyan-500 uppercase">World</span>
                          <span className="text-[9px] font-mono text-slate-400">Global</span>
                        </div>
                        <div className="text-base font-extrabold text-slate-800 dark:text-white mt-0.5">
                          {worldChallengesCount}
                        </div>
                        <div className="text-[9px] text-slate-500 truncate">Twin Sandboxes</div>
                      </button>
                    </div>

                    {/* Filter Pills for Distance Category */}
                    <div className="flex items-center space-x-1 overflow-x-auto pb-1">
                      {[
                        { id: 'all', label: 'All Distances', count: challengesWithDistance.length },
                        { id: 'city', label: '🏙️ Near City', count: nearCityChallengesCount },
                        { id: 'state', label: '🏛️ Near State', count: nearStateChallengesCount },
                        { id: 'country', label: '🇮🇳 Country Grid', count: countryChallengesCount },
                        { id: 'world', label: '🌍 World Hubs', count: worldChallengesCount }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setDistanceCategory(tab.id as any)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all flex items-center space-x-1 ${
                            distanceCategory === tab.id
                              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span className="text-[10px] opacity-75">({tab.count})</span>
                        </button>
                      ))}
                    </div>

                    {/* Challenge Cards List with Distance & Bearing */}
                    <div className="space-y-3">
                      {filteredChallengesByProximity.map(ch => {
                        const isSelected = selectedChallengeId === ch.id;
                        return (
                          <div
                            key={ch.id}
                            className={`p-3.5 rounded-xl border transition-all ${
                              isSelected
                                ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md'
                                : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            {/* Card Top: Distance Banner & Status */}
                            <div className="flex items-center justify-between gap-2 mb-2">
                              {/* Prominent Distance Badge */}
                              <div className="flex items-center space-x-1.5 flex-wrap">
                                <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold border ${ch.tierColor}`}>
                                  <Milestone className="w-3 h-3" />
                                  <span>{ch.isSameCity ? '0 km (In City)' : `${ch.distanceKm.toLocaleString()} km`}</span>
                                  {!ch.isSameCity && <span>• {ch.bearing}</span>}
                                </span>
                                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                  {ch.tierLabel}
                                </span>
                              </div>

                              <Badge
                                variant={ch.status === 'Active' ? 'success' : ch.status === 'Pilot' ? 'warning' : 'info'}
                                className="text-[9px] uppercase font-mono px-1.5 py-0.2 shrink-0"
                              >
                                {ch.status}
                              </Badge>
                            </div>

                            {/* Challenge Title & Department */}
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                              <span className="text-emerald-600 dark:text-emerald-400 mr-1.5 font-mono">[{ch.id}]</span>
                              {ch.title}
                            </h3>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center space-x-1">
                              <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{ch.department}</span>
                              <span>•</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-300">{ch.cityName}, {ch.state}</span>
                            </div>

                            {/* Tech & Budget */}
                            <div className="mt-2 flex flex-wrap items-center gap-1.5">
                              <span className="px-2 py-0.5 bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded text-[10px] font-mono font-semibold">
                                {ch.tech}
                              </span>
                              <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40 rounded text-[10px] font-mono font-bold">
                                Budget: {ch.budget}
                              </span>
                            </div>

                            {/* Summary */}
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                              {ch.summary}
                            </p>

                            {/* Cross-City Replication Corridor Targets */}
                            {(ch.replicableStateTargets.length > 0 || ch.globalTwinPartners.length > 0) && (
                              <div className="mt-2.5 pt-2 border-t border-slate-200/50 dark:border-slate-800/60 text-[10px] text-slate-500 space-y-1">
                                {ch.replicableStateTargets.length > 0 && (
                                  <div className="truncate">
                                    <span className="font-semibold text-slate-600 dark:text-slate-300">State replication:</span>{' '}
                                    {ch.replicableStateTargets.slice(0, 3).join(', ')}
                                  </div>
                                )}
                                {ch.globalTwinPartners.length > 0 && (
                                  <div className="truncate text-cyan-600 dark:text-cyan-400">
                                    <span className="font-semibold text-slate-600 dark:text-slate-300">Global twin:</span>{' '}
                                    {ch.globalTwinPartners.slice(0, 2).join(', ')}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
                              <button
                                onClick={() => handleBeamToChallenge(ch)}
                                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                                  isSelected
                                    ? 'bg-emerald-500 text-white shadow-xs'
                                    : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200/60 dark:border-emerald-800/50'
                                }`}
                                title="Draw laser ray on map and focus location"
                              >
                                <Route className="w-3.5 h-3.5" />
                                <span>{isSelected ? 'Beam Active on Map' : 'Beam Ray on Map'}</span>
                              </button>

                              <button
                                onClick={() => navigate('/challenges')}
                                className="py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1"
                              >
                                <span>Specs</span>
                                <ArrowUpRight className="w-3 h-3 text-slate-400" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 2: CITY PROFILE & STARTUPS */}
                {activeInspectorTab === 'profile' && (
                  <div className="space-y-4">
                    {/* City Innovation Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="p-3 bg-orange-50/70 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-xl text-center">
                        <div className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase">
                          Startups
                        </div>
                        <div className="text-lg font-extrabold text-orange-700 dark:text-orange-300 mt-0.5">
                          {selectedCity.startupCount}
                        </div>
                      </div>

                      <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-center">
                        <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                          Challenges
                        </div>
                        <div className="text-lg font-extrabold text-emerald-700 dark:text-emerald-300 mt-0.5">
                          {selectedCity.challengeCount}
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50/70 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl text-center">
                        <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                          Pilots Run
                        </div>
                        <div className="text-lg font-extrabold text-blue-700 dark:text-blue-300 mt-0.5">
                          {selectedCity.pilotCount}
                        </div>
                      </div>
                    </div>

                    {/* Technology Domains */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Core Technology Competencies
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCity.domain.map(d => (
                          <span
                            key={d}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* City Innovation Mandate */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Innovation & Procurement Profile
                      </label>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {selectedCity.description}
                      </p>
                    </div>

                    {/* Key Initiatives / Testbeds */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Active Civic Sandboxes & Initiatives
                      </label>
                      <ul className="space-y-1.5">
                        {selectedCity.keyInitiatives.map((init, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{init}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Featured Startups / Entities */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Featured Startups & Anchors
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCity.featuredEntities.map((ent, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center space-x-1 px-2.5 py-1 bg-orange-50 dark:bg-slate-800 border border-orange-200/50 dark:border-slate-700 text-orange-800 dark:text-orange-300 rounded-lg text-xs font-medium"
                          >
                            <Building2 className="w-3 h-3 text-orange-500" />
                            <span>{ent}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Connected Innovation Corridors */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Direct Innovation Corridors
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCity.connectedTo.map(cityId => {
                          const target = NETWORK_CITIES.find(c => c.id === cityId);
                          if (!target) return null;
                          return (
                            <button
                              key={cityId}
                              onClick={() => handleFocusCity(cityId)}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-[11px] font-medium transition-colors flex items-center space-x-1"
                            >
                              <span>{target.flag}</span>
                              <span>{target.name}</span>
                              <ArrowUpRight className="w-3 h-3 text-slate-400" />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <Button
                        onClick={() => navigate('/discovery')}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold"
                      >
                        <Search className="w-3.5 h-3.5 mr-1.5" />
                        Discover Startups
                      </Button>
                      {selectedCity.challengeCount > 0 ? (
                        <Button
                          onClick={() => navigate('/challenges')}
                          variant="outline"
                          className="flex-1 text-xs font-bold"
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                          View Challenges
                        </Button>
                      ) : (
                        <Button
                          onClick={() => navigate('/pilot')}
                          variant="outline"
                          className="flex-1 text-xs font-bold"
                        >
                          <Activity className="w-3.5 h-3.5 mr-1.5" />
                          Pilot Sandbox
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-slate-400">
                <MapPin className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Select a City on the Map
                </p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Click on any city point marker to examine local startups, municipal testbeds, and cross-border innovation links.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
