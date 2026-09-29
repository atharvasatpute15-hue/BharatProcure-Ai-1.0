export interface NetworkCity {
  id: string;
  name: string;
  region: string;
  country: string;
  countryCode: string;
  flag: string;
  lat: number;
  lng: number;
  type: 'startup_hub' | 'gov_challenge' | 'global_partner' | 'hybrid';
  domain: string[];
  startupCount: number;
  challengeCount: number;
  pilotCount: number;
  description: string;
  keyInitiatives: string[];
  featuredEntities: string[];
  connectedTo: string[];
}

export interface NetworkConnection {
  id: string;
  from: string;
  to: string;
  type: 'domestic' | 'international';
  corridorName: string;
  techFocus: string;
}

export const NETWORK_CITIES: NetworkCity[] = [
  // --- Indian Core Innovation & Municipal Testbeds ---
  {
    id: 'pune',
    name: 'Pune',
    region: 'Maharashtra',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 18.5204,
    lng: 73.8567,
    type: 'hybrid',
    domain: ['WaterTech', 'AI & IoT', 'Smart Mobility', 'AutoTech'],
    startupCount: 42,
    challengeCount: 2,
    pilotCount: 6,
    description: 'Premier IoT & civic-engineering hub. Pilot host for PMC sub-surface acoustic water leakage detection.',
    keyInitiatives: [
      'PMC Smart Water Grid & Acoustic Leakage Grid',
      'Smart City Command & Control Centre (ICCC) Integration',
      'Auto-component IoT Innovation Cluster'
    ],
    featuredEntities: ['AquaSense Technologies', 'Pune Municipal Corporation', 'COEP Innovation Hub'],
    connectedTo: ['mumbai', 'bengaluru', 'delhi', 'san_francisco', 'tokyo']
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    region: 'Maharashtra',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 19.0760,
    lng: 72.8777,
    type: 'hybrid',
    domain: ['CivicTech', 'Computer Vision', 'FinTech', 'Maritime IoT'],
    startupCount: 68,
    challengeCount: 3,
    pilotCount: 8,
    description: 'Financial capital and massive municipal sandbox. BMC host for AI vehicle pothole mapping and port logistics.',
    keyInitiatives: [
      'Brihanmumbai Municipal Corp (BMC) Road Defect LiDAR Mapping',
      'Jawaharlal Nehru Port AI Logistics Optimization',
      'State Disaster Early Warning Flood Telemetry'
    ],
    featuredEntities: ['HydroVision Labs', 'BMC Disaster Cell', 'IIT Bombay SINE'],
    connectedTo: ['pune', 'bengaluru', 'singapore', 'dubai', 'london']
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    region: 'Karnataka',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 12.9716,
    lng: 77.5946,
    type: 'hybrid',
    domain: ['DeepTech', 'Computer Vision', 'SpaceTech', 'Edge AI', 'WaterTech'],
    startupCount: 145,
    challengeCount: 3,
    pilotCount: 14,
    description: 'Silicon Valley of India. BBMP host for Computer Vision Adaptive Traffic Signals on Outer Ring Road corridor.',
    keyInitiatives: [
      'BBMP & Traffic Police Adaptive Signal Grid',
      'BWSSB Smart Water Distribution Analytics',
      'DPIIT DeepTech & Drone Proving Grounds'
    ],
    featuredEntities: ['JalAI Systems', 'Bengaluru Traffic Command', 'IISc Tech Incubator'],
    connectedTo: ['pune', 'mumbai', 'hyderabad', 'chennai', 'delhi', 'san_francisco', 'london', 'tokyo', 'singapore']
  },
  {
    id: 'delhi',
    name: 'New Delhi / NCR',
    region: 'National Capital Region',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 28.6139,
    lng: 77.2090,
    type: 'hybrid',
    domain: ['GovTech', 'Clean Energy', 'HealthTech', 'Public Procurement', 'Air Quality'],
    startupCount: 92,
    challengeCount: 4,
    pilotCount: 9,
    description: 'National governance & policy headquarters. Host of DPIIT Startup India, GeM procurement portal, and DPCC air sensing.',
    keyInitiatives: [
      'DPCC Micro-sensor Air Quality Network',
      'Ayushman Bharat Digital Health Mission Interoperability',
      'GeM Startup Runway Direct Procurement'
    ],
    featuredEntities: ['SolarGrid AI', 'Ministry of Health & Family Welfare', 'IIT Delhi FITT'],
    connectedTo: ['bengaluru', 'mumbai', 'lucknow', 'jaipur', 'london', 'san_francisco', 'berlin', 'paris']
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    region: 'Telangana',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 17.3850,
    lng: 78.4867,
    type: 'startup_hub',
    domain: ['BioTech', 'Drones', 'CyberDefense', 'Aerospace', 'AI'],
    startupCount: 76,
    challengeCount: 2,
    pilotCount: 7,
    description: 'Genome Valley and premier hardware-software prototyping hub anchored by T-Hub and Telangana Emerging Tech wing.',
    keyInitiatives: [
      'Medicine from the Sky Drone Delivery Corridors',
      'State Cyber Security Operations Center Sandbox',
      'Smart Agriculture Soil Health AI Sensing'
    ],
    featuredEntities: ['CyberShield AI', 'T-Hub', 'Telangana IT & Industries Dept'],
    connectedTo: ['bengaluru', 'chennai', 'dubai', 'tel_aviv']
  },
  {
    id: 'chennai',
    name: 'Chennai',
    region: 'Tamil Nadu',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 13.0827,
    lng: 80.2707,
    type: 'startup_hub',
    domain: ['AutoTech', 'SaaS', 'Coastal Resilience', 'Sensors'],
    startupCount: 58,
    challengeCount: 2,
    pilotCount: 5,
    description: 'Automotive and industrial SaaS powerhouse. Pioneer in flood drainage sensory networks and desalination.',
    keyInitiatives: [
      'Greater Chennai Corp Smart Stormwater IoT',
      'Tamil Nadu Ocean Energy & Desalination Testing',
      'Autonomous Electric Bus Corridor'
    ],
    featuredEntities: ['GeoSpatial Dynamics', 'IIT Madras Research Park', 'Guidance Tamil Nadu'],
    connectedTo: ['bengaluru', 'hyderabad', 'singapore', 'sydney']
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad / GIFT',
    region: 'Gujarat',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 23.0225,
    lng: 72.5714,
    type: 'startup_hub',
    domain: ['FinTech', 'Green Hydrogen', 'Smart Water', 'CleanTech'],
    startupCount: 44,
    challengeCount: 1,
    pilotCount: 4,
    description: 'GIFT City international financial sandbox and Sabarmati Clean City municipal tech accelerator.',
    keyInitiatives: [
      'GIFT City Regulatory FinTech Sandbox',
      'AMC Smart Water Metering Infrastructure',
      'Renewable Energy Integration Grid'
    ],
    featuredEntities: ['FinTech Labs Gujarat', 'iCreate Incubation', 'AMC Urban Cell'],
    connectedTo: ['mumbai', 'delhi', 'dubai', 'tel_aviv']
  },
  {
    id: 'surat',
    name: 'Surat',
    region: 'Gujarat',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 21.1702,
    lng: 72.8311,
    type: 'gov_challenge',
    domain: ['Waste-to-Energy', 'Textile Automation', 'Smart Sanitation'],
    startupCount: 24,
    challengeCount: 1,
    pilotCount: 3,
    description: 'Leading smart city ranked #1 in urban cleanliness execution. Host for biochemical solid waste-to-biogas plants.',
    keyInitiatives: [
      'Surat Municipal Corp Decentralized Biogas Digestion',
      'Industrial Effluent AI Monitoring System',
      'Automated Recycling Robotic Sorting'
    ],
    featuredEntities: ['CleanCity BioTech', 'Surat Municipal Corporation'],
    connectedTo: ['ahmedabad', 'mumbai']
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    region: 'Uttar Pradesh',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 26.8467,
    lng: 80.9462,
    type: 'gov_challenge',
    domain: ['Rural HealthTech', 'Tele-Diagnostics', 'AgriSense'],
    startupCount: 29,
    challengeCount: 1,
    pilotCount: 4,
    description: 'Health & Family Welfare testing center for AI diagnostic kiosks deployed across rural Community Health Centers.',
    keyInitiatives: [
      'Rural Tele-diagnostic AI Kiosk Network',
      'UP State Health Mission Rapid Screening',
      'Sub-center Diagnostic Telemetry'
    ],
    featuredEntities: ['AgriSense India', 'UP State Health Mission', 'IIT Kanpur Incubator'],
    connectedTo: ['delhi', 'kolkata']
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    region: 'West Bengal',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 22.5726,
    lng: 88.3639,
    type: 'startup_hub',
    domain: ['RiverTech', 'BioWaste', 'Smart Logistics', 'Robotics'],
    startupCount: 38,
    challengeCount: 1,
    pilotCount: 3,
    description: 'Eastern India digital gateway. Focused on River Ganga water quality sensing and KMDA waste management.',
    keyInitiatives: [
      'National Mission for Clean Ganga Sensory Grid',
      'KMDA Solid Waste Robotic Recovery',
      'Port River Traffic Vessel Telematics'
    ],
    featuredEntities: ['EcoWaste Systems', 'KMDA Urban Lab', 'Jadavpur University Labs'],
    connectedTo: ['delhi', 'lucknow', 'singapore']
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    region: 'Rajasthan',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 26.9124,
    lng: 75.7873,
    type: 'startup_hub',
    domain: ['Solar Energy', 'Smart Tourism', 'Water Harvesting', 'Civic AI'],
    startupCount: 31,
    challengeCount: 1,
    pilotCount: 3,
    description: 'Rajasthan iStart hub focusing on mega-solar optimization, heritage tourism digital twins, and desert water harvesting.',
    keyInitiatives: [
      'Rajasthan iStart Scaleup Grants',
      'Solar Rooftop Grid Edge Telemetry',
      'Smart Heritage Crowd Management AI'
    ],
    featuredEntities: ['SolarScale Rajasthan', 'iStart Hub Jaipur'],
    connectedTo: ['delhi', 'ahmedabad']
  },
  {
    id: 'kochi',
    name: 'Kochi',
    region: 'Kerala',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 9.9312,
    lng: 76.2673,
    type: 'startup_hub',
    domain: ['Marine Robotics', 'Water Metro IoT', 'EcoTech', 'MedTech'],
    startupCount: 35,
    challengeCount: 1,
    pilotCount: 4,
    description: 'Kerala Startup Mission epicenter. Pioneer of automated electric Water Metro and underwater pipeline inspection drones.',
    keyInitiatives: [
      'Kochi Water Metro Automated Vessel Control',
      'Underwater Hull & Pipeline Submersible Inspection',
      'Digital University Kerala AI Drone Academy'
    ],
    featuredEntities: ['MarineBotix Kerala', 'Kerala Startup Mission', 'Maker Village'],
    connectedTo: ['bengaluru', 'chennai', 'singapore']
  },
  {
    id: 'indore',
    name: 'Indore',
    region: 'Madhya Pradesh',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    lat: 22.7196,
    lng: 75.8577,
    type: 'gov_challenge',
    domain: ['Swachh Bharat', 'Smart Sanitation', 'Civic Robotics', 'Zero Waste'],
    startupCount: 22,
    challengeCount: 1,
    pilotCount: 3,
    description: 'India\'s cleanest city for 7 consecutive years. Benchmark testbed for 100% mechanized waste tracking and carbon credits.',
    keyInitiatives: [
      'Indore 7-Star Garbage-Free Verification Grid',
      'GPS & RFID Fleet Route Sanitation Telematics',
      'Municipal Carbon Credits Verification'
    ],
    featuredEntities: ['Indore Municipal Corp (IMC)', 'EcoTech Central', 'IIM Indore Incubation'],
    connectedTo: ['pune', 'delhi', 'ahmedabad']
  },

  // --- Global Partner Cities & International Tech Corridors ---
  {
    id: 'san_francisco',
    name: 'San Francisco / Silicon Valley',
    region: 'California',
    country: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    lat: 37.7749,
    lng: -122.4194,
    type: 'global_partner',
    domain: ['Generative AI', 'DeepTech', 'Quantum Computing', 'iCET Corridor'],
    startupCount: 190,
    challengeCount: 0,
    pilotCount: 12,
    description: 'World epicentre of venture capital & frontier AI. Core node of Indo-US Critical & Emerging Technology (iCET) bridge.',
    keyInitiatives: [
      'US-India iCET Strategic Tech Sandbox',
      'Cross-Border Open-Source AI Co-Development',
      'Venture Pilot Syndication for DPI'
    ],
    featuredEntities: ['Silicon Valley India Forum', 'Stanford AI Lab', 'Plug and Play'],
    connectedTo: ['bengaluru', 'delhi', 'pune', 'london', 'tokyo']
  },
  {
    id: 'london',
    name: 'London',
    region: 'Greater London',
    country: 'United Kingdom',
    countryCode: 'GB',
    flag: '🇬🇧',
    lat: 51.5074,
    lng: -0.1278,
    type: 'global_partner',
    domain: ['ClimateTech', 'Green Finance', 'GovTech', 'LegalTech'],
    startupCount: 110,
    challengeCount: 0,
    pilotCount: 8,
    description: 'Global financial capital and pioneer in municipal net-zero sandboxes. UK-India Tech Bridge anchor.',
    keyInitiatives: [
      'UK-India Fast-Track Tech Bridge',
      'London Climate Action Week Municipal Sandboxes',
      'Imperial College CleanTech Accelerator'
    ],
    featuredEntities: ['Catapult Connected Places', 'Tech Nation UK', 'City of London Corp'],
    connectedTo: ['delhi', 'mumbai', 'bengaluru', 'berlin', 'san_francisco']
  },
  {
    id: 'singapore',
    name: 'Singapore',
    region: 'Central',
    country: 'Singapore',
    countryCode: 'SG',
    flag: '🇸🇬',
    lat: 1.3521,
    lng: 103.8198,
    type: 'global_partner',
    domain: ['Smart Nation', 'GovTech', 'FinTech', 'Maritime Logistics', 'WaterTech'],
    startupCount: 95,
    challengeCount: 0,
    pilotCount: 11,
    description: 'Global benchmark for Smart Nation governance. Active cross-border UPI-PayNow linkage and port automation sandbox.',
    keyInitiatives: [
      'GovTech Singapore Smart Nation Sandbox',
      'PUB Singapore NEWater R&D Consortium',
      'ASEAN-India Startup Corridors'
    ],
    featuredEntities: ['GovTech Singapore', 'Enterprise Singapore', 'PUB Singapore'],
    connectedTo: ['mumbai', 'bengaluru', 'chennai', 'kochi', 'kolkata', 'tokyo']
  },
  {
    id: 'dubai',
    name: 'Dubai',
    region: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    flag: '🇦🇪',
    lat: 25.2048,
    lng: 55.2708,
    type: 'global_partner',
    domain: ['AI Governance', 'Smart Ports', 'Future Mobility', 'Clean Energy'],
    startupCount: 82,
    challengeCount: 0,
    pilotCount: 9,
    description: 'Gateway to the Middle East & Africa. Key partner under India-UAE CEPA for pilot scaling and paperless governance.',
    keyInitiatives: [
      'Dubai Future Foundation Sandboxes',
      'India-UAE CEPA Tech Acceleration Corridor',
      'RTA Autonomous Transit Pilot Grid'
    ],
    featuredEntities: ['Dubai Future Labs', 'DIFC Innovation Hub', 'Dubai AI Campus'],
    connectedTo: ['mumbai', 'hyderabad', 'ahmedabad', 'delhi', 'london']
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    region: 'Kanto',
    country: 'Japan',
    countryCode: 'JP',
    flag: '🇯🇵',
    lat: 35.6762,
    lng: 139.6503,
    type: 'global_partner',
    domain: ['Robotics', 'High-Speed Rail IoT', 'Disaster Resilience', 'Semiconductors'],
    startupCount: 88,
    challengeCount: 0,
    pilotCount: 7,
    description: 'Pioneer of Society 5.0 and earthquake resilience. Japan-India Digital Partnership (IJDP) collaborator.',
    keyInitiatives: [
      'IJDP (India-Japan Digital Partnership) Bilateral Fund',
      'Tokyo Metropolitan Gov Smart Infrastructure',
      'Autonomous Sensor Railway Safety Corridor'
    ],
    featuredEntities: ['JETRO Startup Hub', 'University of Tokyo Edge AI Lab', 'NEDO'],
    connectedTo: ['bengaluru', 'pune', 'delhi', 'singapore', 'san_francisco']
  },
  {
    id: 'berlin',
    name: 'Berlin',
    region: 'Berlin State',
    country: 'Germany',
    countryCode: 'DE',
    flag: '🇩🇪',
    lat: 52.5200,
    lng: 13.4050,
    type: 'global_partner',
    domain: ['Industry 4.0', 'Smart Grids', 'Clean Mobility', 'Data Privacy'],
    startupCount: 72,
    challengeCount: 0,
    pilotCount: 6,
    description: 'European startup capital and leader in Industry 4.0 IoT standards and Indo-German Green Energy partnership.',
    keyInitiatives: [
      'Indo-German Green and Sustainable Development Partnership',
      'Berlin Partner Smart City Forum',
      'Fraunhofer Smart Grid Testbeds'
    ],
    featuredEntities: ['Fraunhofer FOKUS', 'Berlin Partner', 'Factory Berlin'],
    connectedTo: ['delhi', 'bengaluru', 'london', 'paris']
  },
  {
    id: 'tel_aviv',
    name: 'Tel Aviv',
    region: 'Gush Dan',
    country: 'Israel',
    countryCode: 'IL',
    flag: '🇮🇱',
    lat: 32.0853,
    lng: 34.7818,
    type: 'global_partner',
    domain: ['WaterTech', 'CyberDefense', 'Precision AgriTech', 'Desalination'],
    startupCount: 65,
    challengeCount: 0,
    pilotCount: 8,
    description: 'Global leader in water recycling (>90%) and cyber innovation. India-Israel Innovation Bridge partner.',
    keyInitiatives: [
      'India-Israel Industrial R&D and Tech Innovation Fund (I4F)',
      'WaterTech Drip Irrigation & Desalination Bridge',
      'National Cyber Defense Collaboration'
    ],
    featuredEntities: ['Israel Innovation Authority', 'Mekorot Water Innovation', 'SNC Tel Aviv'],
    connectedTo: ['pune', 'ahmedabad', 'hyderabad', 'bengaluru']
  },
  {
    id: 'seoul',
    name: 'Seoul',
    region: 'Seoul Capital Area',
    country: 'South Korea',
    countryCode: 'KR',
    flag: '🇰🇷',
    lat: 37.5665,
    lng: 126.9780,
    type: 'global_partner',
    domain: ['Urban Digital Twins', 'Smart Transit', '6G Telemetry', 'Robotics'],
    startupCount: 54,
    challengeCount: 0,
    pilotCount: 5,
    description: 'World-renowned digital twin city. Host of Seoul Metaverse government services and autonomous smart bus lines.',
    keyInitiatives: [
      'Seoul Smart City Platform (S-DoT) Sensor Grid',
      'Korea-India Tech Scaleup Program',
      'Autonomous Night Bus Transit Pilot'
    ],
    featuredEntities: ['Seoul Digital Foundation', 'K-Startup Grand Challenge', 'KAIST'],
    connectedTo: ['bengaluru', 'tokyo', 'singapore']
  },
  {
    id: 'toronto',
    name: 'Toronto',
    region: 'Ontario',
    country: 'Canada',
    countryCode: 'CA',
    flag: '🇨🇦',
    lat: 43.6532,
    lng: -79.3832,
    type: 'global_partner',
    domain: ['AI Research', 'Water Cleanliness', 'Clean Energy', 'MedTech'],
    startupCount: 60,
    challengeCount: 0,
    pilotCount: 5,
    description: 'Global AI theory powerhouse anchored by Vector Institute and Great Lakes fresh water preservation initiatives.',
    keyInitiatives: [
      'Vector Institute AI Procurement Ethics',
      'Water Institute Great Lakes Sensor Consortium',
      'MaRS Discovery District Indo-Canada Stream'
    ],
    featuredEntities: ['MaRS Discovery District', 'Vector Institute', 'WaterTap Ontario'],
    connectedTo: ['delhi', 'bengaluru', 'san_francisco']
  },
  {
    id: 'sydney',
    name: 'Sydney',
    region: 'New South Wales',
    country: 'Australia',
    countryCode: 'AU',
    flag: '🇦🇺',
    lat: -33.8688,
    lng: 151.2093,
    type: 'global_partner',
    domain: ['Renewables', 'Critical Minerals Tech', 'Disaster Resilience', 'Marine Tech'],
    startupCount: 48,
    challengeCount: 0,
    pilotCount: 4,
    description: 'Key Indo-Pacific Quad partner for renewable storage, early bushfire AI detection, and critical minerals processing.',
    keyInitiatives: [
      'Australia-India Critical Technology Bridge',
      'NSW Smart Sensing Network (NSSN)',
      'Bushfire & Flood Early Sensor Warning'
    ],
    featuredEntities: ['Tech Central Sydney', 'CSIRO Energy', 'NSSN Network'],
    connectedTo: ['chennai', 'bengaluru', 'singapore']
  },
  {
    id: 'nairobi',
    name: 'Nairobi',
    region: 'Nairobi County',
    country: 'Kenya',
    countryCode: 'KE',
    flag: '🇰🇪',
    lat: -1.2921,
    lng: 36.8219,
    type: 'global_partner',
    domain: ['Digital Public Infra', 'Mobile Agritech', 'Solar Microgrids', 'FinTech'],
    startupCount: 36,
    challengeCount: 0,
    pilotCount: 4,
    description: 'Silicon Savannah and gateway for India\'s Digital Public Infrastructure (UPI / Aadhaar stack) tech exports to Africa.',
    keyInitiatives: [
      'Global South DPI Tech Transfer Corridor',
      'Solar Off-Grid Telemetry Pilot',
      'Mobile Agricultural Tele-advisory'
    ],
    featuredEntities: ['iHub Nairobi', 'Kenya ICT Authority', 'Nairobi Garage'],
    connectedTo: ['mumbai', 'delhi', 'dubai']
  },
  {
    id: 'paris',
    name: 'Paris',
    region: 'Île-de-France',
    country: 'France',
    countryCode: 'FR',
    flag: '🇫🇷',
    lat: 48.8566,
    lng: 2.3522,
    type: 'global_partner',
    domain: ['International Solar Alliance', 'Aerospace AI', 'Smart Mobility', 'GovTech'],
    startupCount: 70,
    challengeCount: 0,
    pilotCount: 6,
    description: 'Co-founder of International Solar Alliance (ISA) with India. Pioneer of 15-minute city micro-mobility sensors.',
    keyInitiatives: [
      'International Solar Alliance (ISA) Global Grid Telemetry',
      'Paris 2024 Olympic Smart Transit Legacy',
      'Station F Indo-French Tech Bridge'
    ],
    featuredEntities: ['Station F', 'International Solar Alliance HQ', 'Choose Paris Region'],
    connectedTo: ['delhi', 'bengaluru', 'london', 'berlin']
  }
];

export const NETWORK_CONNECTIONS: NetworkConnection[] = [
  // Domestic Hubs
  { id: 'c-pun-mum', from: 'pune', to: 'mumbai', type: 'domestic', corridorName: 'Maharashtra Urban Corridor', techFocus: 'WaterTech & Road Surface LiDAR' },
  { id: 'c-mum-blr', from: 'mumbai', to: 'bengaluru', type: 'domestic', corridorName: 'West-South Tech Backbone', techFocus: 'Computer Vision & Traffic AI' },
  { id: 'c-pun-blr', from: 'pune', to: 'bengaluru', type: 'domestic', corridorName: 'IoT Innovation Highway', techFocus: 'IoT Sensor Grids & Anomaly Detection' },
  { id: 'c-blr-del', from: 'bengaluru', to: 'delhi', type: 'domestic', corridorName: 'National Scaleup Highway', techFocus: 'DPIIT Startup Procurement & MoHFW' },
  { id: 'c-blr-hyd', from: 'bengaluru', to: 'hyderabad', type: 'domestic', corridorName: 'Deccan Tech Corridor', techFocus: 'AI Hardware & Drone Testing' },
  { id: 'c-blr-chn', from: 'bengaluru', to: 'chennai', type: 'domestic', corridorName: 'South Industrial Axis', techFocus: 'Autonomous Transit & Stormwater IoT' },
  { id: 'c-mum-ahm', from: 'mumbai', to: 'ahmedabad', type: 'domestic', corridorName: 'Western Financial Corridor', techFocus: 'FinTech & Smart Metering' },
  { id: 'c-ahm-sur', from: 'ahmedabad', to: 'surat', type: 'domestic', corridorName: 'Gujarat CleanTech Belt', techFocus: 'Waste-to-Energy Biogas' },
  { id: 'c-del-lko', from: 'delhi', to: 'lucknow', type: 'domestic', corridorName: 'Northern Health Corridor', techFocus: 'Rural Tele-diagnostics Kiosks' },
  { id: 'c-del-jpr', from: 'delhi', to: 'jaipur', type: 'domestic', corridorName: 'Desert Solar Highway', techFocus: 'Solar Grid AI & Clean Energy' },
  { id: 'c-lko-kol', from: 'lucknow', to: 'kolkata', type: 'domestic', corridorName: 'Ganga Basin Sensory Network', techFocus: 'River Cleanliness & Municipal Waste' },
  { id: 'c-blr-kch', from: 'bengaluru', to: 'kochi', type: 'domestic', corridorName: 'Coastal Marine Corridor', techFocus: 'Water Metro Robotics' },
  { id: 'c-pun-ind', from: 'pune', to: 'indore', type: 'domestic', corridorName: 'Central Clean City Axis', techFocus: 'Swachh Bharat 7-Star Verification' },

  // International Corridors
  { id: 'c-blr-sfo', from: 'bengaluru', to: 'san_francisco', type: 'international', corridorName: 'Indo-US iCET Frontier Bridge', techFocus: 'Frontier AI & Quantum Computing' },
  { id: 'c-del-sfo', from: 'delhi', to: 'san_francisco', type: 'international', corridorName: 'Strategic Technology Dialogue', techFocus: 'GovTech & Open Standards' },
  { id: 'c-pun-sfo', from: 'pune', to: 'san_francisco', type: 'international', corridorName: 'IoT Sensor Exchange', techFocus: 'Acoustic Pipeline Anomaly Models' },
  { id: 'c-del-lon', from: 'delhi', to: 'london', type: 'international', corridorName: 'UK-India Tech Bridge', techFocus: 'ClimateTech & Net-Zero Sandboxes' },
  { id: 'c-mum-lon', from: 'mumbai', to: 'london', type: 'international', corridorName: 'Green Finance & Civic Corridors', techFocus: 'Municipal Green Bonds & Climate AI' },
  { id: 'c-mum-sin', from: 'mumbai', to: 'singapore', type: 'international', corridorName: 'Maritime & FinTech Expressway', techFocus: 'Port Automation & UPI-PayNow' },
  { id: 'c-blr-sin', from: 'bengaluru', to: 'singapore', type: 'international', corridorName: 'Smart Nation Scaleup Sandbox', techFocus: 'GovTech Microservices & Urban AI' },
  { id: 'c-mum-dxb', from: 'mumbai', to: 'dubai', type: 'international', corridorName: 'India-UAE CEPA Corridor', techFocus: 'Smart Governance & Paperless Cities' },
  { id: 'c-hyd-dxb', from: 'hyderabad', to: 'dubai', type: 'international', corridorName: 'Gulf HealthTech & AI Bridge', techFocus: 'Tele-health & Drone Logistics' },
  { id: 'c-blr-tky', from: 'bengaluru', to: 'tokyo', type: 'international', corridorName: 'IJDP Robotics Partnership', techFocus: 'High-speed Rail IoT & Edge Sensors' },
  { id: 'c-pun-tky', from: 'pune', to: 'tokyo', type: 'international', corridorName: 'Industrial Sensor Innovation', techFocus: 'Vibration & Acoustic Diagnostics' },
  { id: 'c-del-ber', from: 'delhi', to: 'berlin', type: 'international', corridorName: 'Indo-German Green Energy Bridge', techFocus: 'Renewable Smart Grids & Industry 4.0' },
  { id: 'c-ahm-tlv', from: 'ahmedabad', to: 'tel_aviv', type: 'international', corridorName: 'India-Israel Water & Agro Corridor', techFocus: 'Desalination & Precision Drip AI' },
  { id: 'c-pun-tlv', from: 'pune', to: 'tel_aviv', type: 'international', corridorName: 'Acoustic Leakage Tech Transfer', techFocus: 'Sub-surface Hydro-Acoustic Sensors' },
  { id: 'c-blr-seo', from: 'bengaluru', to: 'seoul', type: 'international', corridorName: 'Digital Twin Highway', techFocus: 'Urban Telemetry & Autonomous Transit' },
  { id: 'c-del-tor', from: 'delhi', to: 'toronto', type: 'international', corridorName: 'Commonwealth AI Research Bridge', techFocus: 'Responsible AI & Clean Water' },
  { id: 'c-chn-syd', from: 'chennai', to: 'sydney', type: 'international', corridorName: 'Indo-Pacific Resilience Corridor', techFocus: 'Disaster Sensors & Renewable Storage' },
  { id: 'c-mum-nbo', from: 'mumbai', to: 'nairobi', type: 'international', corridorName: 'Global South DPI Export Gateway', techFocus: 'Digital Public Infrastructure (UPI/ID)' },
  { id: 'c-del-par', from: 'delhi', to: 'paris', type: 'international', corridorName: 'International Solar Alliance Corridor', techFocus: 'Solar Grid Telemetry & Aerospace AI' }
];

/**
 * Projects latitude and longitude to standard equirectangular SVG coordinates (0..width, 0..height)
 */
export function projectWorldCoordinates(lat: number, lng: number, width = 1000, height = 500): { x: number; y: number } {
  // Map bounds: lng -180 to 180, lat -75 to 80 (clipped for aesthetics)
  const minLng = -180;
  const maxLng = 180;
  const minLat = -60;
  const maxLat = 75;

  const clampedLng = Math.max(minLng, Math.min(maxLng, lng));
  const clampedLat = Math.max(minLat, Math.min(maxLat, lat));

  const x = ((clampedLng - minLng) / (maxLng - minLng)) * width;
  const y = ((maxLat - clampedLat) / (maxLat - minLat)) * height;

  return { x, y };
}

/**
 * Projects latitude and longitude to zoomed India SVG coordinates (0..width, 0..height)
 */
export function projectIndiaCoordinates(lat: number, lng: number, width = 900, height = 650): { x: number; y: number } {
  // India bounds: approx 67°E to 98°E, 6°N to 36°N
  const minLng = 67.0;
  const maxLng = 98.0;
  const minLat = 7.0;
  const maxLat = 36.5;

  const clampedLng = Math.max(minLng, Math.min(maxLng, lng));
  const clampedLat = Math.max(minLat, Math.min(maxLat, lat));

  // Add padding
  const padX = 60;
  const padY = 45;
  const usableWidth = width - padX * 2;
  const usableHeight = height - padY * 2;

  const x = padX + ((clampedLng - minLng) / (maxLng - minLng)) * usableWidth;
  const y = padY + ((maxLat - clampedLat) / (maxLat - minLat)) * usableHeight;

  return { x, y };
}

/**
 * Haversine formula to compute great-circle distance between two coordinates in kilometers
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Returns compass bearing (N, NE, E, SE, S, SW, W, NW) from coordinate 1 to coordinate 2
 */
export function getCompassBearing(lat1: number, lon1: number, lat2: number, lon2: number): string {
  const y = Math.sin((lon2 - lon1) * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180));
  const x =
    Math.cos(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) -
    Math.sin(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.cos((lon2 - lon1) * (Math.PI / 180));
  const brng = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  const compass = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return compass[Math.round(brng / 45) % 8];
}

export interface NearbyMunicipality {
  name: string;
  type: string;
  distanceKm: number;
  bearing: string;
  relevance: string;
}

export const NEARBY_LOCAL_MUNICIPALITIES: Record<string, NearbyMunicipality[]> = {
  pune: [
    { name: 'Pimpri-Chinchwad (PCMC)', type: 'Twin City Municipal Corp', distanceKm: 15, bearing: 'NW', relevance: 'Shares Pavana river & identical water distribution pipeline network.' },
    { name: 'Navi Mumbai (NMMC)', type: 'Smart Municipal Corp', distanceKm: 128, bearing: 'NW', relevance: 'Planned city with modern underground acoustic AMR sensors.' },
    { name: 'Mumbai (BMC)', type: 'Mega Municipal Corp', distanceKm: 148, bearing: 'NW', relevance: 'High non-revenue water loss (>25%) across old colonial pipe lines.' },
    { name: 'Satara', type: 'District Council', distanceKm: 112, bearing: 'S', relevance: 'Upstream reservoir supply zone requiring watershed telemetry.' },
    { name: 'Nashik (NMC)', type: 'Smart City Corp', distanceKm: 210, bearing: 'N', relevance: 'Godavari river basin urban local body facing water conservation mandate.' },
    { name: 'Chhatrapati Sambhajinagar', type: 'Municipal Corp', distanceKm: 235, bearing: 'NE', relevance: 'Arid Marathwada region with critical pipeline leakage monitoring needs.' }
  ],
  mumbai: [
    { name: 'Thane (TMC)', type: 'Adjacent Municipal Corp', distanceKm: 25, bearing: 'NE', relevance: 'Heavily trafficked flyovers with monsoon road crater vulnerabilities.' },
    { name: 'Navi Mumbai (NMMC)', type: 'Smart Municipal Corp', distanceKm: 22, bearing: 'E', relevance: 'Pre-cast concrete road network with high durability benchmarks.' },
    { name: 'Kalyan-Dombivli (KDMC)', type: 'Municipal Corp', distanceKm: 45, bearing: 'NE', relevance: 'High-density commuter roads with urgent road repair backlogs.' },
    { name: 'Mira-Bhayandar (MBMC)', type: 'Municipal Corp', distanceKm: 38, bearing: 'N', relevance: 'Coastal arterial road connecting Mumbai to Gujarat industrial belt.' },
    { name: 'Pune (PMC)', type: 'Smart Municipal Corp', distanceKm: 148, bearing: 'SE', relevance: 'Shared Mumbai-Pune Expressway corridor testbed.' }
  ],
  bengaluru: [
    { name: 'Hosur (SIPCOT)', type: 'Industrial Satellite', distanceKm: 40, bearing: 'SE', relevance: 'Inter-state logistics bottleneck along NH-44.' },
    { name: 'Ramanagara', type: 'District Center', distanceKm: 48, bearing: 'SW', relevance: 'Mysuru highway expressway feeder intersection.' },
    { name: 'Tumakuru', type: 'Smart City Corp', distanceKm: 70, bearing: 'NW', relevance: 'Industrial smart city node on Chennai-Bengaluru-Mumbai corridor.' },
    { name: 'Kolar', type: 'District Center', distanceKm: 68, bearing: 'E', relevance: 'National highway transit junction.' },
    { name: 'Mysuru (MCC)', type: 'Heritage City Corp', distanceKm: 145, bearing: 'SW', relevance: 'Connected via 10-lane expressway with intelligent ITS traffic sensors.' }
  ],
  delhi: [
    { name: 'Noida (UP)', type: 'Industrial Development Auth', distanceKm: 22, bearing: 'SE', relevance: 'Critical cross-border air pollution sensor node.' },
    { name: 'Gurugram (Haryana)', type: 'Municipal Corp (MCG)', distanceKm: 30, bearing: 'SW', relevance: 'High commercial vehicle density and dust particulate tracking.' },
    { name: 'Ghaziabad (UP)', type: 'Municipal Corp', distanceKm: 25, bearing: 'E', relevance: 'Industrial cluster with heavy PM10/PM2.5 emissions telemetry.' },
    { name: 'Faridabad (Haryana)', type: 'Smart City Corp', distanceKm: 28, bearing: 'S', relevance: 'Heavy industrial zone facing NCR smog inversion.' },
    { name: 'Meerut (UP)', type: 'Municipal Corp', distanceKm: 72, bearing: 'NE', relevance: 'Connected via Delhi-Meerut RRTS smart corridor.' }
  ],
  surat: [
    { name: 'Navsari', type: 'Municipality', distanceKm: 35, bearing: 'S', relevance: 'South Gujarat twin city with organic agri-waste feedstock.' },
    { name: 'Bardoli', type: 'Sugar Agro Cluster', distanceKm: 32, bearing: 'E', relevance: 'Major agro-industrial bagasse and biomethane source.' },
    { name: 'Bharuch / Ankleshwar', type: 'Chemical Industrial Complex', distanceKm: 65, bearing: 'N', relevance: 'Industrial effluent and solid waste treatment testbed.' },
    { name: 'Vadodara (VMC)', type: 'Smart Municipal Corp', distanceKm: 152, bearing: 'N', relevance: 'Central Gujarat municipal waste-to-energy replication partner.' }
  ],
  lucknow: [
    { name: 'Kanpur (KMC)', type: 'Mega Municipal Corp', distanceKm: 80, bearing: 'SW', relevance: 'Industrial neighbor with tertiary medical center linkages.' },
    { name: 'Barabanki', type: 'District Center', distanceKm: 30, bearing: 'E', relevance: 'Primary health center (PHC) rural diagnostics deployment zone.' },
    { name: 'Rae Bareli', type: 'AIIMS Host City', distanceKm: 82, bearing: 'S', relevance: 'Referral hospital hub for rural kiosk tele-consultations.' },
    { name: 'Ayodhya', type: 'Smart Municipal Corp', distanceKm: 135, bearing: 'E', relevance: 'Massive pilgrim tourism health telemetry testbed.' },
    { name: 'Prayagraj', type: 'Municipal Corp', distanceKm: 200, bearing: 'SE', relevance: 'Kumbh Mela high-capacity rural medical telemetry.' }
  ],
  jaipur: [
    { name: 'Dausa', type: 'District Center', distanceKm: 55, bearing: 'E', relevance: 'High solar insolation rural rooftop cluster.' },
    { name: 'Ajmer (AMC)', type: 'Smart Municipal Corp', distanceKm: 135, bearing: 'SW', relevance: 'Solar-powered smart heritage city pilot.' },
    { name: 'Alwar', type: 'NCR Industrial Node', distanceKm: 148, bearing: 'NE', relevance: 'Industrial rooftop solar net-metering grid.' },
    { name: 'Kota', type: 'Municipal Corp', distanceKm: 240, bearing: 'S', relevance: 'Power generation capital of Rajasthan with hydro-solar integration.' }
  ]
};

export interface ChallengeLocationMeta {
  id: string;
  title: string;
  department: string;
  cityId: string;
  cityName: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  tech: string;
  budget: string;
  status: string;
  summary: string;
  replicableStateTargets: string[];
  replicableNationalTargets: string[];
  globalTwinPartners: string[];
}

export const CHALLENGE_LOCATIONS: ChallengeLocationMeta[] = [
  // --- Indian Municipal & State Challenges ---
  {
    id: 'CH-001',
    title: 'AI-Based Water Leakage Detection',
    department: 'Pune Municipal Corporation (PMC)',
    cityId: 'pune',
    cityName: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    lat: 18.5204,
    lng: 73.8567,
    tech: 'AI + IoT + Acoustic Sensors',
    budget: '₹25 lakh',
    status: 'Active',
    summary: 'Acoustic and pressure sensor grid detecting sub-surface pipeline leaks with sub-meter accuracy.',
    replicableStateTargets: ['Mumbai (BMC)', 'Pimpri-Chinchwad (PCMC)', 'Nashik (NMC)', 'Chhatrapati Sambhajinagar'],
    replicableNationalTargets: ['Bengaluru (BWSSB)', 'Ahmedabad (AMC)', 'Indore (IMC)', 'Chennai MetroWater'],
    globalTwinPartners: ['Singapore (PUB Smart Water)', 'Tel Aviv (Mekorot Innovation)', 'London (Thames Water Digital)']
  },
  {
    id: 'CH-008',
    title: 'Smart River Inundation & Flash Flood Early Warning',
    department: 'Pimpri-Chinchwad Municipal Corp (PCMC)',
    cityId: 'pune',
    cityName: 'Pimpri-Chinchwad',
    state: 'Maharashtra',
    country: 'India',
    lat: 18.6298,
    lng: 73.7997,
    tech: 'Ultrasonic River Sensors + Hydro-AI',
    budget: '₹22 lakh',
    status: 'Open',
    summary: 'Pavana river catchment telemetry alerting low-lying urban wards 4 hours ahead of flash inundation.',
    replicableStateTargets: ['Pune (Mula-Mutha)', 'Kolhapur (Panchganga)', 'Chiplun (Vashishti)'],
    replicableNationalTargets: ['Guwahati (Brahmaputra)', 'Surat (Tapi)', 'Varanasi (Ganga)'],
    globalTwinPartners: ['London (Thames Barrier AI)', 'Singapore (Marina Barrage Telemetry)']
  },
  {
    id: 'CH-003',
    title: 'Automated Pothole & Road Defect Mapping',
    department: 'Brihanmumbai Municipal Corporation (BMC)',
    cityId: 'mumbai',
    cityName: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    lat: 19.0760,
    lng: 72.8777,
    tech: 'Computer Vision + LiDAR + GPS',
    budget: '₹30 lakh',
    status: 'Pilot',
    summary: 'AI vision units fitted on sanitation trucks to classify and map road potholes across Mumbai within 12 hours.',
    replicableStateTargets: ['Thane (TMC)', 'Pune (PMC)', 'Navi Mumbai (NMMC)', 'Nagpur (NMC)'],
    replicableNationalTargets: ['New Delhi (MCD)', 'Bengaluru (BBMP)', 'Kolkata (KMC)', 'Chennai (GCC)'],
    globalTwinPartners: ['London (Catapult Connected Places)', 'Tokyo (Railway & Road Telemetry)', 'Berlin (Smart City Infrastructure)']
  },
  {
    id: 'CH-009',
    title: 'Overpass Structural Health & Dynamic Vibration AI',
    department: 'Thane Municipal Corporation (TMC)',
    cityId: 'mumbai',
    cityName: 'Thane',
    state: 'Maharashtra',
    country: 'India',
    lat: 19.2183,
    lng: 72.9781,
    tech: 'MEMS Accelerometers + AI Stress Models',
    budget: '₹28 lakh',
    status: 'Active',
    summary: 'Real-time structural deflection monitoring of heavily trafficked coastal arterial flyovers.',
    replicableStateTargets: ['Mumbai (BMC Flyovers)', 'Pune (Hinjawadi Flyover)', 'Nashik'],
    replicableNationalTargets: ['Delhi (Flyover Network)', 'Kolkata (KMDA)', 'Bengaluru (Outer Ring Road)'],
    globalTwinPartners: ['Tokyo (Metropolitan Expressway)', 'Seoul (Cheonggyecheon Monitoring)']
  },
  {
    id: 'CH-002',
    title: 'Dynamic AI Traffic Signal Optimization',
    department: 'Bengaluru Traffic Police & BBMP',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    lat: 12.9716,
    lng: 77.5946,
    tech: 'Computer Vision + Edge AI',
    budget: '₹45 lakh',
    status: 'Active',
    summary: 'Edge camera AI processing live queue lengths to dynamically alter signal timing across 6 key junctions.',
    replicableStateTargets: ['Mysuru (MCC)', 'Tumakuru Smart City', 'Hubballi-Dharwad'],
    replicableNationalTargets: ['Pune (PMC)', 'Mumbai (BMC)', 'New Delhi (Delhi Police)', 'Hyderabad (Cyberabad)'],
    globalTwinPartners: ['Seoul (S-DoT Smart Transit)', 'Tokyo (Autonomous Traffic Mesh)', 'Singapore (GovTech Smart Nation)']
  },
  {
    id: 'CH-004',
    title: 'Hyper-Local Air Quality Intelligence Grid',
    department: 'Delhi Pollution Control Committee (DPCC)',
    cityId: 'delhi',
    cityName: 'New Delhi / NCR',
    state: 'National Capital Region',
    country: 'India',
    lat: 28.6139,
    lng: 77.2090,
    tech: 'IoT Sensors + Dispersion AI',
    budget: '₹35 lakh',
    status: 'Active',
    summary: 'Grid of 100 calibrated low-cost optical micro-sensors mapping 500m-resolution PM2.5/PM10 hotspots.',
    replicableStateTargets: ['Noida (UP)', 'Gurugram (Haryana)', 'Ghaziabad (UP)', 'Faridabad (Haryana)'],
    replicableNationalTargets: ['Kolkata (WBPCB)', 'Lucknow (UPPCB)', 'Ahmedabad (GPCB)', 'Mumbai (MPCB)'],
    globalTwinPartners: ['London (Breathe London Sensor Network)', 'Berlin (Fraunhofer Ambient Sensing)', 'Paris (Airparif Dispersion Models)']
  },
  {
    id: 'CH-005',
    title: 'Biogas & Waste-to-Energy Optimization',
    department: 'Surat Municipal Corporation (SMC)',
    cityId: 'surat',
    cityName: 'Surat',
    state: 'Gujarat',
    country: 'India',
    lat: 21.1702,
    lng: 72.8311,
    tech: 'Biochemical IoT + Predictive AI',
    budget: '₹20 lakh',
    status: 'Procured',
    summary: 'Real-time biogas digester sensor telemetry maximizing methane output from segregated wet market waste.',
    replicableStateTargets: ['Ahmedabad (AMC)', 'Vadodara (VMC)', 'Rajkot (RMC)', 'Gandhinagar'],
    replicableNationalTargets: ['Indore (IMC Clean City)', 'Pune (PMC Waste)', 'Kolkata (KMDA BioWaste)'],
    globalTwinPartners: ['Berlin (Biogas Energy Sandboxes)', 'Toronto (Great Lakes BioRecovery)', 'San Francisco (Zero Waste Digesters)']
  },
  {
    id: 'CH-006',
    title: 'AI Tele-Diagnostics for Rural Primary Health',
    department: 'UP State Rural Health Mission',
    cityId: 'lucknow',
    cityName: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    lat: 26.8467,
    lng: 80.9462,
    tech: 'Edge AI + ECG + Point-of-Care IoT',
    budget: '₹45 lakh',
    status: 'Active',
    summary: 'Self-service diagnostic kiosks at 20 Primary Health Centres screening for anemia, diabetes, and cardiac arrhythmia.',
    replicableStateTargets: ['Kanpur (KMC)', 'Varanasi', 'Ayodhya', 'Gorakhpur', 'Prayagraj'],
    replicableNationalTargets: ['Bihar (State Health)', 'Madhya Pradesh (NHM)', 'Rajasthan (Chiranjeevi)', 'Odisha (Health Mission)'],
    globalTwinPartners: ['Nairobi (Silicon Savannah Mobile Health)', 'London (NHS Digital Health Sandboxes)', 'Dubai (DIFC Tele-Health Hub)']
  },
  {
    id: 'CH-007',
    title: 'Solar Rooftop Grid Defect Detection',
    department: 'Rajasthan Renewable Energy Corp (RRECL)',
    cityId: 'jaipur',
    cityName: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    lat: 26.9124,
    lng: 75.7873,
    tech: 'Autonomous Drone Thermography + AI',
    budget: '₹28 lakh',
    status: 'Pilot',
    summary: 'Autonomous drones with radiometric thermal cameras inspecting 5,000+ government solar installations for hot-spots.',
    replicableStateTargets: ['Jodhpur (Solar Hub)', 'Bikaner', 'Ajmer Smart City', 'Udaipur'],
    replicableNationalTargets: ['Gujarat (GEDA)', 'Maharashtra (MEDA)', 'Karnataka (KREDL)', 'Tamil Nadu (TANGEDCO)'],
    globalTwinPartners: ['Paris (International Solar Alliance HQ)', 'Sydney (CSIRO Solar Tech Bridge)', 'Dubai (DEWA Solar Park AI)']
  },
  {
    id: 'CH-010',
    title: 'Optical Hyperspectral Waste Sorting & Recyclable Audit',
    department: 'Indore Municipal Corporation (IMC)',
    cityId: 'indore',
    cityName: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    lat: 22.7196,
    lng: 75.8577,
    tech: 'Hyperspectral Vision + Conveyor Robotics',
    budget: '₹35 lakh',
    status: 'Open',
    summary: 'Real-time optical verification of dry/wet waste segregation compliance at municipal transfer stations.',
    replicableStateTargets: ['Bhopal (BMC)', 'Ujjain Smart City', 'Jabalpur'],
    replicableNationalTargets: ['Surat (SMC)', 'Pune (PMC)', 'Mysuru (MCC)'],
    globalTwinPartners: ['Berlin (Zero Waste Sandboxes)', 'Toronto (Circular Recovery)']
  },
  {
    id: 'CH-011',
    title: 'Desalination & Sub-Sea Pressure Wave Leakage Telemetry',
    department: 'Chennai MetroWater (CMWSSB)',
    cityId: 'chennai',
    cityName: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    lat: 13.0827,
    lng: 80.2707,
    tech: 'Sub-Sea Acoustic Telemetry + IoT',
    budget: '₹38 lakh',
    status: 'Open',
    summary: 'Acoustic waveform analysis along 40km coastal brine transmission conduits to prevent underground cavitation bursts.',
    replicableStateTargets: ['Coimbatore', 'Madurai', 'Tiruchirappalli'],
    replicableNationalTargets: ['Mumbai (BMC Desalination)', 'Kochi (Smart Water)', 'Visakhapatnam'],
    globalTwinPartners: ['Tel Aviv (Mekorot Desalination)', 'Dubai (DEWA Water Security)']
  },
  {
    id: 'CH-012',
    title: 'Urban Heat Island & Microclimate Drone Thermography',
    department: 'Greater Hyderabad Municipal Corp (GHMC)',
    cityId: 'hyderabad',
    cityName: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    lat: 17.3850,
    lng: 78.4867,
    tech: 'Thermal Drone Imaging + Geospatial AI',
    budget: '₹32 lakh',
    status: 'Pilot',
    summary: 'High-resolution thermal mapping across high-rise tech corridors to optimize cool-roof policies and green canopies.',
    replicableStateTargets: ['Warangal', 'Nizamabad', 'Karimnagar'],
    replicableNationalTargets: ['Bengaluru (Electronic City)', 'Pune (Magarpatta)', 'Ahmedabad (GIFT City)'],
    globalTwinPartners: ['Singapore (Cooling Singapore Digital Twin)', 'Paris (Urban Climate Mesh)']
  },

  // --- Global Partner Challenges & Twin Sandboxes ---
  {
    id: 'CH-GL-01',
    title: 'Autonomous Coastal Flood Barrier & Digital Water Twin',
    department: 'Public Utilities Board (PUB)',
    cityId: 'singapore',
    cityName: 'Singapore',
    state: 'Singapore',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    tech: 'Hydrodynamic AI + Edge Telemetry',
    budget: '$500K SGD',
    status: 'Active',
    summary: 'Integrated tidal flood gates and urban catchment digital twin predicting monsoon storm surges.',
    replicableStateTargets: [],
    replicableNationalTargets: ['Mumbai (BMC Coastal Road)', 'Chennai (Adyar Basin)', 'Kolkata (Hooghly Mesh)'],
    globalTwinPartners: ['Pune (PMC Smart Water)', 'London (Thames Barrier AI)', 'Tokyo (Metropolitan Water Grid)']
  },
  {
    id: 'CH-GL-02',
    title: 'Zero-Emission Dynamic Freight & Curb Optimization',
    department: 'Connected Places Catapult & TfL',
    cityId: 'london',
    cityName: 'London',
    state: 'Greater London',
    country: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    tech: 'LiDAR Sensors + Dynamic Booking AI',
    budget: '£350K GBP',
    status: 'Pilot',
    summary: 'Dynamic curbside loading reservation reducing commercial delivery double-parking in central congestion zones.',
    replicableStateTargets: [],
    replicableNationalTargets: ['Delhi (NCR Logistics)', 'Mumbai (South Mumbai Port)', 'Bengaluru (CBD)'],
    globalTwinPartners: ['Bengaluru (BBMP Traffic AI)', 'San Francisco (SFMTA Curb Management)']
  },
  {
    id: 'CH-GL-03',
    title: 'Autonomous Transit Mesh & V2X Road Telemetry',
    department: 'Tokyo Metropolitan Government (TMG)',
    cityId: 'tokyo',
    cityName: 'Tokyo',
    state: 'Kanto',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    tech: 'V2X Wireless + Edge Neural Compute',
    budget: '¥55M JPY',
    status: 'Active',
    summary: 'Vehicle-to-everything intersection telematics eliminating blind-spot pedestrian collisions.',
    replicableStateTargets: [],
    replicableNationalTargets: ['Bengaluru (ORR Corridor)', 'Pune (Autonomous Shuttles)', 'Ahmedabad (BRTS)'],
    globalTwinPartners: ['Seoul (S-DoT Transit)', 'San Francisco (Autonomous Mobility)']
  },
  {
    id: 'CH-GL-04',
    title: 'Industrial Waste Heat Recovery & District Cooling AI',
    department: 'Berlin Senate Dept for Mobility & Climate',
    cityId: 'berlin',
    cityName: 'Berlin',
    state: 'Berlin',
    country: 'Germany',
    lat: 52.5200,
    lng: 13.4050,
    tech: 'Thermodynamic ML + SCADA Microgrid',
    budget: '€420K EUR',
    status: 'Open',
    summary: 'Capturing data center and industrial exhaust heat for residential district heating grids.',
    replicableStateTargets: [],
    replicableNationalTargets: ['Surat (Chemical Heat)', 'Pune (Auto Cluster)', 'Jaipur (Solar District)'],
    globalTwinPartners: ['Surat (Biogas Microgrid)', 'Toronto (District Energy)']
  },
  {
    id: 'CH-GL-05',
    title: 'Autonomous Civic Drone Corridor & Aerial Delivery Sandbox',
    department: 'Dubai Future Foundation & RTA',
    cityId: 'dubai',
    cityName: 'Dubai',
    state: 'Dubai',
    country: 'United Arab Emirates',
    lat: 25.2048,
    lng: 55.2708,
    tech: 'BVLOS Drone AI + 5G Air-Traffic Mesh',
    budget: '$400K USD',
    status: 'Active',
    summary: 'Dedicated low-altitude air corridors for rapid medical sample and urgent municipal logistics delivery.',
    replicableStateTargets: [],
    replicableNationalTargets: ['Jaipur (RRECL Drones)', 'Lucknow (Rural Medicine Drones)', 'Bengaluru (Tech Corridors)'],
    globalTwinPartners: ['Jaipur (Drone Thermography)', 'Nairobi (Medical Drone Logistics)']
  },
  {
    id: 'CH-GL-06',
    title: 'Predictive Wildfire & Drought Water Allocation AI',
    department: 'San Francisco Public Utilities Commission (SFPUC)',
    cityId: 'san_francisco',
    cityName: 'San Francisco',
    state: 'California',
    country: 'United States',
    lat: 37.7749,
    lng: -122.4194,
    tech: 'Satellite Thermal GIS + Predictive Hydrology',
    budget: '$480K USD',
    status: 'Open',
    summary: 'Predictive watershed depletion modelling under multi-year drought cycles.',
    replicableStateTargets: [],
    replicableNationalTargets: ['Pune (PMC Water Grid)', 'Jaipur (Desert Hydrology)', 'Chennai (Reservoir AI)'],
    globalTwinPartners: ['Pune (Acoustic Water)', 'Sydney (CSIRO Drought Resilience)']
  },
  {
    id: 'CH-GL-07',
    title: 'Solar-Powered Rural Primary Healthcare Mesh',
    department: 'Kenya Ministry of Health & Konza Technopolis',
    cityId: 'nairobi',
    cityName: 'Nairobi',
    state: 'Nairobi County',
    country: 'Kenya',
    lat: -1.2921,
    lng: 36.8219,
    tech: 'Solar IoT + Mobile Tele-Diagnostics',
    budget: '$320K USD',
    status: 'Active',
    summary: 'Offline solar micro-clinics providing remote diagnostic telemetry and triage across underserved savannah villages.',
    replicableStateTargets: [],
    replicableNationalTargets: ['Lucknow (UP Rural Health)', 'Jaipur (Barmer PHC)', 'Odisha (Tribal Health)'],
    globalTwinPartners: ['Lucknow (Rural Health Kiosks)', 'Jaipur (Solar Rooftops)']
  }
];


