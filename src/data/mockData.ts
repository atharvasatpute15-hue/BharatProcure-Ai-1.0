import { Challenge, Pilot, Startup } from "../types";

export const mockStartups: Startup[] = [
  {
    id: "s1",
    name: "AquaSense Technologies",
    city: "Pune",
    state: "Maharashtra",
    technology: "AI + IoT",
    industry: "Water Management",
    previousExperience: "Pune Smart City Demo (2025)",
    estimatedCost: "₹8 lakh",
    implementationTime: "90 days",
    eligibilityStatus: "Verified",
    teamSize: 45,
    founded: 2021,
    capabilities: ["IoT Sensor Networks", "Anomaly Detection", "Real-time Dashboards"],
    matchScore: {
      technical: 33,
      experience: 18,
      location: 10,
      cost: 9,
      time: 9,
      eligibility: 10,
      scalability: 5,
      total: 94,
      explanation: [
        "Strong technical capability with robust IoT sensor integrations.",
        "Local implementation advantage (Pune-based HQ).",
        "Budget compatible with competitive ₹8L pilot estimate.",
        "Relevant demo experience with smart city projects.",
        "High scalability potential across other districts."
      ]
    }
  },
  {
    id: "s2",
    name: "HydroVision Labs",
    city: "Mumbai",
    state: "Maharashtra",
    technology: "Computer Vision + IoT",
    industry: "Civic Tech",
    previousExperience: "Mumbai BMC Leakage Audit",
    estimatedCost: "₹12 lakh",
    implementationTime: "120 days",
    eligibilityStatus: "Verified",
    teamSize: 22,
    founded: 2023,
    capabilities: ["Drone Imaging", "Pipeline Scanning", "Edge AI"],
    matchScore: {
      technical: 30,
      experience: 15,
      location: 8,
      cost: 7,
      time: 8,
      eligibility: 8,
      scalability: 2,
      total: 88,
      explanation: [
        "Solid Computer Vision capabilities.",
        "Regional proximity (Maharashtra).",
        "Slightly higher cost and implementation time.",
      ]
    }
  },
  {
    id: "s3",
    name: "JalAI Systems",
    city: "Bengaluru",
    state: "Karnataka",
    technology: "AI + Sensors",
    industry: "Smart Infrastructure",
    previousExperience: "BWSSB Water Grid Optimization",
    estimatedCost: "₹10 lakh",
    implementationTime: "100 days",
    eligibilityStatus: "Verified",
    teamSize: 60,
    founded: 2019,
    capabilities: ["Predictive Maintenance", "Deep Learning", "Flow Analysis"],
    matchScore: {
      technical: 34,
      experience: 19,
      location: 3,
      cost: 8,
      time: 8,
      eligibility: 10,
      scalability: 0,
      total: 82,
      explanation: [
        "Excellent technical & experience scores.",
        "Out of state (Karnataka) lowers location match score.",
        "Good alternative if local capacity is insufficient."
      ]
    }
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: "CH-001",
    department: "Pune Municipal Corporation",
    location: "Pune, Maharashtra",
    title: "AI-Based Water Leakage Detection",
    description: "Develop an affordable AI/IoT solution to detect and locate municipal water pipeline leakage across urban distribution networks.",
    currentSituation: "The city currently relies on manual reports for pipe bursts, leading to high non-revenue water loss exceeding 28%.",
    targetPopulation: "2.4 million citizens in urban municipal wards",
    expectedImpact: "Reduce non-revenue water loss by 18% and cut response turnaround to under 4 hours.",
    pilotDuration: "3-6 months",
    budget: "₹25 lakh",
    timeline: "6 months",
    technology: "AI + IoT + GIS",
    requiredOutcome: "Reduce water loss and improve maintenance response.",
    status: "Open",
    structuredData: {
      problemSummary: "Municipal water leakage requires faster detection and sub-5m location identification.",
      functionalReqs: [
        "Real-time acoustic & pressure pipeline monitoring",
        "Automated instant alert generation to municipal engineers",
        "Geospatial GIS visualization of active leak zones"
      ],
      technicalReqs: [
        "Sub-surface acoustic IoT sensors",
        "AI anomaly detection algorithm",
        "Edge telemetry data analytics",
        "GIS/GPS location mapping integration"
      ],
      requiredSkills: [
        "IoT Hardware Integration",
        "Machine Learning Anomaly Detection",
        "GIS Portal Development"
      ],
      eligibilityCriteria: [
        "DPIIT Registered Startup / MSME",
        "Experience in Water Tech / Acoustic Sensing",
        "Annual Turnover < ₹50 Cr"
      ],
      expectedOutcomes: [
        "Detect pipeline leaks within 5m accuracy",
        "Reduce non-revenue water loss by >15%",
        "Provide geo-tagged incident logs to Smart City Command Center"
      ],
      evaluationMetrics: [
        "Detection accuracy > 90%",
        "False positive rate < 10%",
        "Mean time to detect < 30 mins",
        "Water loss reduction",
        "System uptime > 98%"
      ],
      pilotRequirements: [
        "Deploy in 2 pilot municipal wards (Kothrud & Aundh)",
        "Integrate telemetry with PMC Integrated Command & Control Centre (ICCC)"
      ],
      riskFactors: [
        "Sensor damage in older unlined cast-iron pipes",
        "Intermittent cellular coverage in underground vaults"
      ],
      scalabilityPotential: "High - Applicable to all tier-1 and tier-2 municipal corporations across India."
    }
  },
  {
    id: "CH-002",
    department: "Bengaluru Traffic Police & BBMP",
    location: "Bengaluru, Karnataka",
    title: "Dynamic AI Adaptive Traffic Light Optimization",
    description: "Deploy edge-computer vision cameras to dynamically adjust signal cycle timers at high-density choke points based on real-time vehicle queue length.",
    currentSituation: "Fixed-timer traffic signals cause gridlock during peak hours, increasing commuter delays and idling vehicle emissions.",
    targetPopulation: "1.2 million daily commuters on the Outer Ring Road & Silk Board corridor",
    expectedImpact: "Cut transit delays by 22% and give automated green-corridor priority to emergency ambulances.",
    pilotDuration: "4 months",
    budget: "₹45 lakh",
    timeline: "8 months",
    technology: "Computer Vision + Edge AI",
    requiredOutcome: "Real-time vehicle density estimation and autonomous traffic signal control.",
    status: "Active",
    structuredData: {
      problemSummary: "Fixed signal timing causes severe intersection congestion during asymmetric morning/evening commuter surges.",
      functionalReqs: [
        "Camera-based vehicle count & queue length estimation",
        "Autonomous dynamic green-time cycle adjustments",
        "Emergency vehicle green wave detection"
      ],
      technicalReqs: [
        "Edge AI computing box with low-latency neural inference",
        "IP-rated weatherproof optical cameras",
        "Secure wireless mesh communication with signal controllers",
        "Central traffic management dashboard"
      ],
      requiredSkills: [
        "Real-time Computer Vision (YOLO/Object Tracking)",
        "Traffic Flow Simulation & Control Systems",
        "Edge Hardware Deployment"
      ],
      eligibilityCriteria: [
        "DPIIT Registered Startup / MSME",
        "Proven computer vision deployment on road transport",
        "Minimum 2 years operating history"
      ],
      expectedOutcomes: [
        "Average vehicle wait time reduced by >20%",
        "Emergency ambulance transit clearance within 60 seconds",
        "Zero disruption to existing manual traffic overrides"
      ],
      evaluationMetrics: [
        "Queue length reduction percentage",
        "Signal cycle efficiency",
        "Camera optical detection accuracy > 94%",
        "Latency of signal modification < 2 seconds"
      ],
      pilotRequirements: [
        "Deploy across 6 consecutive intersections along Outer Ring Road",
        "Interface with Bengaluru Traffic Command Center"
      ],
      riskFactors: [
        "Heavy monsoon rain impacting camera visibility",
        "Unregulated pedestrian crossings and mixed vehicle types"
      ],
      scalabilityPotential: "High - Can be replicated across 400+ intersections in Bengaluru and major Indian metros."
    }
  },
  {
    id: "CH-003",
    department: "Brihanmumbai Municipal Corporation (BMC)",
    location: "Mumbai, Maharashtra",
    title: "Automated Pothole & Road Defect Mapping",
    description: "Equip municipal garbage collection trucks and transit buses with AI vision units to continuously map and classify road surface defects across Mumbai.",
    currentSituation: "Monsoon rains create hazardous potholes; manual ward inspections take up to 2 weeks to document and verify.",
    targetPopulation: "12 million residents navigating city roads, bridges, and flyovers",
    expectedImpact: "Identify potholes within 12 hours of formation and speed up contractor repair dispatch by 60%.",
    pilotDuration: "3 months",
    budget: "₹30 lakh",
    timeline: "5 months",
    technology: "Computer Vision + LiDAR + GPS",
    requiredOutcome: "Daily automated road health heatmaps with millimeter-accurate defect classification.",
    status: "Pilot",
    structuredData: {
      problemSummary: "Monsoon road craters require immediate, continuous detection without needing dedicated manual road survey crews.",
      functionalReqs: [
        "Automatic road surface scanning at speeds up to 50 km/h",
        "Classification of potholes by severity (Minor, Moderate, Critical)",
        "Automated work order creation with geo-tagged images"
      ],
      technicalReqs: [
        "Dual-lens stereo camera or compact LiDAR sensor",
        "High-precision RTK GPS module",
        "Local edge inference for real-time defect segmentation",
        "Cloud sync over 4G/5G upon depot return"
      ],
      requiredSkills: [
        "3D Computer Vision & Depth Estimation",
        "Automotive IoT Sensor Rigging",
        "GIS & Cloud Mapping Infrastructure"
      ],
      eligibilityCriteria: [
        "DPIIT Registered Startup / MSME",
        "Experience in road asset management or geospatial survey",
        "Field-tested hardware prototypes"
      ],
      expectedOutcomes: [
        "Coverage of 350 km of arterial roads per week",
        "Pothole detection accuracy > 92%",
        "Automated integration into BMC Road Repair Management System"
      ],
      evaluationMetrics: [
        "Defect detection precision & recall",
        "GPS localization error < 1 meter",
        "False alarm rate < 8%",
        "Time from defect detection to ward engineer alert < 2 hours"
      ],
      pilotRequirements: [
        "Install 15 sensor units on BEST buses and BMC sanitation vehicles",
        "Operate across Western Suburbs (Bandra to Andheri)"
      ],
      riskFactors: [
        "Mud splatter and lens obscuration in heavy rain",
        "Waterlogged roads obscuring submerged pothole depths"
      ],
      scalabilityPotential: "High - Readily deployable across all municipal corporations and National Highway Authority (NHAI) networks."
    }
  },
  {
    id: "CH-004",
    department: "Indore Municipal Corporation (IMC)",
    location: "Indore, Madhya Pradesh",
    title: "AI Machine Vision for Waste Segregation & Audit",
    description: "Install optical and hyperspectral sorting sensors at municipal transfer stations to verify dry/wet waste segregation compliance in real-time.",
    currentSituation: "While doorstep segregation is widely practiced, commercial bulk waste generators frequently mix hazardous and wet waste into recyclables.",
    targetPopulation: "Commercial business districts and 85 municipal transfer stations in Indore",
    expectedImpact: "Increase recyclable purity to 96% and automatically identify non-compliant bulk waste dumpers.",
    pilotDuration: "6 months",
    budget: "₹35 lakh",
    timeline: "6 months",
    technology: "Machine Vision + Robotics + IoT",
    requiredOutcome: "Real-time segregation verification and automated audit trail for municipal sanitation inspectors.",
    status: "Open",
    structuredData: {
      problemSummary: "High-volume waste sorting facilities need automated optical auditing to maintain Indore's Cleanest City benchmark.",
      functionalReqs: [
        "Conveyor belt scanning at speeds up to 1.5 m/s",
        "Detection of plastic polymer grades (PET, HDPE, LDPE) and wet contaminants",
        "Real-time contamination alerts and logging by waste collector truck ID"
      ],
      technicalReqs: [
        "Hyperspectral imaging or multi-spectral industrial cameras",
        "Edge deep learning classifier trained on Indian waste types",
        "Dust-proof and vibration-resistant IP66 industrial enclosure",
        "RFID truck tag reader integration"
      ],
      requiredSkills: [
        "Industrial Computer Vision",
        "Spectral Data Analysis",
        "SCADA / Conveyor Automation Integration"
      ],
      eligibilityCriteria: [
        "DPIIT Registered Startup / MSME",
        "Prior deployment in waste management or material recovery facilities",
        "Demonstrated model accuracy on domestic packaging waste"
      ],
      expectedOutcomes: [
        "Audit 100% of bulk commercial waste deliveries at pilot station",
        "Identify contaminated consignments with 95% classification accuracy",
        "Generate automated penalty notices for repeat non-compliant commercial entities"
      ],
      evaluationMetrics: [
        "Classification accuracy across 6 waste categories",
        "Inference speed per object < 50ms",
        "Dust and environmental durability over continuous 18-hour shifts"
      ],
      pilotRequirements: [
        "Install 2 optical audit stations at Devguradia Waste Processing Center",
        "Integrate with IMC 311 Citizen & Enforcement Portal"
      ],
      riskFactors: [
        "Extreme dust and airborne particles fouling camera lenses",
        "Irregularly soiled packaging confusing standard optical models"
      ],
      scalabilityPotential: "Very High - Directly exportable to 100+ Smart Cities under Swachh Bharat Mission Urban 2.0."
    }
  },
  {
    id: "CH-005",
    department: "Punjab Pollution Control Board & Dept of Environment",
    location: "Ludhiana & Patiala, Punjab",
    title: "Satellite & Drone Early Warning for Agricultural Crop Stubble Burning",
    description: "Thermal drone patrols combined with multi-spectral satellite imagery to forecast and spot stubble fires in near real-time, rapidly directing baler equipment to farmers.",
    currentSituation: "Post-harvest paddy stubble burning in October-November causes severe air quality degradation (AQI > 400) across northern India.",
    targetPopulation: "Agrarian districts across Punjab and the greater National Capital Region (NCR) airshed",
    expectedImpact: "Detect stubble burning within 15 minutes of ignition and aggregate 50,000 metric tons of straw for bio-energy production.",
    pilotDuration: "3 months",
    budget: "₹60 lakh",
    timeline: "12 months",
    technology: "Remote Sensing + Drone AI + Geospatial Analytics",
    requiredOutcome: "Near-instantaneous thermal anomaly detection coupled with automated machinery dispatch.",
    status: "Active",
    structuredData: {
      problemSummary: "Agricultural stubble fires need to be caught at early ignition or prevented by proactively dispatching crop straw balers.",
      functionalReqs: [
        "Automated satellite thermal hotspot ingestion (VIIRS/MODIS & Sentinel)",
        "Autonomous long-range drone flight dispatch to verify active coordinates",
        "Mobile dispatch dashboard for district administration and baler machine owners"
      ],
      technicalReqs: [
        "Near real-time satellite GIS pipeline",
        "Thermal infrared (FLIR) gimbal cameras on beyond-visual-line-of-sight (BVLOS) drones",
        "Low-bandwidth rural mobile app for field officers",
        "GIS boundary mapping of agricultural land ownership records"
      ],
      requiredSkills: [
        "Satellite Imagery Processing & Thermal Inversion",
        "Autonomous UAV/Drone Flight Operations",
        "Geospatial Database Engineering"
      ],
      eligibilityCriteria: [
        "DPIIT Registered Startup / MSME with DGCA Type Certified Drones",
        "Experience in agro-monitoring or emergency response systems",
        "Compliance with national drone safety regulations"
      ],
      expectedOutcomes: [
        "Alert district nodal officers within 15 minutes of thermal ignition",
        "Map active harvest readiness to pre-dispatch straw collection balers",
        "Reduce active fire events by 35% in designated pilot blocks"
      ],
      evaluationMetrics: [
        "Hotspot detection latency < 15 minutes",
        "Thermal false-positive rate < 5%",
        "Drone flight dispatch reliability > 95%"
      ],
      pilotRequirements: [
        "Cover 3 high-incidence tehsils in Patiala and Ludhiana districts",
        "Link alerts to Deputy Commissioner Disaster Management cell"
      ],
      riskFactors: [
        "Heavy smoke haze and smog impeding optical cameras",
        "Inclement weather grounding drone operations"
      ],
      scalabilityPotential: "High - Expandable across Haryana, Western UP, and Rajasthan agrarian belts."
    }
  },
  {
    id: "CH-006",
    department: "Dept of Medical, Health & Family Welfare, Rajasthan",
    location: "Jaipur & Barmer, Rajasthan",
    title: "AI Tele-Diagnostic Screening in Rural Primary Health Centers",
    description: "Portable AI diagnostic kiosks for rural sub-centers capable of automated 12-lead ECG interpretation, diabetic retinopathy screening, and chest X-ray triage.",
    currentSituation: "Desert and tribal villages lack local specialist doctors; patients travel up to 90 km for basic cardiac and diabetic retinopathy checks.",
    targetPopulation: "450,000 rural residents across Barmer and Jaisalmer districts",
    expectedImpact: "Enable point-of-care preliminary screening within 8 minutes, cutting specialist referral delays by 70%.",
    pilotDuration: "6 months",
    budget: "₹40 lakh",
    timeline: "9 months",
    technology: "Diagnostic AI + Edge Medical Devices + Tele-health",
    requiredOutcome: "Offline-capable diagnostic inference validated against certified medical board standards.",
    status: "Procured",
    structuredData: {
      problemSummary: "Remote Primary Health Centers (PHCs) need accurate, rapid AI screening for non-communicable diseases before referrals.",
      functionalReqs: [
        "Automated ECG arrhythmia and ST-elevation myocardial infarction detection",
        "Fundus image analysis for diabetic retinopathy grading (Grades 0-4)",
        "Bilingual Hindi/English patient health summary printouts"
      ],
      technicalReqs: [
        "CDSCO approved or certified diagnostic AI algorithms",
        "Low-power edge computing tablet operable on solar backup",
        "Offline inference capability without requiring continuous internet",
        "ABHA (Ayushman Bharat Health Account) patient ID integration"
      ],
      requiredSkills: [
        "Medical Imaging AI (Ophthalmology & Cardiology)",
        "Embedded Healthcare Device Integration",
        "FHIR & Ayushman Bharat Digital Mission (ABDM) standards"
      ],
      eligibilityCriteria: [
        "DPIIT Registered HealthTech Startup / MSME",
        "Clinical validation study published in peer-reviewed medical journal",
        "Certified compliance with national healthcare data privacy standards"
      ],
      expectedOutcomes: [
        "Screen 15,000 rural citizens during pilot phase",
        "Identify asymptomatic cardiac risk and diabetic eye disease early",
        "Reduce unnecessary patient travel to district hospital by 60%"
      ],
      evaluationMetrics: [
        "Diagnostic sensitivity > 93% and specificity > 90%",
        "Screening turnaround time < 10 minutes",
        "Offline battery runtime > 8 hours",
        "Health worker usability rating > 4.5/5"
      ],
      pilotRequirements: [
        "Deploy in 12 rural sub-centers across Barmer district",
        "Train Auxiliary Nurse Midwives (ANMs) and Community Health Officers (CHOs)"
      ],
      riskFactors: [
        "Dust storms and extreme ambient desert temperatures (>45°C)",
        "Intermittent rural electric grid outages"
      ],
      scalabilityPotential: "Massive - Readily applicable to 150,000+ Ayushman Bharat Health and Wellness Centres across India."
    }
  },
  {
    id: "CH-007",
    department: "Maharashtra State Electricity Distribution Co. (MSEDCL)",
    location: "Nagpur & Nashik, Maharashtra",
    title: "Smart Micro-Grid Load Forecasting & Power Theft Detection",
    description: "Smart meter telemetry analytics using machine learning to detect aggregate technical & commercial (AT&C) power distribution losses and distribution transformer overload.",
    currentSituation: "Unidentified line tapping and distribution transformer imbalances cause heavy financial losses and frequent rural blackout trips.",
    targetPopulation: "180,000 agricultural and commercial feeder connections",
    expectedImpact: "Reduce distribution loss by 4.5% and prevent costly transformer burnout incidents.",
    pilotDuration: "4 months",
    budget: "₹50 lakh",
    timeline: "7 months",
    technology: "Predictive ML + Smart Metering + SCADA",
    requiredOutcome: "Automated power theft probability scoring per feeder line with 88%+ precision.",
    status: "Open",
    structuredData: {
      problemSummary: "Power distribution companies need automated telemetry auditing to detect bypass theft and prevent grid overloads.",
      functionalReqs: [
        "Daily feeder energy audit comparing input vs billed consumption",
        "AI pattern recognition for sudden phase drop and meter bypass signatures",
        "Predictive alerts for transformer overheating 48 hours in advance"
      ],
      technicalReqs: [
        "Time-series ML models (LSTM / Transformer-based load forecasters)",
        "Integration with existing Head-End Systems (HES) and Meter Data Management (MDM)",
        "Secure cloud ingestion handling millions of meter pings daily"
      ],
      requiredSkills: [
        "Smart Grid Telemetry & Power Systems Engineering",
        "Time-series Machine Learning",
        "Enterprise SCADA Integration"
      ],
      eligibilityCriteria: [
        "DPIIT Registered Startup / MSME",
        "Experience in power sector analytics or smart meter data processing",
        "Adherence to Bureau of Indian Standards (BIS) smart metering security"
      ],
      expectedOutcomes: [
        "Isolate theft hot-zones down to specific 11kV feeder lines",
        "Accurately forecast next-day agricultural peak load within 3% variance",
        "Recover an estimated ₹2.8 Cr in unmetered energy loss"
      ],
      evaluationMetrics: [
        "Theft detection precision > 88%",
        "Peak load forecast mean absolute percentage error (MAPE) < 3.5%",
        "Transformer fault prediction accuracy > 85%"
      ],
      pilotRequirements: [
        "Connect 20 distribution transformers across rural Nashik and Nagpur circles",
        "Interface with MSEDCL Urja portal"
      ],
      riskFactors: [
        "Sparse meter connectivity in remote agricultural fields",
        "Tampering with sensor transmission antennae"
      ],
      scalabilityPotential: "High - Critical requirement for state discoms across India under the Revamped Distribution Sector Scheme (RDSS)."
    }
  }
];

export const mockPilots: Pilot[] = [
  {
    id: "p1",
    challengeId: "CH-001",
    startupId: "s1",
    startupName: "AquaSense Technologies",
    location: "Kothrud & Aundh, Pune",
    startDate: "Jan 2026",
    duration: "90 days",
    budget: "₹8 lakh",
    status: "Completed",
    metrics: {
      detectionAccuracy: { value: 94, target: 90 },
      falsePositiveRate: { value: 4, target: 10 },
      waterLossReduction: { value: 21, target: 15 },
      systemUptime: { value: 98, target: 95 },
      overallScore: 92
    },
    milestones: [
      { title: "Acoustic sensor deployment in pilot wards", status: "Completed" },
      { title: "AI anomaly baseline model training", status: "Completed" },
      { title: "Field leak validation & ground-truth verification", status: "Completed" },
      { title: "Final evaluation & municipal handover", status: "Completed" }
    ]
  },
  {
    id: "p2",
    challengeId: "CH-002",
    startupId: "s2",
    startupName: "HydroVision Labs",
    location: "Outer Ring Road, Bengaluru",
    startDate: "Feb 2026",
    duration: "120 days",
    budget: "₹15 lakh",
    status: "Active",
    metrics: {
      detectionAccuracy: { value: 91, target: 90 },
      falsePositiveRate: { value: 6, target: 10 },
      waterLossReduction: { value: 18, target: 15 },
      systemUptime: { value: 96, target: 95 },
      overallScore: 89
    },
    milestones: [
      { title: "Edge camera hardware installation", status: "Completed" },
      { title: "Intersection queue length calibration", status: "Completed" },
      { title: "Adaptive green cycle timing trials", status: "In Progress" },
      { title: "Emergency ambulance priority testing", status: "Pending" }
    ]
  },
  {
    id: "p3",
    challengeId: "CH-003",
    startupId: "s3",
    startupName: "JalAI Systems",
    location: "Western Express Highway, Mumbai",
    startDate: "Mar 2026",
    duration: "90 days",
    budget: "₹12 lakh",
    status: "Active",
    metrics: {
      detectionAccuracy: { value: 93, target: 90 },
      falsePositiveRate: { value: 5, target: 10 },
      waterLossReduction: { value: 16, target: 15 },
      systemUptime: { value: 97, target: 95 },
      overallScore: 91
    },
    milestones: [
      { title: "Vehicle sensor rig installation on transit buses", status: "Completed" },
      { title: "Defect classification model training", status: "In Progress" },
      { title: "Automated road work order dispatch verification", status: "Pending" },
      { title: "Monsoon durability assessment", status: "Pending" }
    ]
  }
];

