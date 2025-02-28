// Units Data
const unitsData = {
    length: {
        "Kilometers (km)": 0.001, "Meters (m)": 1, "Centimeters (cm)": 100,
        "Millimeters (mm)": 1000, "Micrometers (μm)": 1e6, "Nanometers (nm)": 1e9,
        "Inches (in)": 39.3701, "Feet (ft)": 3.28084, "Yards (yd)": 1.09361,
        "Miles (mi)": 0.000621371, "Nautical Miles (nmi)": 0.000539957
    },
    mass: {
        "Tonnes (t)": 0.001, "Kilograms (kg)": 1, "Grams (g)": 1000,
        "Milligrams (mg)": 1e6, "Micrograms (μg)": 1e9, "Pounds (lb)": 2.20462,
        "Ounces (oz)": 35.274, "Stones (st)": 0.157473, "Carats (ct)": 5000
    },
    time: {
        "Milliseconds (ms)": 1e3, "Seconds (s)": 1, "Minutes (min)": 1/60,
        "Hours (hr)": 1/3600, "Days": 1/86400, "Weeks": 1/604800,
        "Years (yr)": 1/3.154e+7
    },
    temperature: {
        "Celsius": "c", "Fahrenheit": "f", "Kelvin": "k",
        "Rankine": "r", "Réaumur": "re"
    },
    area: {
        "Square Kilometers (km²)": 1e-6, "Square Meters (m²)": 1,
        "Square Miles (mi²)": 0.000000386102, "Acres (ac)": 0.000247105,
        "Hectares (ha)": 0.0001, "Square Yards (yd²)": 1.19599,
        "Square Feet (ft²)": 10.7639, "Square Inches (in²)": 1550
    },
    volume: {
        "Cubic Meters (m³)": 1, "Liters (L)": 1000, "Milliliters (mL)": 1e6,
        "Gallons (gal)": 264.172, "Quarts (qt)": 1056.69, "Pints (pt)": 2113.38,
        "Cups": 4226.75, "Cubic Feet (ft³)": 35.3147, "Cubic Inches (in³)": 61023.7
    },
    speed: {
        "Meters/second (m/s)": 1, "Kilometers/hour (km/h)": 3.6,
        "Miles/hour (mph)": 2.23694, "Knots (kn)": 1.94384,
        "Feet/second (ft/s)": 3.28084, "Mach (Ma)": 0.00293858
    },
    force: {
        "Newtons (N)": 1, "Kilonewtons (kN)": 0.001, "Pounds-force (lbf)": 0.224809,
        "Dyne (dyn)": 1e5, "Kilogram-force (kgf)": 0.101972
    },
    energy: {
        "Joules (J)": 1, "Kilojoules (kJ)": 0.001, "Calories (cal)": 0.239006,
        "Kilocalories (kcal)": 0.000239006, "BTU": 0.000947817,
        "Kilowatt-hours (kWh)": 2.77778e-7, "Electronvolts (eV)": 6.242e+18
    },
    pressure: {
        "Pascals (Pa)": 1, "Kilopascals (kPa)": 0.001, "Megapascals (MPa)": 1e-6,
        "Bar (bar)": 1e-5, "PSI (psi)": 0.000145038, "Atmospheres (atm)": 9.86923e-6,
        "Torr (Torr)": 0.00750062
    },
    power: {
        "Watts (W)": 1, "Kilowatts (kW)": 0.001, "Megawatts (MW)": 1e-6,
        "Horsepower (hp)": 0.00134102, "BTU/hour (BTU/h)": 3.41214
    },
    frequency: {
        "Hertz (Hz)": 1, "Kilohertz (kHz)": 0.001, "Megahertz (MHz)": 1e-6,
        "Gigahertz (GHz)": 1e-9, "Revolutions/minute (rpm)": 60
    },
    electricity: {
        "Amperes (A)": 1, "Milliamperes (mA)": 1000, "Kiloamperes (kA)": 0.001,
        "Volts (V)": 1, "Millivolts (mV)": 1000, "Kilovolts (kV)": 0.001,
        "Ohms (Ω)": 1, "Kiloohms (kΩ)": 0.001, "Megaohms (MΩ)": 0.000001,
        "Watts (W)": 1, "Kilowatts (kW)": 0.001, "Megawatts (MW)": 0.000001
    },
    magnetism: {
        "Teslas (T)": 1, "Gauss (G)": 10000, "Webers (Wb)": 1,
        "Maxwells (Mx)": 1e8, "Oersteds (Oe)": 7957.75
    },
    illumination: {
        "Lux (lx)": 1, "Foot-candles (fc)": 0.092903, "Lumens (lm)": 1
    }
};

// Function to update units based on selected category
function updateUnits() {
    const category = document.getElementById("category").value;
    const units = Object.keys(unitsData[category]);
    document.getElementById("fromUnit").innerHTML = units.map(u => `<option>${u}</option>`).join('');
    document.getElementById("toUnit").innerHTML = units.map(u => `<option>${u}</option>`).join('');
}

// Function to handle conversion
function convert() {
    try {
        const category = document.getElementById("category").value;
        const inputValue = parseFloat(document.getElementById("inputValue").value);
        const from = document.getElementById("fromUnit").value;
        const to = document.getElementById("toUnit").value;
        
        if (isNaN(inputValue)) {
            alert("Please enter a valid number");
            return;
        }

        if (category === 'temperature') {
            handleTemperature(inputValue, from, to);
        } else if (category === 'electricity') {
            handleElectricity(inputValue, from, to);
        } else {
            handleStandardConversion(inputValue, from, to, category);
        }
    } catch (error) {
        alert(`Conversion error: ${error.message}`);
    }
}

// Function to handle temperature conversions
function handleTemperature(value, from, to) {
    const conversions = {
        'c': { 
            'f': v => (v * 9/5) + 32, 
            'k': v => v + 273.15,
            'r': v => (v + 273.15) * 9/5,
            're': v => v * 4/5
        },
        'f': { 
            'c': v => (v - 32) * 5/9,
            'k': v => (v + 459.67) * 5/9,
            'r': v => v + 459.67,
            're': v => (v - 32) * 4/9
        },
        'k': { 
            'c': v => v - 273.15,
            'f': v => (v * 9/5) - 459.67,
            'r': v => v * 9/5,
            're': v => (v - 273.15) * 4/5
        },
        'r': { 
            'c': v => (v - 491.67) * 5/9,
            'f': v => v - 459.67,
            'k': v => v * 5/9,
            're': v => (v - 491.67) * 4/9
        },
        're': { 
            'c': v => v * 5/4,
            'f': v => (v * 9/4) + 32,
            'k': v => (v * 5/4) + 273.15,
            'r': v => (v * 9/4) + 491.67
        }
    };
    
    const fromScale = unitsData.temperature[from];
    const toScale = unitsData.temperature[to];
    
    if (!fromScale || !toScale) {
        alert("Invalid temperature units selected");
        return;
    }

    if (fromScale === toScale) {
        setResult(value.toFixed(2));
    } else if (conversions[fromScale]?.[toScale]) {
        const result = conversions[fromScale][toScale](value);
        setResult(result.toFixed(2));
    } else {
        alert("Temperature conversion not supported");
    }
}

// Function to handle electricity conversions
function handleElectricity(value, from, to) {
    const electricalTypes = {
        "Amperes (A)": "current", "Milliamperes (mA)": "current", 
        "Kiloamperes (kA)": "current", "Volts (V)": "voltage",
        "Millivolts (mV)": "voltage", "Kilovolts (kV)": "voltage",
        "Ohms (Ω)": "resistance", "Kiloohms (kΩ)": "resistance", 
        "Megaohms (MΩ)": "resistance", "Watts (W)": "power",
        "Kilowatts (kW)": "power", "Megawatts (MW)": "power"
    };
    
    if (electricalTypes[from] !== electricalTypes[to]) {
        alert("Cannot convert between different electrical quantities");
        return;
    }
    
    const result = value * (unitsData.electricity[to] / unitsData.electricity[from]);
    setResult(result.toFixed(6));
}

// Function to handle standard conversions
function handleStandardConversion(value, from, to, category) {
    const fromFactor = unitsData[category][from];
    const toFactor = unitsData[category][to];
    
    if (!fromFactor || !toFactor) {
        alert("Invalid unit conversion");
        return;
    }
    
    const result = value * (toFactor / fromFactor);
    setResult(result.toFixed(6));
}

// Function to set the result
function setResult(value) {
    document.getElementById("result").textContent = value;
}

// Function to reset the converter
function reset() {
    document.getElementById("inputValue").value = "";
    document.getElementById("result").textContent = "-";
}

// Initialize units on load
updateUnits();
