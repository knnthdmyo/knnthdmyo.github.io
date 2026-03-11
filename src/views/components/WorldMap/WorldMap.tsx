'use client';

import { memo } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useWorldMap } from '@/viewmodels/useWorldMap';
import { Location } from '@/models/location.model';

interface WorldMapProps {
  locations?: Location[];
  title?: string;
}

const WorldMap = memo(({ locations: customLocations, title }: WorldMapProps) => {
  const { locations, mapConfig, hoveredLocation, handleLocationHover, handleLocationLeave } = useWorldMap(customLocations);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      {title && (
        <p className="text-[10px] uppercase tracking-widest text-black/60 dark:text-gray-400 mb-4 text-center">{title}</p>
      )}
      <div className="relative overflow-hidden">
        <ComposableMap
          projectionConfig={{
            scale: mapConfig.projectionScale,
            center: mapConfig.projectionCenter,
          }}
          style={{ width: '100%', height: 'auto' }}
          projection="geoMercator"
        >
          <Geographies geography={mapConfig.geoUrl}>
            {({ geographies }) =>
              geographies
                .filter((geo) => !mapConfig.excludeRegions.includes(geo.properties.name))
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth={0.7}
                    className="text-gray-300 dark:text-gray-600"
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
            }
          </Geographies>
          {locations.map((loc, index) => (
            <Marker key={loc.name} coordinates={loc.coordinates}>
              {/* Ping animation ring */}
              <circle
                r={14}
                fill="none"
                stroke="#38bdf8"
                strokeWidth={2.5}
                opacity={0.5}
                className="animate-ping"
                style={{ animationDelay: `${index * 0.2}s`, animationDuration: '2s' }}
              />
              {/* Main dot */}
              <circle
                r={7}
                fill={hoveredLocation === loc.name ? '#38bdf8' : '#0ea5e9'}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => handleLocationHover(loc.name)}
                onMouseLeave={handleLocationLeave}
                style={{ transform: hoveredLocation === loc.name ? 'scale(1.3)' : 'scale(1)' }}
              />
              {/* Tooltip */}
              {hoveredLocation === loc.name && (
                <g>
                  <rect
                    x={-loc.name.length * 4 - 10}
                    y={-38}
                    width={loc.name.length * 8 + 20}
                    height={24}
                    rx={5}
                    fill="rgba(15, 23, 42, 0.95)"
                    className="backdrop-blur"
                  />
                  <text
                    textAnchor="middle"
                    y={-20}
                    className="fill-white text-[14px] font-semibold"
                    style={{ pointerEvents: 'none' }}
                  >
                    {loc.name}
                  </text>
                </g>
              )}
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
});

WorldMap.displayName = 'WorldMap';

export default WorldMap;

