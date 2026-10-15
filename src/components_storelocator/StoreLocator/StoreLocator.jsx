"use client";

import { useEffect, useMemo, useState } from "react";
// import {
//   GoogleMap,
//   InfoWindowF,
//   LoadScript,
//   MarkerF,
// } from "@react-google-maps/api";

import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
  useGoogleMap,
} from "@react-google-maps/api";

import {
  FiArrowRight,
  FiCrosshair,
  FiMapPin,
  FiNavigation,
  FiPhone,
  FiSearch,
} from "react-icons/fi";
import storesData from "../../data/locations.json";
import styles from "./StoreLocator.module.css";

const INDIA_CENTER = { lat: 22.9734, lng: 78.6569 };

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  clickableIcons: false,
  gestureHandling: "greedy",
};

const clean = (value) => String(value ?? "").trim();

const stores = (Array.isArray(storesData) ? storesData : [])
  .map((store, index) => ({
    ...store,
    // Use the array index as a stable fallback because the old data
    // contains some duplicate store IDs.
    _key: `${clean(store.id) || "store"}-${index}`,
    id: clean(store.id),
    name: clean(store.name) || "Rolls Mania Store",
    address: clean(store.address),
    city: clean(store.city),
    state: clean(store.state),
    country: clean(store.country) || "India",
    postal: clean(store.postal),
    phone: clean(store.phone),
    lat: Number(store.lat),
    lng: Number(store.lng),
  }))
  .filter(
    (store) =>
      Number.isFinite(store.lat) &&
      Number.isFinite(store.lng) &&
      store.lat >= -90 &&
      store.lat <= 90 &&
      store.lng >= -180 &&
      store.lng <= 180
  );

export default function StoreLocator() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [map, setMap] = useState(null);
  const [geoMessage, setGeoMessage] = useState("");
  const [locating, setLocating] = useState(false);

  // Google Maps loading state
  const [mapsLoaded, setMapsLoaded] = useState(false);

  // Food image mouse movement
  const [foodMouse, setFoodMouse] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (event) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const nextX = x * 22;
    const nextY = y * 18;

    setFoodMouse((previous) => {
      if (
        Math.abs(previous.x - nextX) < 0.5 &&
        Math.abs(previous.y - nextY) < 0.5
      ) {
        return previous;
      }

      return { x: nextX, y: nextY };
    });
  };

  const countries = useMemo(
    () => [...new Set(stores.map((s) => s.country).filter(Boolean))].sort(),
    []
  );

  const states = useMemo(
    () =>
      [
        ...new Set(
          stores
            .filter((s) => !country || s.country === country)
            .map((s) => s.state)
            .filter(Boolean)
        ),
      ].sort(),
    [country]
  );

  const cities = useMemo(
    () =>
      [
        ...new Set(
          stores
            .filter(
              (s) =>
                (!country || s.country === country) &&
                (!state || s.state === state)
            )
            .map((s) => s.city)
            .filter(Boolean)
        ),
      ].sort(),
    [country, state]
  );

  const filteredStores = useMemo(() => {
    const query = search.trim().toLowerCase();

    return stores.filter((store) => {
      const matchesCountry = !country || store.country === country;
      const matchesState = !state || store.state === state;
      const matchesCity = !city || store.city === city;

      const searchable = [
        store.name,
        store.address,
        store.city,
        store.state,
        store.postal,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCountry &&
        matchesState &&
        matchesCity &&
        (!query || searchable.includes(query))
      );
    });
  }, [country, state, city, search]);

  // Automatically zoom the map when country, state, or city changes
  useEffect(() => {
    if (!map) return;

    // No location filter: show the full India map
    if (!country && !state && !city) {
      map.panTo(INDIA_CENTER);
      map.setZoom(5);
      return;
    }

    if (filteredStores.length === 0) return;

    // Only include stores matching the selected filters
    const bounds = new window.google.maps.LatLngBounds();

    filteredStores.forEach((store) => {
      bounds.extend({
        lat: store.lat,
        lng: store.lng,
      });
    });

    if (filteredStores.length === 1) {
      // One store: zoom directly into its location
      map.panTo({
        lat: filteredStores[0].lat,
        lng: filteredStores[0].lng,
      });

      map.setZoom(city ? 13 : state ? 8 : 6);
    } else {
      // Multiple stores: fit all matching stores into the map
      map.fitBounds(bounds, 60);
    }
  }, [map, country, state, city, filteredStores]);

  const focusStore = (store) => {
    setSelectedStore(store);

    if (map) {
      map.panTo({ lat: store.lat, lng: store.lng });
      map.setZoom(15);
    }
  };

  const resetFilters = () => {
    setCountry("");
    setState("");
    setCity("");
    setSearch("");
    setSelectedStore(null);

    if (map) {
      map.panTo(INDIA_CENTER);
      map.setZoom(5);
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setGeoMessage("Location detection is not supported by this browser.");
      return;
    }

    setLocating(true);
    setGeoMessage("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (map) {
          map.panTo(userLocation);
          map.setZoom(12);
        }

        const nearest = stores.reduce((best, store) => {
          const distance =
            Math.pow(store.lat - userLocation.lat, 2) +
            Math.pow(store.lng - userLocation.lng, 2);

          return !best || distance < best.distance ? { store, distance } : best;
        }, null);

        if (nearest) {
          setSelectedStore(nearest.store);
          setGeoMessage(
            `Nearest listed store: ${nearest.store.name}, ${nearest.store.city}.`
          );
        } else {
          setGeoMessage("No store locations are currently available.");
        }

        setLocating(false);
      },
      () => {
        setGeoMessage(
          "Unable to detect your location. Please allow location access and try again."
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <main className={styles.storePage}>
      <section
        className={styles.hero}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => setFoodMouse({ x: 0, y: 0 })}
      >
        <div className={styles.heroTexture} aria-hidden="true" />

        <div className={`rm-container ${styles.heroInner}`}>
          {/* LEFT SIDE — HERO CONTENT */}
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              GOODNESS IS CLOSER THAN YOU THINK
            </span>

            <h1 className={styles.heroTitle}>
              FIND YOUR
              <span>ROLLS MANIA.</span>
            </h1>

            <p className={styles.heroDescription}>
              Your favourite rolls are never too far away. Find a store near you
              and get ready to roll.
            </p>

            <a href="#find-stores" className={styles.heroButton}>
              FIND A STORE <FiArrowRight aria-hidden="true" />
            </a>
          </div>

          {/* RIGHT SIDE — ANIMATED FOOD IMAGE */}
          <div className={styles.heroFoodMotion} aria-hidden="true">
            <img
              src="/assets/rolls-mania/store_locator/storelocator-hero-food.png"
              alt=""
              className={styles.heroFoodImage}
              draggable="false"
              style={{
                "--mouse-x": `${foodMouse.x}px`,
                "--mouse-y": `${foodMouse.y}px`,
              }}
            />
          </div>
        </div>
      </section>

      {/* NUTRITION & ALLERGEN PDF BUTTONS */}
      <section className={styles.documentSection}>
        <div className={`rm-container ${styles.documentInner}`}>
          <a
            href="/assets/rolls-mania/store_locator/documents/RM-Nutritional-Value-A4.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.documentButton}
          >
            Nutrition Information
            <FiArrowRight aria-hidden="true" />
          </a>

          <a
            href="/assets/rolls-mania/store_locator/documents/Allergens-Info.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.documentButton}
          >
            Allergen Information
            <FiArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className={styles.locatorSection} id="find-stores">
        <div className={`rm-container ${styles.locatorInner}`}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionLabel}>YOUR NEXT BITE AWAITS</span>
            <h2 className={styles.sectionTitle}>
              FIND YOUR
              <span>NEAREST STORE</span>
            </h2>
            <p>
              Choose a location or search for your area to discover a Rolls
              Mania outlet.
            </p>
          </div>

          <div className={styles.locatorPanel}>
            <div className={styles.filters}>
              <label className={styles.filterField}>
                <span>Country</span>
                <select
                  value={country}
                  onChange={(event) => {
                    setCountry(event.target.value);
                    setState("");
                    setCity("");
                    setSelectedStore(null);
                  }}
                >
                  <option value="">All countries</option>
                  {countries.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.filterField}>
                <span>State</span>
                <select
                  value={state}
                  onChange={(event) => {
                    setState(event.target.value);
                    setCity("");
                    setSelectedStore(null);
                  }}
                >
                  <option value="">All states</option>
                  {states.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.filterField}>
                <span>City</span>
                <select
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                    setSelectedStore(null);
                  }}
                >
                  <option value="">All cities</option>
                  {cities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`${styles.filterField} ${styles.searchField}`}>
                <span>Search stores</span>
                <div className={styles.searchBox}>
                  <FiSearch aria-hidden="true" />
                  <input
                    type="search"
                    placeholder="Store, area or PIN code"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setSelectedStore(null);
                    }}
                  />
                </div>
              </label>

              <button
                type="button"
                className={styles.resetButton}
                onClick={resetFilters}
              >
                Clear filters
              </button>
            </div>

            <div className={styles.mapToolbar}>
              <div>
                <span className={styles.resultCount}>
                  {filteredStores.length}
                </span>{" "}
                <span>
                  {filteredStores.length === 1 ? "store found" : "stores found"}
                </span>
              </div>

              <button
                type="button"
                className={styles.locationButton}
                onClick={detectLocation}
                disabled={locating}
              >
                <FiCrosshair aria-hidden="true" />
                {locating ? "Locating..." : "Use my location"}
              </button>
            </div>

            {geoMessage && (
              <p className={styles.geoMessage} role="status">
                {geoMessage}
              </p>
            )}

            <div className={styles.resultsLayout}>
              <div className={styles.storeList} aria-label="Store results">
                {filteredStores.length ? (
                  filteredStores.map((store) => (
                    <article
                      key={store._key}
                      className={`${styles.storeCard} ${
                        selectedStore?._key === store._key
                          ? styles.storeCardActive
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={styles.storeSelect}
                        onClick={() => focusStore(store)}
                        aria-pressed={selectedStore?._key === store._key}
                      >
                        <span className={styles.storeIcon}>
                          <FiMapPin aria-hidden="true" />
                        </span>

                        <span className={styles.storeInfo}>
                          <strong>{store.name}</strong>
                          <span className={styles.storeCity}>
                            {[store.city, store.state]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                          <span className={styles.storeAddress}>
                            {store.address}
                            {store.postal ? ` - ${store.postal}` : ""}
                          </span>
                        </span>

                        <FiArrowRight
                          className={styles.cardArrow}
                          aria-hidden="true"
                        />
                      </button>

                      <div className={styles.storeActions}>
                        {store.phone && (
                          <a href={`tel:${store.phone.replace(/[^\d+]/g, "")}`}>
                            <FiPhone aria-hidden="true" /> Call store
                          </a>
                        )}

                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FiNavigation aria-hidden="true" /> Get directions
                        </a>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <FiMapPin aria-hidden="true" />
                    <h3>No stores found</h3>
                    <p>Try another city or clear your filters.</p>
                    <button type="button" onClick={resetFilters}>
                      Show all stores
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.mapWrapper}>
                {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                  //   <LoadScript
                  //     googleMapsApiKey={
                  //       process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                  //     }
                  //   >
                  <LoadScript
                    googleMapsApiKey={
                      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                    }
                    onLoad={() => setMapsLoaded(true)}
                  >
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={
                        selectedStore
                          ? {
                              lat: selectedStore.lat,
                              lng: selectedStore.lng,
                            }
                          : INDIA_CENTER
                      }
                      zoom={selectedStore ? 14 : 5}
                      options={mapOptions}
                      onLoad={setMap}
                      onUnmount={() => setMap(null)}
                    >
                      {/* {filteredStores.map((store) => (
                        <MarkerF
                          key={store._key}
                          position={{ lat: store.lat, lng: store.lng }}
                          title={store.name}
                          onClick={() => focusStore(store)}
                        />
                      ))} */}

                      {filteredStores.map((store) => (
                        <MarkerF
                          key={store._key}
                          position={{ lat: store.lat, lng: store.lng }}
                          title={store.name}
                          icon={
                            mapsLoaded &&
                            typeof window !== "undefined" &&
                            window.google
                              ? {
                                  url: "/assets/rolls-mania/store_locator/rolls-mania-map-pin.png",

                                  scaledSize: new window.google.maps.Size(
                                    20,
                                    25
                                  ),
                                  anchor: new window.google.maps.Point(10, 25),
                                }
                              : undefined
                          }
                          onClick={() => focusStore(store)}
                        />
                      ))}

                      {selectedStore && (
                        <InfoWindowF
                          position={{
                            lat: selectedStore.lat,
                            lng: selectedStore.lng,
                          }}
                          onCloseClick={() => setSelectedStore(null)}
                        >
                          <div className={styles.mapInfo}>
                            <strong>{selectedStore.name}</strong>
                            <p>
                              {selectedStore.address}
                              {selectedStore.city
                                ? `, ${selectedStore.city}`
                                : ""}
                            </p>
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStore.lat},${selectedStore.lng}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Get directions
                            </a>
                          </div>
                        </InfoWindowF>
                      )}
                    </GoogleMap>
                  </LoadScript>
                ) : (
                  <div className={styles.mapPlaceholder}>
                    <FiMapPin aria-hidden="true" />
                    <h3>Explore our stores</h3>
                    <p>
                      Add your Google Maps API key to <code>.env.local</code> to
                      enable the interactive map.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
